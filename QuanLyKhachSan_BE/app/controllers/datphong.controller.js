const db = require("../models");
const nodemailer = require('nodemailer');
const DatPhong = db.datphong;
const KhachHang = db.khachhang;
const Phong = db.phong;
const NhanVien = db.nhanvien;
const TrangThaiDat = db.trangthaidat;
const PhuThuDatPhong = db.phuthudatphong;
const { getPagination, getPagingData } = require("../middlewares/pagination");
const schedule = require('node-schedule');

var today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// Đếm số lượng đặt phòng
exports.countDatPhong = (req, res) => {
  DatPhong.count()
    .then((count) => {
      res.json({ count });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách đặt phòng
exports.getAllDatPhong = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  DatPhong.findAndCountAll({
    include: [
      {
        model: KhachHang,
        as: "KhachHang",
      },
      {
        model: Phong,
        as: "Phong",
      },
      {
        model: PhuThuDatPhong,
        as: "PhuThuDatPhong",
      },
      {
        model: NhanVien,
        as: "NhanVien",
      },
      {
        model: TrangThaiDat,
        as: "TrangThaiDat",
      },
    ],
    limit,
    offset,
  })
    .then((datphong) => {
      const response = getPagingData(datphong, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy đơn đặt by id
exports.getDatPhongById = (req, res) => {
  const id = req.query.id;
  DatPhong.findOne({
    include: [
      {
        model: KhachHang,
        as: "KhachHang",
      },
      {
        model: Phong,
        as: "Phong",
      },
      {
        model: PhuThuDatPhong,
        as: "PhuThuDatPhong",
      },
      {
        model: NhanVien,
        as: "NhanVien",
      },
      {
        model: TrangThaiDat,
        as: "TrangThaiDat",
      },
    ],
    where: { MaDatPhong: id },
  })
    .then((datphong) => {
      if (!datphong) {
        return res.status(404).send({ message: "Không có đơn đặt" });
      }
      res.send(datphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy đơn đặt by id khách hàng
exports.getDatPhongByClientId = (req, res) => {
  const id = req.query.id;
  DatPhong.findAll({
    include: [
      {
        model: KhachHang,
        as: "KhachHang",
      },
      {
        model: Phong,
        as: "Phong",
      },
      {
        model: PhuThuDatPhong,
        as: "PhuThuDatPhong",
      },
      {
        model: NhanVien,
        as: "NhanVien",
      },
      {
        model: TrangThaiDat,
        as: "TrangThaiDat",
      },
    ],
    where: { MaKhachHang: id },
  })
    .then((datphong) => {
      if (!datphong) {
        return res.status(404).send({ message: "Không có đơn đặt" });
      }
      res.send(datphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Tạo đơn đặt phòng
exports.createDatPhong = (req, res) => {
  const Email = req.body.Email;
  DatPhong.create({
    MaKhachHang: req.body.MaKhachHang,
    MaPhong: req.body.MaPhong,
    NgayTao: date,
    NgaySua: date,
    NgayNhan: req.body.NgayNhan,
    NgayTra: req.body.NgayTra,
    SoNgayThue: req.body.SoNgayThue,
    NguoiLon: req.body.NguoiLon,
    TreEm: req.body.TreEm,
    GiaThue: req.body.GiaThue,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    MaNhanVien: req.body.MaNhanVien,
    MaTrangThai: req.body.MaTrangThai,
  })
    .then((datphong) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASS,
        },
      });

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: Email,
        subject: 'Đơn đặt phòng thành công!',
        text: 'Cảm ơn bạn đã đặt phòng của chúng tôi. \n\n Khách Sạn 3 BOY',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      req.session.MaPhong = datphong.MaPhong;
      req.session.TinhTrangPhong = 2;
      job.invoke();
      res.status(201).send(datphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật đơn
exports.updateDatPhong = (req, res) => {
  const id = req.query.id;
  DatPhong.update(
    {
      MaKhachHang: req.body.MaKhachHang,
      MaPhong: req.body.MaPhong,
      NgaySua: date,
      NgayNhan: req.body.NgayNhan,
      NgayTra: req.body.NgayTra,
      SoNgayThue: req.body.SoNgayThue,
      NguoiLon: req.body.NguoiLon,
      TreEm: req.body.TreEm,
      GiaThue: req.body.GiaThue,
      TongTien: req.body.TongTien,
      GhiChu: req.body.GhiChu,
      MaNhanVien: req.body.MaNhanVien,
      MaTrangThai: req.body.MaTrangThai,
    },
    { where: { MaDatPhong: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật đơn đặt thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật đơn đặt. \nĐơn đặt có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật đơn ${err}`,
      });
    });
};

// Hủy đơn
exports.cancelDatPhong = (req, res) => {
  const id = req.query.id;
  DatPhong.update(
    {
      MaTrangThai: 4
    },
    { where: { MaDatPhong: id } }
  )
    .then((num) => {
      if (num == 1) {
        // Lấy thông tin phòng từ đơn đặt và cập nhật vào session
        DatPhong.findByPk(id)
          .then((datPhong) => {
            req.session.MaPhong = datPhong.MaPhong;
            req.session.TinhTrangPhong = 1;
            res.send({
              message: "Hủy đơn đặt thành công.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Lỗi khi lấy thông tin phòng: ${err}`,
            });
          });
      } else {
        res.send({
          message: `Không thể hủy đơn đặt. \nĐơn đặt có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi hủy đơn: ${err}`,
      });
    });
};

const job = schedule.scheduleJob('0 * * * *', () => {
  TinhTrangPhong.findAll().then((rooms) => {
    rooms.forEach((room) => {
      sendNotification(room);
    });
  });
});


function sendNotification() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

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

