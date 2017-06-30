import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  constructor(public navCtrl: NavController) {

  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SignInPage);
  }
}