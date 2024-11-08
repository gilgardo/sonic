import { GameObj } from "kaplay";
import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";
import makeParallaxBg from "../utils/makeParallaxBg";

export default function game() {
  k.setGravity(3100);
  const bgPieceWidth = 1920;
  const platformWidth = 1280;
  const bgPieces: GameObj[] = [
    k.add([k.sprite("city-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("city-bg"),
      k.pos(bgPieceWidth * 2, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms: GameObj[] = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
  ];

  const gameSettings = { speed: 300 };

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
  ]);

  k.loop(1, () => (gameSettings.speed += 50));

  const sonic = makeSonic(k.vec2(200, 754));

  k.onUpdate(() => {
    makeParallaxBg(bgPieces, bgPieceWidth * 2, 100);
    makeParallaxBg(platforms, platformWidth * 4, gameSettings.speed, 450);
  });
}
