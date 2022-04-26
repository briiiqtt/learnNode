const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

//
const db = require("./DB");
//

server.listen((port = 80), function () {
  console.log("port:", port);
});

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});


//Socket.IO
io.on("connection", function (ioSocket) {
  console.log("conn socketId:", ioSocket.id);

  ioSocket.on("disconnect", function () {
    clearInterval(ioSocket.interval);
  });

  ioSocket.on("error", function (error) {
    console.log(error);
  });

  /*-----------------------------------*/

  ioSocket.on("getRoomList_solo", (obj) => {
    console.log(obj);
    db.getRoomList().then((r) => {
      io.to(obj.socketId).emit("roomList", r);
    });
  });
  ioSocket.on("getRoomList", (obj) => {
    console.log(obj);
    db.getRoomList().then((r) => {
      io.emit("roomList", r);
    });
  });

  /*-----------------------------------*/

  ioSocket.on("leaveRoom", (roomNum, nickname) => {
    io.to(roomNum).emit("msgToRoom_leaveRoom", nickname);
    ioSocket.leave(roomNum);
  });

  ioSocket.on("joinRoom", (roomNum, nickname) => {
    ioSocket.join(roomNum);
    io.to(roomNum).emit("msgToRoom_joinRoom", nickname);
  });

  /*-----------------------------------*/

  ioSocket.on("msgToServer", (roomNum, nickname, msg) => {
    io.to(roomNum).emit("msgToRoom", { nickname, msg });
    db.recordMessage(msg, nickname, roomNum);
  });

  /*-----------------------------------*/

  ioSocket.on("createRoom", function (obj) {
    db.createRoom(obj.roomName, obj.nickname);
    io.emit("roomCreated", obj);
  });
});
