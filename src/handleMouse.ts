import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export default async (command: string, offset: number) => {
  switch (command) {
    case 'left':
      await mouse.move(left(offset));
      break;
    case 'up':
      await mouse.move(up(offset));
      break;
    case 'right':
      await mouse.move(right(offset));
      break;
    case 'down':
      await mouse.move(down(offset));
      break;
    case 'position':
      return mouse.getPosition();
  }
};