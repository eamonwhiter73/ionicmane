import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostpagePage } from './postpage';

@NgModule({
  declarations: [
    PostpagePage,
  ],
  imports: [
    IonicPageModule.forChild(PostpagePage),
  ],
  exports: [
    PostpagePage
  ]
})
export class PostpagePageModule {}
