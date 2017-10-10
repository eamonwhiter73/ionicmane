import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserviewuserprofilePage } from './userviewuserprofile';

@NgModule({
  declarations: [
    UserviewuserprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserviewuserprofilePage),
  ],
  exports: [
    UserviewuserprofilePage
  ]
})
export class UserviewuserprofilePageModule {}
