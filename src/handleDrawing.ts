import { mouse, Button, down, left, right, up, straightTo } from "@nut-tree/nut-js";
import { DrawingCommands } from "./types";

const CIRCLE_SMOOTH_STEPS = 200;

export default async (command: string, [width, length]: number[]): Promise<void> => {
  await mouse.pressButton(Button.LEFT);

  switch (command) {
    case DrawingCommands.circle:
      const mousePosition = await mouse.getPosition();
      const startXPosition = mousePosition.x - width;

      for (let i = 0; i < CIRCLE_SMOOTH_STEPS; i++) {
        const angle = 2 * Math.PI * i / CIRCLE_SMOOTH_STEPS;

        await mouse.move(straightTo({
          x: startXPosition + width * Math.cos(angle),
          y: mousePosition.y + width * Math.sin(angle),
        }));
      }

      break;
    case DrawingCommands.rectangle:
    case DrawingCommands.square:
      const height = length || width;

      await mouse.move(right(width));
      await mouse.move(down(height));
      await mouse.move(left(width));
      await mouse.move(up(height));

      break;
  }

  await mouse.releaseButton(Button.LEFT);
};