import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage {
	stylist: boolean;
  user: boolean;

  constructor(public keyboard: Keyboard, public navCtrl: NavController) {

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

  goButton(code) {
    console.log(code);
    if(code == 13) {
      this.keyboard.close();
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

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(SignUpPage);
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
