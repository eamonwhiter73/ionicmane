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
  username: string;
  password: string;
  email: string;
  authstate: ISubscription;
  address: string;
  bio: string;
  price;
  subscription: ISubscription;
  subscription2: ISubscription;
  items: FirebaseObjectObservable<any>;
  items2: FirebaseListObservable<any>;
  oldUser: string;
  picURL: string;
  x: number;
  priceRanges = ['$', '$$', '$$$', '$$$$', '$$$$$'];


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

  goToProfile() {
    this.navCtrl.push(StylistProfile);
  }

  logForm() {
    
    console.log("        ADDDDREESSSSS77777777:  " + this.address);  //moved up here!

    this.x = 0;

    this.storage.set('username', this.username);
    this.storage.set('password', this.password);
    this.storage.set('email', this.email);
    this.storage.set('address', this.address);
    this.storage.set('bio', this.bio);
    this.storage.set('price', this.price);
    this.storage.set('picURL', this.picURL);

    this.items = this.af.object('/profiles/stylists');
    if(this.username == this.oldUser) {
      this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                            'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL}});
    }
    else {
      this.af.object('/profiles/stylists/'+this.oldUser).remove().then(_ => console.log('item deleted!'));
      this.items.update({[this.username] : {'username': this.username, 'password': this.password, 'email': this.email,
                        'address': this.address, 'bio': this.bio, 'price': this.price, 'picURL': this.picURL, 'rating': {'one':0, 'two':0, 'three':0, 'four':0, 'five':0}}});
    }




    

    this.navCtrl.setRoot(FeedStylist);

    
  }

  ngOnDestroy() {
  }

  ionViewDidLoad() {

    this.oldUser = this.username;
    
    setTimeout(() => {
      console.log('ionViewDidLoad SettingsPage');
      this.storage.get('username').then((val) => {this.username = val; console.log(val + "        getting username1111")});
      this.storage.get('password').then((val) => {this.password = val; console.log(val + "        getting password222222")});
      this.storage.get('email').then((val) => {this.email = val; console.log(val + "        getting email33333333")});
      this.storage.get('address').then((val) => {this.address = val; console.log(val + "        getting addressssssss")});
      this.storage.get('bio').then((val) => {this.bio = val; console.log(val + "        getting biooooooooo")});
      this.storage.get('price').then((val) => {this.price = val; });
      this.storage.get('picURL').then((val) => {this.picURL = val; });
      this.getProfilePic();
    }, 1000);

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
            this.cameraService.getMedia(this.optionsGetCamera, null).then(() => {
              return new Promise((resolve, reject) => {
                let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
                let loading = this.loadingController.create({content : "Loading..."});
                loading.present();
                setTimeout(() => {
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.picURL = url;
                    this.myrenderer.setElementAttribute(this.profilepic.nativeElement, 'src', url);
                    resolve();
                  });
                  loading.dismiss();
                }, 3000);
              });
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
          }
        },{
          text: 'Photo Library',
          handler: () => {

            this.cameraService.getMedia(this.optionsGetMedia, null).then(() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
                  let loading = this.loadingController.create({content : "Loading..."});
                  loading.present();
                  
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.picURL = url;
                    this.myrenderer.setElementAttribute(this.profilepic.nativeElement, 'src', url);
                    loading.dismiss();
                    resolve();
                  });
                  
                }, 3000);
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
