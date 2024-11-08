import { Vec2 } from "kaplay";
import k from "../kaplayCtx";

export function makeSonic(pos: Vec2) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.body({ jumpForce: 1700 }),
    k.pos(pos),
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
  return sonic;
}
