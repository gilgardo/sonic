import { GameObj } from "kaplay";

export default function makeParallaxBg(
  bgArr: GameObj[],
  width: number,
  speed: number,
  y: number = 0
) {
  if (bgArr.length > 0 && bgArr[1].pos.x < 0) {
    bgArr[0].moveTo(bgArr[1].pos.x + width, y);
    bgArr.push(bgArr.shift()!);
  }

  bgArr[0].move(-speed, 0);
  bgArr[1].moveTo(bgArr[0].pos.x + width, y);
}
