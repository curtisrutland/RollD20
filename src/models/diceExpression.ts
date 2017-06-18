import { DiceGroup } from "./diceGroup";
import { List } from "immutable";

export class DiceExpression {
  diceGroups = List<DiceGroup>();
  modifier: number = 0;
  result: number;
  min: number;
  max: number;

  addDiceGroup(dg: DiceGroup) {
    this.diceGroups = this.diceGroups.push(dg);
  }

  removeAt(idx: number) {
    this.diceGroups = this.diceGroups.remove(idx);
  }

  roll(): number {
    this.min = this.diceGroups.map(d => d.min).reduce((w, n) => w + n, 0) + this.modifier;
    this.max = this.diceGroups.map(d => d.max).reduce((w, n) => w + n, 0) + this.modifier;
    this.result = this.diceGroups.map(d => d.roll()).reduce((w, n) => w + n ,0) + this.modifier;
    return this.result;
  }

  explain(): string {
    let explanation = this.diceGroups.toArray().map(d => d.explain()).reduce((w, n) => `${w} + ${n}`);
    if(this.modifier > 0) {
      explanation += ` + ${this.modifier}`;
    } else if (this.modifier < 0) {
      explanation += ` - ${this.modifier}`;
    }
    return explanation;
  }
}