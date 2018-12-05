const Game = require("./Game");

let game;
const rollMany = (times, score) => {
  for (let i = 0; i < times; i++) {
    game.roll(score);
  }
};

beforeEach(() => {
  game = new Game();
});

describe("Game creation", () => {
  test("Game has 10 frames", () => {
    expect(game.frames.length).toBe(10);
  });
  test("frames should have a next frame if it is not the last frame", () => {
    for (let i = 0; i < 9; i++) {
      expect(game.frames[i].nextFrame).toBeTruthy();
    }
  });

  test("Last frame has no next frame", () => {
    expect(game.frames[9].nextFrame).toBeFalsy();
  });
});

describe("Frame switching", () => {
  test("game switches to next frame after 2 rolls if no strike and not last frame", () => {
    game.roll(4);
    game.roll(4);
    expect(game.frameIndex).toBe(1);
  });

  test("Game switches to next frame if there is a strike", () => {
    game.roll(10);
    expect(game.frameIndex).toBe(1);
  });

  test("Game switches to following frame is there are consecutive strikes", () => {
    game.roll(10);
    game.roll(10);
    expect(game.frameIndex).toBe(2);
  });

  test("game does not switch to next frame if it is the last frame", () => {
    rollMany(20, 0);
    expect(game.frameIndex).toBe(9);
  });
});

describe("Game scoring", () => {
  test("total gutter game returns score of 0", () => {
    rollMany(20, 0);
    expect(game.score).toBe(0);
  });

  test("all rolls with a score of 1 returns score of 20", () => {
    rollMany(20, 1);
    expect(game.score).toBe(20);
  });

  test("all rolls with a score of 4 return score of 80", () => {
    rollMany(20, 4);
    expect(game.score).toBe(80);
  });

  test("all rolls that are spares return score of 150", () => {
    rollMany(21, 5);
    expect(game.score).toBe(150);
  });

  test("Perfect game has a score of 300", () => {
    rollMany(12, 10);
    expect(game.score).toBe(300);
  });

  test("last game has a spare", () => {
    rollMany(18, 0);
    game.roll(5);
    game.roll(5);
    game.roll(5);
    expect(game.score).toBe(15);
  });
});
