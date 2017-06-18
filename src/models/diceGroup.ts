import { Die } from "./die";
import { List, Range } from "immutable";
import * as Helpers from "../helpers/functions";

export interface IDiceGroup {
  readonly sides: number;
  readonly count: number;
  readonly result?: number;
  dice?: List<Die>;
}

export class DiceGroup implements IDiceGroup {
  private _count: number = 1;
  private _sides: number = 1;
  private _result: number = 0;

  get sides() { return this._sides; }
  get count() { return this._count; }
  get result() { return this._result; }
  get min() { return this.count; }
  get max() { return this.count * this.sides };

  dice: List<Die> = List<Die>();

  roll(): number {
    this.dice = Range(0, this._count).map(_ => this.createDie()).toList();
    this._result = this.dice.map(d => d.roll()).reduce((w, n) => w + n, 0);
    return this._result;
  }

  explain() {
    let explanation = this.dice.map(d => d.explain()).toArray().reduce((w, n) => `${w},${n}`);
    return `${this.count}d${this.sides}: [${explanation}]`;
  }

  constructor(dg: IDiceGroup = null) {
    if (dg && typeof dg.sides === "number" && typeof dg.count === "number") {
      this._sides = Helpers.floorTo1(dg.sides);
      this._count = Helpers.floorTo1(dg.count);
    } else {
      throw new Error("Provided parameter is not an IDiceGroup");
    }
  }

  private createDie() {
    return Die.create(this.sides);
  }

  static create(count: number, sides: number) {
    return new DiceGroup({ sides, count });
  }
}