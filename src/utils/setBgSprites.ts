import k from "../kaplayCtx";

export default function setBgSprites() {
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

  return { bgPieceWidth, platformWidth, bgPieces, platforms };
}
