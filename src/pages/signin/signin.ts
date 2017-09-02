import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireAuth } from 'angularfire2/auth';
import { User1 } from '../../models/user';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage {
	stylist: boolean;
  users: boolean;
  user = {} as User1;
  stylistemail;
  email;
  password;
  type;

  constructor(public storage: Storage, private afAuth: AngularFireAuth, public keyboard: Keyboard, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.storage.get('email').then((val) => {
      this.email = val;
    });

    this.storage.get('password').then((val) => {
      this.password = val;
    })

    this.storage.get('type').then((val) => {
      this.type = val;
    })
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

  async login(userx: User1){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    /**/

    if(!userx.email || !userx.password) {
      alert("You need to enter an email and password");
    }
    else if(this.stylist && this.type == 'user') {
      alert("You do not have a stylist account, you can add one using the signup page");
    }
    else if(this.users && this.type == 'stylist') {
      alert("You do not have a user account, you can add one using the signup page");
    }
    else if(!this.users && !this.stylist) {
      alert('You need to select "Hair Stylist" or "User"');
    }
    else {
      const result = this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then((data) => {
        console.log(data);
        if(data.email && data.uid) {
          if(this.stylist) {
            this.storage.set('type', 'user/stylist/stylist');
            this.navCtrl.setRoot(FeedStylist);
          }
          else {
            this.storage.set('type', 'user/stylist/user');
            this.navCtrl.setRoot(FeedUser);
          }
        }
      }).catch((e) => {"The username or password is incorrect"});
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
