const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const jwt = require("jsonwebtoken");

const members = [
  {
    id: 3,
    name: "길동",
    loginId: "hong",
    loginPw: "11",
  },
  {
    id: 4,
    name: "관리자",
    loginId: "aa",
    loginPw: "11",
  },
];

app.get("/api/account", (req, res) => {
  if (req.cookies && req.cookies.token) {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(401);
        }
        res.send(decoded);
      }
    );
  } else {
    return;
  }
});

app.post("/api/account", (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;

  const member = members.find(
    (m) => m.loginId === loginId && m.loginPw === loginPw
  );

  if (member) {
    const options = {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    };

    const loginToken = jwt.sign(
      {
        id: member.id,
        name: member.name,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        issuer: process.env.JWT_ISSUER,
      }
    );
    res.cookie("token", loginToken, options);
    const loginMember = {
      id: member.id,
      name: member.name,
    };
    res.send(loginMember);
  } else {
    res.status(401).send("계정정보를 찾을 수 없습니다.");
  }
});

app.delete("/api/account", (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.clearCookie("token");
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
