const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen((port = 80), function () {
  console.log("port:", port);
});

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", function (ioSocket) {
  console.log("conn socketId:", ioSocket.id);

  ioSocket.on("disconnect", function () {
    console.log("disconn socketId:", ioSocket.id);
    clearInterval(ioSocket.interval);
  });

  ioSocket.on("error", function (error) {
    console.log(error);
  });
  /*


    


*/
  ioSocket.on("leaveRoom", (roomNum, nickname) => {
    io.to(roomNum).emit("msgToRoom", `<System> ${nickname} has left the room`);
    ioSocket.leave(roomNum);
  });

  ioSocket.on("joinRoom", (roomNum, nickname) => {
    ioSocket.join(roomNum);
    io.to(roomNum).emit(
      "msgToRoom",
      `<System> ${nickname} has joined the room`
    );
  });

  ioSocket.on("msgToServer", (roomNum, nickname, msg) => {
    console.log(roomNum, nickname, msg);
    io.to(roomNum).emit("msgToRoom", nickname + ": " + msg);
  });
});
