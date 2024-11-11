import { Vec2 } from "kaplay";
import k from "../kaplayCtx";

interface GameSettings {
  _speed: number;
  _life: number;

  speed: number;
  life: number;
}

const defaultSettings = {
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

export function makeSonic(
  pos: Vec2,
  gameSettings: GameSettings = defaultSettings
) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.body({ jumpForce: 1700 }),
    k.pos(pos),
    "sonic",
  ]);
  sonic.onButtonPress("jump", () => {
    if (sonic.isGrounded()) {
      sonic.play("jump");
      sonic.jump();
      k.play("jump", { volume: 0.5 });
    }
  });

  sonic.onGround(() => {
    sonic.play("run");
  });

  sonic.onCollide("enemy", (enemy) => {
    if (sonic.pos.y < 744) {
      k.destroy(enemy);
      k.play("destroy");
      sonic.play("jump");
      sonic.jump();

      return;
    }
    k.play("hurt");
    gameSettings.life--;
    if (gameSettings.life === 0) k.go("gameover");
  });
  return sonic;
}
