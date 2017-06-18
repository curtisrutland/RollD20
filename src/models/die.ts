import * as Helpers from "../helpers/functions";

export interface IDie {
  readonly sides: number;
  readonly result?: number;
}

export class Die implements IDie {
  private _sides: number;  
  get sides() { return this._sides; }

  private _result: number;
  get result() { return this._result; }

  roll(): number {
    this._result = this.doRoll();
    return this.result;
  }

  explain(): string {
    return this.result.toString();
  }

  constructor(d: IDie) {
    if(d && typeof d.sides === "number") {
      this._sides = Helpers.floorTo1(d.sides);
    } else {
      throw new Error("Provided parameter is not a IDie!");
    }
  }

  private doRoll() {
    return Helpers.getRandomIntInclusive(1, this._sides);
  }

  static create(sides: number) {
    return new Die({sides});
  }
}