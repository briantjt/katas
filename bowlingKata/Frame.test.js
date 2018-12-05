const Frame = require("./Frame");

let frame;
let nextFrame;
const addMany = (times, pins) => {
  for (let i = 0; i < times; i++) {
    frame.addRoll(pins);
  }
};
describe("Frames that are not the last frame ", () => {
  beforeEach(() => {
    frame = new Frame();
    nextFrame = new Frame();
    frame.setNextFrame(nextFrame);
  });

  test("frame is incomplete with no rolls", () => {
    expect(frame.isComplete).toBeFalsy();
  });

  test("frame is incomplete with 1 roll", () => {
    frame.addRoll(3);
    expect(frame.isComplete).toBeFalsy();
  });

  test("complete frame", () => {
    addMany(2, 3);
    expect(frame.isComplete).toBeTruthy();
  });

  test("strike should make frame complete", () => {
    frame.addRoll(10);
    expect(frame.isComplete).toBeTruthy();
  });
});

describe("Last frame", () => {
  let frame;
  beforeEach(() => {
    frame = new Frame();
  });

  test("frame is incomplete with 2 rolls if there is a strike", () => {
    frame.addRoll(10);
    frame.addRoll(10);
    expect(frame.isComplete).toBeFalsy();
  });

  test("frame is incomplete with 2 rolls is there is a spare ", () => {
    frame.addRoll(5);
    frame.addRoll(5);
    expect(frame.isComplete).toBeFalsy();
  });

  test("frame is complete with 3 rolls if there is a strike", () => {
    frame.addRoll(10);
    frame.addRoll(5);
    frame.addRoll(5);
    expect(frame.isComplete).toBeTruthy();
  });

  test("frame is complete with 3 rolls if there is a spare", () => {
    frame.addRoll(5);
    frame.addRoll(5);
    frame.addRoll(5);
    expect(frame.isComplete).toBeTruthy();
  });

  test("frame is complete if there are 2 rolls with no strike or spare", () => {
    frame.addRoll(3);
    frame.addRoll(3);
    expect(frame.isComplete).toBeTruthy();
  });

  test("frame is incomplete if there is 1 roll with no strike", () => {
    frame.addRoll(5);
    expect(frame.isComplete).toBeFalsy();
  });
});

describe("Frame scores which are not last frame or second last frame", () => {
  let followingFrame;
  beforeEach(() => {
    frame = new Frame();
    nextFrame = new Frame();
    followingFrame = new Frame();
    frame.setNextFrame(nextFrame);
    nextFrame.setNextFrame(followingFrame);
  });

  test("correctly calculate frame score with no strike or spare", () => {
    frame.addRoll(3);
    frame.addRoll(3);
    expect(frame.score).toBe(6);
  });

  test("correctly calculate frame score with spare", () => {
    frame.addRoll(5);
    frame.addRoll(5);
    frame.nextFrame.addRoll(5);
    expect(frame.score).toBe(15);
  });

  test("correctly calculates frame score with 1 strike", () => {
    frame.addRoll(10);
    nextFrame.addRoll(5);
    nextFrame.addRoll(3);
    expect(frame.score).toBe(18);
  });

  test("correctly calculates frame score with consecutive strikes", () => {
    frame.addRoll(10);
    nextFrame.addRoll(10);
    followingFrame.addRoll(5);
    expect(frame.score).toBe(25);
  });
});

describe("frame scores for second last frame", () => {
  beforeEach(() => {
    frame = new Frame();
    nextFrame = new Frame();
    frame.setNextFrame(nextFrame);
  });

  test("should correctly calculate roll with consecutive strike", () => {
    frame.addRoll(10);
    nextFrame.addRoll(10);
    nextFrame.addRoll(5);
    expect(frame.score).toBe(25);
  });
});

describe("Last frame score calculation", () => {
  beforeEach(() => {
    frame = new Frame();
  });

  test("correctly calculates with no strike or spare", () => {
    frame.addRoll(4);
    frame.addRoll(4);
    expect(frame.score).toBe(8);
  });

  test("correctly calculates with strike", () => {
    frame.addRoll(10);
    frame.addRoll(4);
    frame.addRoll(4);
    expect(frame.score).toBe(18);
  });

  test("correctly calculates with spare", () => {
    addMany(3, 5);
    expect(frame.score).toBe(15);
  });
});
