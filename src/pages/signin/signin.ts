import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../models/user'

@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage {
	stylist: boolean;
  users: boolean;
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public keyboard: Keyboard, public navCtrl: NavController) {

  }

  selectOneStylist() {
    if(this.users) {
      this.users = false;
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

  async login(userx: User){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    /**/
    if(!userx.email || !userx.password) {
      alert("You need to enter an email and password");
    }
    else {
      const result = this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then((data) => {
        console.log(data);
        if(data.email && data.uid) {
          if(this.users) {
            this.navCtrl.push(FeedUser);
          }
          else if(this.stylist) {
            this.navCtrl.push(FeedStylist)
          }
          else {
            alert("You need to select User or Stylist.");
          }
        }
      });
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
    
  }
}
