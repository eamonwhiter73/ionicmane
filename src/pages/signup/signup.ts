import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { SettingsPage } from '../settings/settings';

import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User1 } from '../../models/user';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { ISubscription } from "rxjs/Subscription";
import { GooglePlus } from '@ionic-native/google-plus';




@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html'
})
export class SignUpPage implements OnDestroy {
  stylist: boolean;
  users: boolean;
  items: FirebaseListObservable<any>;
  user1 = {} as User1;
  subscription: ISubscription;

  constructor(private googlePlus: GooglePlus, public facebook: Facebook, public storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public keyboard: Keyboard, public af: AngularFireDatabase) {
    /*this.items = af.list('/test');
    this.items.subscribe(items => items.forEach(item => { 
      console.log(item.$value);
    }));*/
    
  }

  async register(userx: User1){
    try {
    if(userx.email && userx.password && userx.username && (this.stylist || this.users)) {

      const result = await this.afAuth.auth.createUserWithEmailAndPassword(userx.email, userx.password);
      //console.log(result);

      this.setUserStylist(userx);
    }
    else {
      alert("You need to fill in all the information");
    }
    }
    catch(e) {
      alert(e.message);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setUserStylist(usery) {
    console.log(usery + "           in setuserstylist");

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': usery.email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};

    if(this.users) {
      this.storage.set('type', 'user');
      profile.type = "user";

      this.storage.set('usernameUSER', usery.username);
      this.storage.set('passwordUSER', usery.password);
      this.storage.set('emailUSER', usery.email);
    }
    else {
      this.storage.set('type', 'stylist');
      profile.type = "stylist";
      console.log(JSON.stringify(usery) + "     : usery 55555555");
      this.storage.set('username', usery.username);
      this.storage.set('password', usery.password);
      this.storage.set('email', usery.email);
    }

    

    

    this.items = this.af.list('/profiles/stylists/' + usery.username + '/');
    this.subscription = this.items.subscribe(items => {
      console.log(JSON.stringify(items.$value) + "        this is the null");
      if(items.$value != null) {
        
        
        alert("This username is taken");
      }
      else {
        
      }
    });

    if(this.users) {
      profile.type = 'user'
      this.items.update('/', profile);
      this.navCtrl.setRoot(FeedUser);
    }
    else if(this.stylist) {
      console.log("in this.stylist choice")
      profile.type = 'stylist';
      this.items.update('/', profile);
      //this.navCtrl.setRoot(FeedStylist)
      this.navCtrl.push(SettingsPage);
    }
    else {
      alert("You need to select User or Stylist.");
    }
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
  }

  setUserStylistG(usery, email) {
    console.log(email + "           in setuserstylist email");

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};

    if(this.users) {
      this.storage.set('type', 'user');
      profile.type = "user";

      this.storage.set('usernameUSER', usery.username);
      this.storage.set('passwordUSER', usery.password);
      this.storage.set('emailUSER', usery.email);
    }
    else {
      this.storage.set('type', 'stylist');
      profile.type = "stylist";

      this.storage.set('username', usery.username);
      this.storage.set('password', usery.password);
      this.storage.set('email', usery.email);
    }

    

    this.items = this.af.list('/profiles/stylists/' + usery.username + '/');
    this.subscription = this.items.subscribe(items => {
      console.log(JSON.stringify(items.$value) + "        this is the null");
      if(items.$value != null) {
        
        
        alert("This username is taken");
      }
      else {
        
      }
    });

    if(this.users) {
      profile.type = 'user'
      this.items.update('/', profile);
      this.navCtrl.setRoot(FeedUser);
    }
    else if(this.stylist) {
      console.log("in this.stylist choice")
      profile.type = 'stylist';
      this.items.update('/', profile);
      //this.navCtrl.setRoot(FeedStylist)
      this.navCtrl.push(SettingsPage);
    }
    else {
      alert("You need to select User or Stylist.");
    }
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
  }

  fbLogin(userx: User1): Promise<any> {
    if(userx.username == null || userx.password == null) {
      alert("Please enter a username and password");
    }
    else {
      if(this.users || this.stylist) {
        return this.facebook.login(["email"])
          .then( response => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);

              firebase.auth().signInWithCredential(facebookCredential)
                .then( success => { 
                  console.log("Firebase success: " + JSON.stringify(success));

                  this.setUserStylistG(userx, success.email);
                }).catch((error) => {
                  alert(error.message);
                });

          }).catch((error) => { console.log(error) });
      }
      else {
        alert("You need to select user or stylist")
      }
    }
  }

  gLogin(userx: User1) {
    let bool = false;
    let email;
    if(userx.username == null || userx.password == null) {
      alert("Please enter a username and password");
    }
    else {
      this.googlePlus.login({})
        .then(res => {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then( success => {

              console.log("Firebase success: " + JSON.stringify(success));
              bool = true;
              email = success.email;

            }).catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
          }).catch(err => alert(err.message));

        setTimeout(() => {
          if(bool) {
            this.setUserStylistG(userx, email);
          }
        }, 3000);
      }
  }

  instaLogin(userx: User1) {
    let bool = false;
    let email;
    if(userx.username == null || userx.password == null) {
      alert("Please enter a username and password");
    }
    else {
      
    }
  }

  ionViewDidLoad() {
    //this.storage.get('username').then((val) => {console.log(val + "        getting username")});
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
    if(this.users) {
      this.users = false;
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
    if(this.users) {
      this.navCtrl.push(FeedUser);
    }
    if(this.stylist) {
      this.navCtrl.push(FeedStylist)
    }
  }
}