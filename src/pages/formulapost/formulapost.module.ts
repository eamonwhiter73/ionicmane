import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormulapostPage } from './formulapost';

@NgModule({
  declarations: [
    FormulapostPage,
  ],
  imports: [
    IonicPageModule.forChild(FormulapostPage),
  ],
  exports: [
    FormulapostPage
  ]
})
export class FormulapostPageModule {}
