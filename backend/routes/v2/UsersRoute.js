const express = require("express");
const router = express.Router();
const db = require("../../services/db");
const jwt = require("jsonwebtoken");
const AuthenticationToken = require("./middleware/authenticationToken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const SECRET_KEY = process.env.SECRET_KEY;

// router login data
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const querylog = `SELECT UserId ,UserEmail, UserFullname, UserPhone, UserRole, username FROM Users WHERE UserEmail = ? AND UserPassword = ?`;
  const result = await db.query(querylog, [email, password]);

  if (result.length === 0) {
    return res.status(404).send({
      message: "invalid credentials",
    });
  }

  const payload = { result };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    message: "success",
    token: token,
  });
});

// get current login data user
router.get("/get-current-login", AuthenticationToken, async (req, res) => {
  res.json({
    status: "success",
    message: req.user,
  });
});

// register user v2
router.post("/register", async (req, res) => {
  const {
    UserFullname,
    UserEmail,
    UserPhone,
    UserRole,
    UserPassword,
    UserConfirmPassword,
    Username,
  } = req.body;

  // jika kosong
  if (
    !UserFullname ||
    !UserEmail ||
    !UserPhone ||
    !UserRole ||
    !UserPassword ||
    !UserConfirmPassword ||
    !Username
  ) {
    return res.status(404).send({
      status: "failed",
      message: "the data cannot be empty !",
    });
  }

  // user validation password
  if (UserPassword !== UserConfirmPassword) {
    return res.status(404).send({
      status: "failed",
      message: "user password with confirmation password not same !",
    });
  }

  // set data user id
  const UserId = uuidv4();

  const queryReg = `INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const result = await db.query(queryReg, [
    UserId,
    UserFullname,
    UserEmail,
    UserPhone,
    UserRole,
    UserPassword,
    Username,
  ]);

  if (result.affectedRows == 0) {
    return res.status(404).send({
      status: "failed",
      message: "cannot inserted the data !",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "register is successfull !",
  });
});

module.exports = router;
