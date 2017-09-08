import { Component, Renderer, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ActionSheetController, LoadingController } from 'ionic-angular';
import { CameraServiceProfile } from '../../services/cameraserviceprofile';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { ISubscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedStylist } from '../feedstylist/feedstylist';
import { FeedUser } from '../feeduser/feeduser';
import { SignInPage } from '../signin/signin';
import { UserViewProfile } from '../userviewprofile/userviewprofile';













/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnDestroy {
	user = {};
  @ViewChild('profsquare') profilepic:ElementRef;
  @ViewChild('addressEl') addressEl;
  @ViewChild('priceEl') priceEl;
  @ViewChild('arrowback') arrowBackEl;
  @ViewChild('logoutbutton') logoutButton;
  username: string;
  password: string;
  email: string;
  authstate: ISubscription;
  address: string;
  bio: string;
  price;
  subscription: ISubscription;
  subscription2: ISubscription;
  subscription3: ISubscription;
  items: FirebaseObjectObservable<any>;
  items2: FirebaseListObservable<any>;
  oldUser: string;
  picURL: string;
  x: number;
  priceRanges = ['$', '$$', '$$$', '$$$$', '$$$$$'];
  loggedIn = false;
  typeparam;
  type;
  passwordIfChanged;
  emailIfChanged;
  authUser;
  locationtoggle;
  phone;


  constructor(public af: AngularFireDatabase, private afAuth: AngularFireAuth, public storage: Storage, public camera: Camera, public cameraService: CameraServiceProfile, public myrenderer: Renderer, public loadingController: LoadingController, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public keyboard:Keyboard) {

  }

  public optionsGetMedia: any = {
        allowEdit: false,
        quality: 10,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI
  }

  public optionsGetCamera: any = {
        quality: 10,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
  }

  changeShape(shape){
    console.log(shape.value);
    this.price = shape.value;
  }

  tappedToggle() {
    console.log(this.locationtoggle + "          3344343 locationtoggle");
    if(this.locationtoggle == true) {
      this.af.object('/profiles/users/'+this.username+'/location').remove().then(_ => console.log('item deleted!'));
    }
    this.storage.set('location', this.locationtoggle);
  }

  goToProfile() {
    if(this.type == 'stylist' || this.type == 'user/stylist/stylist') {
      this.navCtrl.push(StylistProfile);
    }

    if(this.type == 'user' || this.type == 'user/stylist/user') {
      this.navCtrl.push(UserViewProfile);
    }
  }

  logForm() {
    
    console.log("        ADDDDREESSSSS77777777:  " + this.address);  //moved up here!

    if(this.type == 'user' || this.type == 'user/stylist/user') {

      if(this.username == null || this.password == null || this.email == null || this.bio == null) {
        alert("You need to fill out all of the information");
      }
    }

    console.log(this.authUser + '      authuser       998877');
    this.x = 0;
    console.log(this.passwordIfChanged + "  passwordifchanged                  this.password: " + this.password);
    console.log(this.emailIfChanged + "  passwordifchanged                  this.password: " + this.email);
    this.storage.set('username', this.username);
    if(this.passwordIfChanged != this.password && this.authUser != null) {
      this.authUser.updatePassword(this.password).then(() => {}).catch((e) => {alert("Password update failed.")});
    }
    /*else {
      this.password = this.passwordIfChanged;
      alert("You are not logged in yet, you cannot update your password or email.")
    }*/
    this.storage.set('password', this.password);
    if(this.emailIfChanged != this.email && this.authUser != null) {
      this.authUser.updateEmail(this.email).then(() => {}).catch((e) => {alert("Email update failed.")});
    }
    /*else {
      this.email = this.emailIfChanged;
      alert("You are not logged in yet, you cannot update your password or email.")
    }*/
    this.storage.set('email', this.email);
    this.storage.set('bio', this.bio);
    this.storage.set('picURL', this.picURL);
    this.storage.set('phone', this.picURL);


    //this.storage.get('type').then((val) => {
      if(this.type == 'stylist' || this.type == 'user/stylist/stylist') {
        if(this.username == null || this.password == null || this.email == null || this.bio == null || this.address == null || this.price == null || this.phone == null) {
          alert("You need to fill out all of the information");
        }
        else {
          this.storage.set('address', this.address);
          this.storage.set('price', this.price);

          this.items = this.af.object('/profiles/stylists');

          if(this.username == this.oldUser) {
            this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                                  'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL, 'phone': this.phone}});

            this.navCtrl.setRoot(FeedStylist);
          }
          else {
            this.af.object('/profiles/stylists/'+this.oldUser).remove().then(_ => console.log('item deleted!'));
            this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                              'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL, 'phone': this.phone, 'rating': {'one':0, 'two':0, 'three':0, 'four':0, 'five':0}}});
          
            this.navCtrl.setRoot(FeedStylist);
          }
        }

      }
      if(this.type == 'user' || this.type == 'user/stylist/user') {
        if(this.username == null || this.password == null || this.email == null || this.bio == null || this.phone == null) {
          alert("You need to fill out all of the information");
        }
        else {
          this.items = this.af.object('/profiles/users');

          if(this.username == this.oldUser) {
            this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                                  'bio': this.bio, 'picURL': this.picURL, 'phone': this.phone}});

            this.navCtrl.setRoot(FeedUser);
          }
          else {
            this.af.object('/profiles/users/'+this.oldUser).remove().then(_ => console.log('item deleted!'));
            this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                               'bio': this.bio, 'picURL': this.picURL, 'phone': this.phone, 'rating': {'one':0, 'two':0, 'three':0, 'four':0, 'five':0}}});

            this.navCtrl.setRoot(FeedUser);
          }
        }
      };
    //})
    
    

    

    

    
  }

  logout() {
    if(this.loggedIn) {
      console.log("being logged out ()()()()ER()EW()RWE()()REW()");
      this.afAuth.auth.signOut();
    }
    this.navCtrl.setRoot(SignInPage)
  }

  ngOnDestroy() {
    this.subscription3.unsubscribe();
  }

  ionViewDidLoad() {
    this.storage.get('location').then((val) => {
      this.locationtoggle = val;
      if(val == true) {
        this.locationtoggle = false;
      }
      else {
        this.locationtoggle = true;
      }

      console.log(this.locationtoggle + "     in view did load locationtoggle");
    })

    this.typeparam = this.navParams.get('type');

    this.storage.get('type').then((val) => {
      this.type = val;
      console.log(this.typeparam + '       this.typeparam       ');
      console.log(this.logoutButton + '       this.typeparam       ');

        if(this.typeparam == 'user') { 
          this.myrenderer.setElementStyle(this.addressEl._elementRef.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.priceEl._elementRef.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.arrowBackEl.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.logoutButton._elementRef.nativeElement, 'display', 'none');
        }
        if(this.typeparam == 'user/stylist/user') { 
          this.myrenderer.setElementStyle(this.addressEl._elementRef.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.priceEl._elementRef.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.arrowBackEl.nativeElement, 'display', 'none');
          //this.myrenderer.setElementStyle(this.logoutButton._elementRef.nativeElement, 'display', 'none');
        }
        else if(this.type == 'user/stylist/user') {
          this.myrenderer.setElementStyle(this.addressEl._elementRef.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.priceEl._elementRef.nativeElement, 'display', 'none');
        }
        else if(this.typeparam == 'stylist') {
          this.myrenderer.setElementStyle(this.arrowBackEl.nativeElement, 'display', 'none');
          this.myrenderer.setElementStyle(this.logoutButton._elementRef.nativeElement, 'display', 'none');
        }

        this.oldUser = this.username;

        this.subscription3 = this.afAuth.authState.subscribe(data => {
          if(data != null) {
            if(data.email && data.uid) {
              console.log("logged in");
              this.authUser = data;
              this.loggedIn = true;
            }
          }
        })
        
        setTimeout(() => {
          console.log('ionViewDidLoad SettingsPage');

          this.storage.get('username').then((val) => {this.username = val; this.getProfilePic(); console.log(val + "        getting username          3333222222")});
          this.storage.get('password').then((val) => {this.password = val; this.passwordIfChanged = this.password; console.log(val + "        getting password222222")});
          
          this.storage.get('email').then((val) => {this.email = val; this.emailIfChanged = this.email;console.log(val + "        getting email33333333")});
          
          this.storage.get('bio').then((val) => {this.bio = val; console.log(val + "        getting biooooooooo")});
          this.storage.get('picURL').then((val) => {this.picURL = val; });
          this.storage.get('phone').then((val) => {this.phone = val; });
          
          if(this.type == 'stylist' || this.type == 'user/stylist/stylist') {
            this.storage.get('address').then((val) => {this.address = val; console.log(val + "        getting addressssssss")});
            this.storage.get('price').then((val) => {this.price = val; });
          }
          
          
        }, 1000);

    })

    
  }

  getProfilePic() {
    console.log("inside get profile pic &*&*(&*%^$%$%$%$%$%");
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
      storageRef.getDownloadURL().then(url => {
        console.log(url);
        this.picURL = url;
        this.myrenderer.setElementAttribute(this.profilepic.nativeElement, 'src', url);
        resolve();
      }).catch((e) => {
        console.log(e.message);
      });
    });
  }

  goButton(code) {
    console.log(code);
    if(code == 13) {
      this.keyboard.close();
    }
  }

  change() {
  	this.presentActionSheet();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            
            this.cameraService.getMedia(this.optionsGetCamera, null, this.username).then(() => {
              let loading = this.loadingController.create({content : "Loading..."});
              loading.present();
              return new Promise((resolve, reject) => {
                
                //setTimeout(() => {
                let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
                
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.picURL = url;
                    this.myrenderer.setElementAttribute(this.profilepic.nativeElement, 'src', url);
                    loading.dismiss();
                    resolve();
                  }).catch((e) => {
                    alert("Something went wrong with the upload, please try again.");
                    loading.dismiss();
                    resolve();
                  });

                  loading.dismiss();
                //}, 3500);
              });
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
          }
        },{
          text: 'Photo Library',
          handler: () => {
            
            this.cameraService.getMedia(this.optionsGetMedia, null, this.username).then(() => {
              let loading = this.loadingController.create({content : "Loading..."});
              loading.present();
              return new Promise((resolve, reject) => {
                
                //setTimeout(() => {
                let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
                
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.picURL = url;
                    this.myrenderer.setElementAttribute(this.profilepic.nativeElement, 'src', url);
                    loading.dismiss();
                    resolve();
                  }).catch((e) => {
                    alert("Something went wrong with the upload, please try again.");
                    loading.dismiss();
                    resolve();
                  });

                  loading.dismiss();
                //}, 3500);
              });
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
