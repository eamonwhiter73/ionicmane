import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { SettingsPage } from '../settings/settings';

import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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
  items: FirebaseObjectObservable<any>;
  items2: FirebaseObjectObservable<any>;
  items3: FirebaseObjectObservable<any>;
  user1 = {} as User1;
  subscription: ISubscription;
  subscription3: ISubscription;
  type;
  isLoggedIn = false;
  email;
  password;
  username;
  bool = false;
  boool = false;

  constructor(public loadingController: LoadingController, private googlePlus: GooglePlus, public facebook: Facebook, public storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public keyboard: Keyboard, public af: AngularFireDatabase) {

  }

  ionViewWillUnload() {
    this.navCtrl.pop();
  }

  async register(){
    
    if(this.bool) {
      let loading = this.loadingController.create({content : "Loading..."});
      loading.present();
      try {
        //if(this.stylist) {
          this.items = this.af.object('/profiles/stylists/' + this.user1.username);
          this.subscription = this.items.subscribe(item => {
            console.log(JSON.stringify(item) + "        this is the null");
            console.log(JSON.stringify(this.user1) + "        this is the user");
            if(item.username == this.user1.username) {
              //
            }
            else {
              this.boool = true;
              console.log("turning thisbool true");
            }
          });
        //}
        //else if(this.users) {
          this.items3 = this.af.object('/profiles/users/' + this.user1.username);
          this.subscription3 = this.items3.subscribe(item => {
            console.log(JSON.stringify(item) + "        this is the null");
            if(item.username == this.user1.username) {
               //
            }
            else {
              console.log("turning thisbool true");
              this.boool = true;
            }
          });
        //}

        setTimeout(()=> {
          if(this.boool) {
            if(this.user1.email && this.user1.password && this.user1.username && (this.stylist || this.users)) {
              console.log('createuserwithemail above 999999');
              this.afAuth.auth.createUserWithEmailAndPassword(this.user1.email, this.user1.password).then(() => {
                setTimeout(() => {
                  console.log('createuserwithemail 88888');
                  loading.dismiss();
                  this.setUserStylist(this.user1);
                }, 1500)
              }).catch((e) => {
                alert(e.message);
              });
            }
            else {
              loading.dismiss();
              alert("You need to fill in all the information");
            }
          }
          else {
            loading.dismiss();
            alert("This username is taken");
          }
        }, 1000)
      }
      catch(e) {
        loading.dismiss();
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
          if(this.user1.username == null) {
            this.user1.username = this.username;      
          }

          this.user1.email = this.email;
          this.user1.password = this.password;

          this.setUserStylist(this.user1);
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
    if(this.subscription != null) {
      this.subscription.unsubscribe();
    }
    if(this.subscription3 != null) {
      this.subscription3.unsubscribe();
    }
  }

  setUserStylist(usery) {
    console.log(usery + "           in setuserstylist");

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': usery.email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};
    
      if(this.type == 'user' && this.users) {
        alert("You already have a user account");
      }
      else if(this.type == 'stylist' && this.stylist) {
        alert("You already have a stylist account");
      }
      else if(this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
        alert("You already have a user account and a stylist account")
      }
      else {
        if(this.users) {
          
          
          profile.type = "user";

          this.storage.set('username', usery.username);
          this.storage.set('password', usery.password);
          this.storage.set('email', usery.email);

          this.items2 = this.af.object('/profiles/users/' + this.user1.username);
          this.items2.update(profile);

          if(this.type == 'stylist' || this.type == 'user/stylist/stylist') {
            this.storage.set('type', 'user/stylist/user');
            this.navCtrl.push(SettingsPage, {type: 'user/stylist/user'});
          }
          else {
            this.storage.set('type', 'user');
            this.navCtrl.push(SettingsPage, {type: 'user'});
          }
                                                                                                                        //TEST SAME USERNAME USER AND STYLIST!!S
          
        }
        else if(this.stylist) {
          
          profile.type = "stylist";
          console.log(JSON.stringify(usery) + "     : usery 55555555");
          this.storage.set('username', usery.username);
          this.storage.set('password', usery.password);
          this.storage.set('email', usery.email);

          

          console.log("in this.stylist choice")
          this.items2 = this.af.object('/profiles/stylists/' + this.user1.username);
          this.items2.update(profile);

          if(this.type == 'user' || this.type == 'user/stylist/user') {
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
    

    

    

    
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
  }

  setUserStylistG(usery, email) {
    console.log(email + "           in setuserstylist email");

    let profile = {'username': usery.username, 'password': usery.password,
                    'email': email, 'bio':"", 'address':"", 'type':"", 'rating':{'one':'0','two':'0','three':'0','four':'0','five':'0'}};
    
      if(this.type == 'user' && this.users) {
        alert("You already have a user account");
      }
      else if(this.type == 'stylist' && this.stylist) {
        alert("You already have a stylist account");
      }
      else if(this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
        alert("You already have a user account and a stylist account")
      }
      else {
        if(this.users) {
          
          
          profile.type = "user";

          this.storage.set('username', usery.username);
          this.storage.set('password', usery.password);
          this.storage.set('email', email);

          

          this.items.set(profile);
          if(this.type == 'stylist' || this.type == 'user/stylist/stylist') {
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

          console.log("in this.stylist choice")
          this.items.set(profile);

          if(this.type == 'user' || this.type == 'user/stylist/user') {
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