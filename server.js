// imports
import express from "express";
import bodyParser from "body-parser";
import Pusher from "pusher";
import { dirname } from "path";

// end of imports and begin instantiation
const port = process.env.PORT || 5000;
const app = express();
const pusher = new Pusher({
  appId: "878485",
  key: "28d17d78225a05ae9641",
  secret: "383a03635cc8266a181b",
  cluster: us2
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/pusher/auth", function(req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});
app.post("/message", function(req, res) {
  const message = req.body.message;
  const name = req.body.name;
  pusher.trigger("private-chat", "message-added", { message, name });
  res.sendStatus(200);
});
app.get('/', function(req, res) {
  res.sendFile('public/index.html', {root: dirname});
});
app.use(express.static( dirname + '/public'));
app.listen(port, function() {
  console.log(`app listening on port ${port}!`)
})