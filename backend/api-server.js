const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

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

app.use(bodyParser.json());

app.get("/api/account", (req, res) => {
  res.send(401);
});

app.post("/api/account", (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;

  const member = members.find(
    (m) => m.loginId === loginId && m.loginPw === loginPw
  );

  if (member) {
    res.send(member);
  } else {
    res.status(401).send("계정정보를 찾을 수 없습니다.");
  }

  console.log(loginId, loginPw);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
