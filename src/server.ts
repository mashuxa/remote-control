import { WebSocketServer } from 'ws';
import { config } from "dotenv";

config();

const port = Number(process.env.PORT) || 8080;
const webSocketServer = new WebSocketServer({ port });

webSocketServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.warn(data.toString());
    ws.send(data.toString());
  });

  console.log(`WebSocketServer running at http://localhost:${port}/`);
});

webSocketServer.on('error', () => {
  console.log('Some error');
});
