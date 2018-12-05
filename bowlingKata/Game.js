const Frame = require("./Frame");
module.exports = class Game {
  constructor() {
    this.frames = this.createFrames();
    this.frameIndex = 0;
  }

  createFrames() {
    const array = [new Frame()];
    for (let i = 0; i < 9; i++) {
      let nextFrame = new Frame();
      array[i].setNextFrame(nextFrame);
      array.push(nextFrame);
    }
    return array;
  }

  roll(score) {
    const currentFrame = this.frames[this.frameIndex];
    currentFrame.addRoll(score)
    if (currentFrame.isComplete && !currentFrame.isLastFrame) {
      this.frameIndex++
    }
  }
  get score() {
    let score = 0
    for (let frame of this.frames) {
      score += frame.score
    }
    return score
  }
};
