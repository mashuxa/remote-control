import { createWebSocketStream, WebSocketServer } from 'ws';
import { config } from "dotenv";
import errorMessages from "./errorMessages";
import commandsHandler from "./commandsHandler";

config();

const port = Number(process.env.PORT) || 8080;
const webSocketServer = new WebSocketServer({ port });

webSocketServer.on('connection', (ws) => {
  const webSocketStream = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  webSocketStream.on('data', async (data: string) => {
    console.log(`<- ${data}`);

    try {
      const [input, ...args] = data.split(' ');
      const updatedArgs = args.map(value => Number(value))
      const [command, type] = input.split('_');
      const result = await commandsHandler(input, command, type, updatedArgs);

      webSocketStream.write(result);

      console.log(`-> ${result}`);
    } catch {
      console.error(errorMessages.commonError);
    }
  });

  console.log(`WebSocketServer running at http://localhost:${port}/`);
});

webSocketServer.on('error', () => {
  console.log(errorMessages.websocketError);
});

process.on('SIGINT', () => {
  console.log('WebSocketServer stopped');
  webSocketServer.clients.forEach((client) => client.close());
  webSocketServer.close();
  process.exit();
});

