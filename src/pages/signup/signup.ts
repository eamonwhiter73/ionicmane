import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { SettingsPage } from '../settings/settings';

import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { ISubscription } from "rxjs/Subscription";




@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html'
})
export class SignUpPage implements OnDestroy {
  stylist: boolean;
  users: boolean;
  items: FirebaseListObservable<any>;
  user = {} as User;
  subscription: ISubscription;

  constructor(public facebook: Facebook, public storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public keyboard: Keyboard, public af: AngularFireDatabase) {
    /*this.items = af.list('/test');
    this.items.subscribe(items => items.forEach(item => { 
      console.log(item.$value);
    }));*/
    this.storage.get('username').then((val) => {console.log(val + "        getting username")});
  }

  async register(userx: User){
    try {
    if(userx.email && userx.password && this.user.username && (this.stylist || this.users)) {

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

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': usery.email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};

    if(this.users) {
      this.storage.set('type', 'user');
      profile.type = "user";
    }
    else {
      this.storage.set('type', 'stylist');
      profile.type = "stylist";
    }

    this.storage.set('username', usery.username);
    this.storage.set('password', usery.password);
    this.storage.set('email', usery.email);

    

    this.items = this.af.list('/profiles/' + usery.username + '/');
    this.subscription = this.items.subscribe(items => {
      console.log(JSON.stringify(items.$value));
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

  fbLogin(userx: User): Promise<any> {
    if(this.users || this.stylist) {
      return this.facebook.login(["email"])
        .then( response => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

            firebase.auth().signInWithCredential(facebookCredential)
              .then( success => { 
                console.log("Firebase success: " + JSON.stringify(success));

                this.setUserStylist(userx);
              });

        }).catch((error) => { console.log(error) });
    }
    else {
      alert("You need to select user or stylist")
    }
  }

  ionViewDidLoad() {
    
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