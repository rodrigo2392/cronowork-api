import http from "http";
import { Server } from "socket.io";
import { validateSocketToken } from "../middlewares/auth.middleware";

class SocketService {
  server: http.Server;
  socketServer;
  constructor(server: http.Server) {
    this.server = server;
    this.socketServer = new Server(this.server, { cors: { origin: "*" } });
    this.initialize();
  }

  initialize() {
    this.socketServer.use((socket, next) => {
      const token =
        socket.handshake.auth.token || socket.handshake.headers.token;
      if (token !== null && token !== "null") {
        validateSocketToken(token, next, socket);
      } else {
        console.log("no token received");
        next(new Error("no token provided"));
      }
    });

    this.socketServer.on("connection", (socket) => {
      const user_id = socket.handshake.auth.user ?? "";
      console.log("new user connected:" + user_id);
      socket.join(user_id ?? "");

      socket.on("start_tracking", (data) => {
        socket.to(user_id).emit("new_start_tracking", { data });
        console.log("new message received", { data });
      });

      socket.on("stop_tracking", (data) => {
        socket.to(user_id).emit("new_stop_tracking", { data });
        console.log("new message received", { data });
      });
    });
  }
}

export default SocketService;
