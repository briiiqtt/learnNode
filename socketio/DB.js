const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "socketio",
});

const query = async function (sql) {
  try {
    let promise = new Promise((resolve, reject) => {
      // connection.connect();
      connection.query(sql, (err, rows, fields) => {
        if (err) {
          reject(err);
          // throw err;
        }
        resolve(rows);
      });
      // connection.end();
    });
    let rs = await promise;
    return rs;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.getRoomList = function () {
  return query("select*from rooms");
};

module.exports.createRoom = function (roomName, userName) {
  return query(`
  insert into rooms (
    room_idx,
    room_name,
    host
  )
  values (
    nextval('socketio_room_seq'),
    '${roomName}',
    '${userName}'
  )`);
};

module.exports.recordMessage = function (msg, userName, roomNum) {
  return query(`
  insert into messages (
    message,
    sender,
    room_idx
    )
  values (
    '${msg}',
    '${userName}',
    '${roomNum}'
  )`);
};

module.exports.getChatLog = function (roomNum) {
  return query(`
  select
    message,
    sender,
    sent_datetime,
    room_idx
  from 
    messages
  where
    room_idx = ${roomNum}
  `);
};
