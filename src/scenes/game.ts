import { makeMotobug } from "../entities/motobug";
import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";
import makeParallaxBg from "../utils/makeParallaxBg";
import setBgSprites from "../utils/setBgSprites";

export default function game() {
  k.setGravity(3100);
  const gameSettings = {
    _speed: 300,
    _life: 3,

    get speed() {
      return this._speed;
    },
    set speed(value) {
      this._speed = Math.min(value, 1000);
    },

    get life() {
      return this._life;
    },
    set life(value) {
      this._life = Math.max(0, value);
    },
  };
  const { bgPieceWidth, platformWidth, bgPieces, platforms } = setBgSprites();
  const cachedData = { score: 1000, life: 1000 };

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
  ]);

  const lifeWriting = k.add([
    k.text(`LIVES: ${gameSettings.life}`, { font: "mania", size: 96 }),
    k.pos(k.center().add(100, -350)),
    k.anchor("center"),
  ]);

  const sonic = makeSonic(k.vec2(200, 754), gameSettings);
  k.loop(1, () => (gameSettings.speed += 50));

  const handleMotobugs = () => {
    const motobug = makeMotobug(k.vec2(1900, 754));
    k.onUpdate(() => {
      const vel =
        gameSettings.speed >= 3000
          ? gameSettings.speed
          : 300 + gameSettings.speed;
      motobug.move(k.vec2(-vel, 0));
    });
    const time = k.rand(1, 2.5);
    k.wait(time, handleMotobugs);
  };
  handleMotobugs();

  k.onUpdate(() => {
    makeParallaxBg(bgPieces, bgPieceWidth * 2, 100);
    makeParallaxBg(platforms, platformWidth * 4, gameSettings.speed, 450);
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    if (cachedData.life !== gameSettings.life) {
      lifeWriting.text = `LIVES: ${gameSettings.life}`;
      cachedData.life = gameSettings.life;
    }
  });
}
