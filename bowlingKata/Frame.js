class Frame {
  constructor() {
    this.rolls = [];
  }

  addRoll(score) {
    this.rolls.push(score);
  }

  get isComplete() {
    if (this.isLastFrame) {
      if (this.isStrike || this.isSpare) {
        return this.rolls.length === 3;
      }
    }
    if (this.isStrike) return true;
    return this.rolls.length === 2;
  }

  get isSpare() {
    return this.rolls[0] + this.rolls[1] === 10;
  }

  setNextFrame(frame) {
    this.nextFrame = frame;
  }

  get isLastFrame() {
    return this.nextFrame === undefined;
  }

  get isStrike() {
    return this.rolls[0] === 10;
  }

  get scoreFromFrameRolls() {
    return this.rolls.reduce((acc, ele) => acc + ele);
  }
  get score() {
    if (this.isLastFrame) {
      return this.scoreFromFrameRolls;
    } else {
      if (this.isSpare) {
        return this.scoreFromFrameRolls + this.nextFrame.rolls[0];
      }
      if (this.isStrike) {
        return this.scoreFromFrameRolls + this.scoreFromNextTwoRolls;
      }
      return this.scoreFromFrameRolls;
    }
  }

  get scoreFromNextTwoRolls() {
    if (this.nextFrame.isLastFrame) {
      return this.nextFrame.rolls[0] + this.nextFrame.rolls[1];
    }
    if (this.nextFrame.isStrike) {
      return this.nextFrame.rolls[0] + this.nextFrame.nextFrame.rolls[0];
    }
    return this.nextFrame.scoreFromFrameRolls;
  }
}

module.exports = Frame;
