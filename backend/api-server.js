const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
  console.log(req.cookies);
  if (req.cookies && req.cookies.account) {
    const member = JSON.parse(req.cookies.account);

    if (member.id) {
      return res.send(member);
    }
  }
  res.send(401);
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
    res.cookie("account", JSON.stringify(member), options);
    res.send(member);
  } else {
    res.status(401).send("계정정보를 찾을 수 없습니다.");
  }

  console.log(loginId, loginPw);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
