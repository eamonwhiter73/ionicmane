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
  useremail;
  stylistpassword;
  userpassword;

  constructor(public storage: Storage, private afAuth: AngularFireAuth, public keyboard: Keyboard, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.storage.get('email').then((val) => {
      this.stylistemail = val;
    });

    this.storage.get('password').then((val) => {
      this.stylistpassword = val;
    })

    this.storage.get('emailUSER').then((val) => {
      this.useremail = val;
    })

    this.storage.get('passwordUSER').then((val) => {
      this.userpassword = val;
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
    else if(userx.email === this.stylistemail && userx.password === this.stylistpassword) { //|| ()) {
      const result = this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then((data) => {
        console.log(data);
        if(data.email && data.uid) {
            this.navCtrl.push(FeedStylist);
        }
      });
    }
    else if(userx.email === this.useremail && userx.password === this.userpassword) {
      const result = this.afAuth.auth.signInWithEmailAndPassword(userx.email, userx.password).then((data) => {
        console.log(data);
        if(data.email && data.uid) {
            this.navCtrl.push(FeedUser);
        }
      });
    }
    else {
      alert("Your username or password is incorrect");
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
