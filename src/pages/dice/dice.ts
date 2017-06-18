import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiceExpression } from "../../models/diceExpression";
import { DiceGroup } from "../../models/diceGroup";

@Component({
  selector: 'page-dice',
  templateUrl: 'dice.html'
})
export class DicePage {
  log: string = "";
  constructor(public navCtrl: NavController) { }

  ionViewDidEnter() {
    this.roll();
  }

  roll() {
    var exp = new DiceExpression();
    exp.modifier = 1;
    exp.addDiceGroup(DiceGroup.create(1, 4));
    exp.addDiceGroup(DiceGroup.create(2, 10));
    exp.roll();

    this.log += `${exp.explain()}\n`
      + `rolled: ${exp.result}\n`
      + `min: ${exp.min}\n`
      + `max: ${exp.max}\n\n`;
  }

}
