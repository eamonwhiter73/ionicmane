import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage {

  constructor(public navCtrl: NavController) {

  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SignUpPage);
  }
}
