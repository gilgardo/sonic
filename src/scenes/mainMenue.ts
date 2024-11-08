import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import makeParallaxBg from "../utils/makeParallaxBg";

export default function MainMenue() {
  if (!k.getData("score")) k.setData("score", 0);
  k.onButtonPress("jump", () => k.go("game"));

  const bgPieceWidth = 1920;
  const platformWidth = 1280;
  const bgPieces = [
    k.add([k.sprite("city-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("city-bg"),
      k.pos(bgPieceWidth * 2, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
  ];

  k.add([
    k.text("SONIC RING RUN", { font: "mania", size: 96 }),
    k.pos(k.center().add(0, -300)),
    k.anchor("center"),
  ]);
  k.add([
    k.text("Press Space/Click to play", { font: "mania", size: 80 }),
    k.pos(k.center().add(0, -150)),
    k.anchor("center"),
  ]);
  makeSonic(k.vec2(200, 754));

  k.onUpdate(() => {
    makeParallaxBg(bgPieces, bgPieceWidth * 2, 100);

    makeParallaxBg(platforms, platformWidth * 4, 3000, 450);
  });
}
