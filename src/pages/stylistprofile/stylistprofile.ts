import { Component, NgModule, trigger, state, style, transition, animate, keyframes, ViewChildren, Renderer, QueryList } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import firebase from 'firebase';


//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';

@Component({
  selector: 'page-stylist-profile',
  templateUrl: 'stylistprofile.html',
  animations: [
    trigger('moveCover', [
      state('down', style({
        top: '-103px',
      })),
      state('up', style({
        top: '-192px',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
  ]
})
export class StylistProfile {
  @ViewChildren('pluscontain') components:QueryList<any>;
  @ViewChildren('profsquare') profComponents:QueryList<any>;
  viewDate = new Date();
  events = [];
  calendar = {'mode': 'month', 'currentDate': this.viewDate}
  moveState: String = 'up';
  items: FirebaseListObservable<any>;
  username = "jackson";
  picURLS = [];
  square = 0;

  constructor(/*public firebase: FirebaseApp, */public myrenderer: Renderer, af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public camera: Camera, public navCtrl: NavController, private navParams: NavParams, public cameraService: CameraService) {
    this.items = af.list('/profile/' + this.username);
    this.items.subscribe(items => items.forEach(item => {
      console.log(item.$value);
      this.picURLS.push(item.$value);
    }));
  }

  public optionsGetMedia: any = {
        allowEdit: false,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: this.camera.MediaType.ALLMEDIA,
        destinationType: this.camera.DestinationType.FILE_URI,
  }

  public optionsGetCamera: any = {
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.ALLMEDIA,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
  }

  openCameraOne() {
    this.presentActionSheet();
    this.square = 1;
  }

  openCameraTwo() {
    this.presentActionSheet();
    this.square = 2;
  }

  openCameraThree() {
    this.presentActionSheet();
    this.square = 3;
  }

  openCameraFour() {
    this.presentActionSheet();
    this.square = 4;
  }

  openCameraFive() {
    this.presentActionSheet();
    this.square = 5;
  }

  openCameraSix() {
    this.presentActionSheet();
    this.square = 6;
  }

  openCameraSeven() {
    this.presentActionSheet();
    this.square = 7;
  }

  openCameraEight() {
    this.presentActionSheet();
    this.square = 8;
  }

  openCameraNine() {
    this.presentActionSheet();
    this.square = 9;
  }

  showSquare() {
    let itemArray = this.components.toArray();
    let itemArrayTwo = this.profComponents.toArray();
    this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            let itemArrayTwo = this.profComponents.toArray();
            this.cameraService.getMedia(this.optionsGetCamera, this.square).then(() => {
              
                let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.jpg');
                //setTimeout(() => {
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                    this.showSquare();
                  });
                //}, 5000);
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
          }
        },{
          text: 'Photo Library',
          handler: () => {
            let itemArrayTwo = this.profComponents.toArray();

            this.cameraService.getMedia(this.optionsGetMedia, this.square).then(() => {
              //setTimeout(() => {
                let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.jpg');
                storageRef.getDownloadURL().then(url => {
                  console.log(url);
                  this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                  this.showSquare();
                });
              //}, 5000);
              
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

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

  backToFeed() {
    if(this.navParams.get('param1') == 'user') {
      this.navCtrl.push(FeedUser);
    }
    else {
      this.navCtrl.push(FeedStylist);
    }
  }

  ionViewDidLoad() {
    
    
    /*let storageRef = this.firebase.storage().ref().child(this.username + 'profile/image.png');
    storageRef.getDownloadURL().then(url =>
        console.log(url)
    );*/
  }

  moveCover() {
    this.moveState = (this.moveState == 'up') ? 'down' : 'up';
  }

  onCurrentDateChanged($event) {}

  reloadSource(startTime, endTime) {}

  onEventSelected($event) {}

  onViewTitleChanged($event) {}

  onTimeSelected($event) {}
}
