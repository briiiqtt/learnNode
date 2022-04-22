const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(80)

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    clearInterval(socket.interval);
  });

  socket.on("error", function (error) {
    console.log(error);
  });

  socket.on("msg_submit", function (data) {
    // socket.emit("show_msg", data);
    console.log(data);
  });

});
