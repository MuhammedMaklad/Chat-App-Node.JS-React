/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL as string;

interface SocketOptions {
  url?: string;
  token?: string;
}
class SocketService {
  public socket: Socket | null = null;

  connect(config?: SocketOptions) {
    console.log("this socket url" + SOCKET_SERVER_URL)
    console.log(config?.token)
    if (this.socket?.connected)
      return;

    const url = config?.url || SOCKET_SERVER_URL;
    const defaultOptions = {
      transports: ['websocket'],
      withCredentials: true // Required because your backend allows credentials

    }
    this.socket = io(url, {
      ...defaultOptions,
      auth: {
        token: config?.token
      }
    }
    );
    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    this.socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

}

export const socketService = new SocketService();