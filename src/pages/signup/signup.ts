import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';



@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  stylist: boolean;
  user: boolean;

  constructor(public navCtrl: NavController, public keyboard: Keyboard) {

  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SignInPage);
  }

  goButton(code) {
    console.log(code);
    if(code == 13) {
      this.keyboard.close();
    }
  }

  selectOneStylist() {
    if(this.user) {
      this.user = false;
    }
  }

  selectOneUser() {
    if(this.stylist) {
      this.stylist = false;
    }
  }

  loadNext(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    if(this.user) {
      this.navCtrl.push(FeedUser);
    }
    if(this.stylist) {
      this.navCtrl.push(FeedStylist)
    }
  }

  logForm(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    if(this.user) {
      this.navCtrl.push(FeedUser);
    }
    else if(this.stylist) {
      this.navCtrl.push(FeedStylist)
    }
    else {
      alert("You need to select User or Stylist.");
    }
  }
}