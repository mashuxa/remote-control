import { GeneralCommands } from "./types";
import handleMouse from "./handleMouse";
import handleDrawing from "./handleDrawing";
import handleScreenshot from "./handleScreenshot";

export default async (data: string, command: string, type: string, args: number[]): Promise<string> => {
  switch (command) {
    case GeneralCommands.mouse:
      const coordinates = await handleMouse(type, args[0]);

      return coordinates ? `${data} ${coordinates.x},${coordinates.y}` : data;

    case GeneralCommands.draw:
      await handleDrawing(type, args);

      return data;

    case GeneralCommands.prnt:
      const screenshotData = await handleScreenshot();

      return `${data} ${screenshotData}`;

    default:
      return data;
  }
};