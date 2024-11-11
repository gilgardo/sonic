import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import makeParallaxBg from "../utils/makeParallaxBg";
import setBgSprites from "../utils/setBgSprites";

export default function MainMenue() {
  if (!k.getData("score")) k.setData("score", 0);
  k.onButtonPress("jump", () => k.go("game"));

  const { bgPieceWidth, platformWidth, bgPieces, platforms } = setBgSprites();

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
