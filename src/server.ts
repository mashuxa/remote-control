import { WebSocketServer } from 'ws';
import { config } from "dotenv";
import handleDrawing from "./handleDrawing";
import handleMouse from "./handleMouse";
import handleScreenshot from "./handleScreenshot";

config();

const port = Number(process.env.PORT) || 8080;
const webSocketServer = new WebSocketServer({ port });

webSocketServer.on('connection', (ws) => {
  ws.on('message', async (data) => {
    const [input, ...args] = data.toString().split(' ');
    const updatedArgs = args.map(value => Number(value))
    const [command, type] = input.split('_');

    switch (command) {
      case 'mouse':
        const coordinates =  await handleMouse(type, updatedArgs[0]);

        if (coordinates) {
          ws.send(`${input} ${coordinates.x},${coordinates.y}`);
        } else {
          ws.send(data.toString());
        }

        break;
      case 'draw':
        await handleDrawing(type, updatedArgs);

        ws.send(data.toString());

        break;
      case 'prnt':
        const screenshotData = await handleScreenshot();

        ws.send(`${data.toString()} ${screenshotData}`);

        break;
    }
  });

  console.log(`WebSocketServer running at http://localhost:${port}/`);
});

webSocketServer.on('error', () => {
  console.log('Some error');
});
