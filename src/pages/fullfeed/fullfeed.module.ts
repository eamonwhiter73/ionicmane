import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullfeedPage } from './fullfeed';

@NgModule({
  declarations: [
    FullfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FullfeedPage),
  ],
  exports: [
    FullfeedPage
  ]
})
export class FullfeedPageModule {}
