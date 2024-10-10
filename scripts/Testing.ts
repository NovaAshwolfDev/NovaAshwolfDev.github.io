export type Sprite = {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
  clipRect: [number, number, number, number];
};

export class WebSprite extends CanvasRenderingContext2D implements Sprite {
  constructor(x, y, width, height, image, clipRect) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.clipRect = clipRect;
  }
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
  clipRect: [number, number, number, number];

  draw(sprite: Sprite, context: CanvasRenderingContext2D) {
    const canvas = document.createElement("canvas");
    canvas.width = sprite.width;
    canvas.height = sprite.height;
    const newContext = canvas.getContext("2d")!;

    // Draw the sprite using the clipping rectangle
    newContext.drawImage(
      sprite.image,
      sprite.clipRect[0],
      sprite.clipRect[1],
      sprite.clipRect[2],
      sprite.clipRect[3],
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height
    );

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Draw the new canvas on the original canvas
    context.drawImage(canvas, sprite.x, sprite.y);
    super.drawImage(canvas, sprite.x, sprite.y);
  }
}
