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
  type;
  isLoggedIn = false;
  email;
  password;
  username;
  bool = false;

  constructor(private googlePlus: GooglePlus, public facebook: Facebook, public storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public keyboard: Keyboard, public af: AngularFireDatabase) {
    /*this.items = af.list('/test');
    this.items.subscribe(items => items.forEach(item => { 
      console.log(item.$value);
    }));*/
    
  }

  async register(userx: User1){
    
    

    if(this.bool) {
      try {
        if(userx.email && userx.password && userx.username && (this.stylist || this.users)) {

          const result = await this.afAuth.auth.createUserWithEmailAndPassword(userx.email, userx.password);
          //console.log(result);

          this.setUserStylist(userx);
        }
        else {
          alert("You need to fill in all the information booltrue");
        }
      }
      catch(e) {
        alert(e.message);
      }
    }
    else {
      try {
        if(this.email && this.password && (this.stylist || this.users)) {

          if(!this.isLoggedIn) {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
          }
          //console.log(result);
          if(userx.username == null) {
            userx.username = this.username;      
          }

          userx.email = this.email;
          userx.password = this.password;

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
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setUserStylist(usery) {
    console.log(usery + "           in setuserstylist");

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': usery.email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};
    
    this.storage.get('type').then((val) => {
      if(val == 'user' && this.users) {
        alert("You already have a user account");
      }
      else if(val == 'stylist' && this.stylist) {
        alert("You already have a stylist account");
      }
      else if(val == 'user/stylist/user' || val == 'user/stylist/stylist') {
        alert("You already have a user account and a stylist account")
      }
      else {
        if(this.users) {
          
          
          profile.type = "user";

          this.storage.set('username', usery.username);
          this.storage.set('password', usery.password);
          this.storage.set('email', usery.email);

          this.items = this.af.list('/profiles/users/' + usery.username + '/');
          this.subscription = this.items.subscribe(items => {
            console.log(JSON.stringify(items.$value) + "        this is the null");
            if(items.$value != null) {
              
              
              alert("This username is taken");
            }
            else {
              
            }
          });

          this.items.update('/', profile);
          if(val == 'stylist' || val == 'user/stylist/stylist') {
            this.storage.set('type', 'user/stylist/user');
            this.navCtrl.push(SettingsPage, {type: 'user/stylist/user'});
          }
          else {
            this.storage.set('type', 'user');
            this.navCtrl.push(SettingsPage, {type: 'user'});
          }

          
        }
        else if(this.stylist) {
          
          profile.type = "stylist";
          console.log(JSON.stringify(usery) + "     : usery 55555555");
          this.storage.set('username', usery.username);
          this.storage.set('password', usery.password);
          this.storage.set('email', usery.email);

          this.items = this.af.list('/profiles/stylists/' + usery.username + '/');
          this.subscription = this.items.subscribe(items => {
            console.log(JSON.stringify(items.$value) + "        this is the null");
            if(items.$value != null) {
          
              alert("This username is taken");
            }
          });

          console.log("in this.stylist choice")
          this.items.update('/', profile);

          if(val == 'user' || val == 'user/stylist/user') {
            this.storage.set('type', 'user/stylist/stylist');
            this.navCtrl.push(SettingsPage, { type: 'user/stylist/stylist'});
          }
          else {
            this.storage.set('type', 'stylist');
            this.navCtrl.push(SettingsPage, { type: 'stylist'});
          }
        } 
        else {
          alert("You need to select User or Stylist.");
        }
      }
    });
    

    

    

    
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
      //this.storage.set('passwordUSER', usery.password);
      //this.storage.set('emailUSER', usery.email);
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


  ionViewDidLoad() {

    //TAKE OUT!!!!!!!!
    //this.storage.set('email', '');
    //this.storage.set('type', '');
    //this.storage.set('password', '');
   
    this.subscription = this.afAuth.authState.subscribe(data => {
      if(data != null) {
        if(data.email && data.uid) {
          console.log("logged in");

          this.isLoggedIn = true;
        }
      }
    })

    this.storage.get('type').then((val) => {
      if(val==null) {
        this.bool = true;
      }
      else {
        this.type = val;
      }
    })

    this.storage.get('email').then((val) => {
        this.email = val;   
    })

    this.storage.get('password').then((val) => {
        this.password = val;
    })

    this.storage.get('username').then((val) => {
        this.username = val;
    })
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