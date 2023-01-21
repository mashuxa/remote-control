import { mouse, Region, screen } from "@nut-tree/nut-js";
import { imageToJimp } from "@nut-tree/nut-js/dist/lib/provider/io/imageToJimp.function";

const screenshotSize = 200;

export default async (): Promise<string> => {
  const { x, y } = await mouse.getPosition();
  const screenshotRegion = new Region(x - screenshotSize/2, y - screenshotSize/2, screenshotSize, screenshotSize);

  void screen.highlight(screenshotRegion);

  const nutImage = await screen.grabRegion(screenshotRegion);
  const jimpImage = await imageToJimp(nutImage);
  const bufferImage = await jimpImage.getBufferAsync('image/png');

  return bufferImage.toString('base64');
};