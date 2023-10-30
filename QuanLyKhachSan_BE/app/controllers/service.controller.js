const db = require("../models");
const PhuThuDatPhong = db.phuthudatphong;
const TinhTrangPhong = db.tinhtrangphong;
const TrangThaiDat = db.trangthaidat;
const KhachHang = db.khachhang;
const Phong = db.phong;
const NhanVien = db.nhanvien;
const schedule = require('node-schedule');

var today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// Tạo phụ thu
exports.createPhuThu = (req, res) => {
  PhuThuDatPhong.create({
    MaDatPhong: req.body.MaDatPhong,
    PhuThu: req.body.PhuThu,
    LyDo: req.body.LyDo,
    GhiChu: req.body.GhiChu,
    NgayTao: date,
    MaNhanVien: req.body.MaNhanVien,
  })
    .then(() => {
      res.status(201).send({ message: "Tạo phụ thu thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật phụ thu
exports.updatePhuThu = (req, res) => {
  const id = req.query.id;
  PhuThuDatPhong.update(
    {
      PhuThu: req.body.PhuThu,
      LyDo: req.body.LyDo,
      GhiChu: req.body.GhiChu,
      NgayTao: req.body.NgayTao,
      MaNhanVien: req.body.MaNhanVien,
    },
    { where: { MaDatPhong: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật phụ thu thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật phụ thu. Phụ thu có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật phụ thu ${err}`,
      });
    });
};

// Lấy thông tin phụ thu
exports.getPhuThuById = (req, res) => {
  const id = req.query.id;
  PhuThuDatPhong.findOne({ where: { MaDatPhong: id } })
    .then((phuthu) => {
      if (!phuthu) {
        return res.status(404).send({ message: "Không có phụ thu" });
      }
      res.send(phuthu);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách tình trạng phòng
exports.getDanhSachTinhTrangPhong = (req, res) => {
  TinhTrangPhong.findAll()
    .then((tinhtrangphong) => {
      if (!tinhtrangphong) {
        return res.status(404).send({ message: "Danh sách trống!" });
      }
      job.invoke();

      res.send(tinhtrangphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const job = schedule.scheduleJob('0 * * * *', () => {
  TinhTrangPhong.findAll().then((rooms) => {
    rooms.forEach((room) => {
      sendNotification(room);
    });
  });
});

// Lấy danh sách trạng thái đặt phòng
exports.getDanhSachTrangThaiDat = (req, res) => {
  TrangThaiDat.findAll()
    .then((trangthaidat) => {
      if (!trangthaidat) {
        return res.status(404).send({ message: "Danh sách trống!" });
      }
      res.send(trangthaidat);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};



function sendNotification(room) {
  // Tạo một transporter cho Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  // Hàm tính thời gian còn lại
  const timeRemaining = () => {
    const currentTime = new Date().getTime();
    const expirationTime = Phong.Date.getTime()
    const timeDiff = expirationTime - currentTime;

    if (timeDiff <= 0) {
      return 'Đã hết hạn';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;
  }

  // Gửi email thông báo về thời gian còn lại
  const mailOptions = {
    from: NhanVien.Email,
    to: KhachHang.Gmail,
    subject: 'Thông báo thời gian còn lại',
    text: `Phòng ${Phong.TenPhong}: Thời gian trả phòng còn lại: ${timeRemaining()}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Gửi email thất bại:', error);
    } else {
      console.log('Email đã được gửi: ' + info.response);
    }
  });
}
