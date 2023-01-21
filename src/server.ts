import { createWebSocketStream, WebSocketServer } from 'ws';
import { config } from "dotenv";
import handleDrawing from "./handleDrawing";
import handleMouse from "./handleMouse";
import handleScreenshot from "./handleScreenshot";
import { GeneralCommands } from "./types";
import errorMessages from "./errorMessages";

config();

const port = Number(process.env.PORT) || 8080;
const webSocketServer = new WebSocketServer({ port });

webSocketServer.on('connection', (ws) => {
  const webSocketStream = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  webSocketStream.on('data', async (data: string) => {
    try {
      const [input, ...args] = data.split(' ');
      const updatedArgs = args.map(value => Number(value))
      const [command, type] = input.split('_');

      switch (command) {
        case GeneralCommands.mouse:
          const coordinates = await handleMouse(type, updatedArgs[0]);

          if (coordinates) {
            webSocketStream.write(`${input} ${coordinates.x},${coordinates.y}`);
          } else {
            webSocketStream.write(data);
          }

          break;
        case GeneralCommands.draw:
          await handleDrawing(type, updatedArgs);

          webSocketStream.write(data);

          break;
        case GeneralCommands.prnt:
          const screenshotData = await handleScreenshot();

          webSocketStream.write(`${data} ${screenshotData}`);

          break;
      }
    } catch {
      console.error(errorMessages.commonError);
    }
  });

  console.log(`WebSocketServer running at http://localhost:${port}/`);
});

webSocketServer.on('error', () => {
  console.log(errorMessages.websocketError);
});
