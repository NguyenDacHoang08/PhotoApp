const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { login_name, password } = req.body;
    if (!login_name || !password) {
        return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
    }

    try {
        const user = await User.findOne({ login_name });
        if (!user) {
            return res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });
        }

        res.json({
            message: "Đăng nhập thành công",
            user: {
                id: user._id,
                login_name: user.login_name,
                first_name: user.first_name,
                last_name: user.last_name,
                location: user.location,
                description: user.description,
                occupation: user.occupation,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
});

router.post("/register", async (req, res) => {
  try {
    const { loginName, password, firstName, lastName } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!loginName || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ loginName });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });
    }

    // Tạo user mới
    const newUser = new User({
      login_name: loginName,
      password,
      first_name: firstName,
      last_name: lastName
    });

    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
