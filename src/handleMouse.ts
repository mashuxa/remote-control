import { mouse, left, right, up, down, Point } from '@nut-tree/nut-js';
import { MouseCommands } from "./types";

export default async (command: string, offset: number): Promise<Point | undefined> => {
  switch (command) {
    case MouseCommands.left:
      await mouse.move(left(offset));
      break;
    case MouseCommands.up:
      await mouse.move(up(offset));
      break;
    case MouseCommands.right:
      await mouse.move(right(offset));
      break;
    case MouseCommands.down:
      await mouse.move(down(offset));
      break;
    case MouseCommands.position:
      return mouse.getPosition();
  }
};