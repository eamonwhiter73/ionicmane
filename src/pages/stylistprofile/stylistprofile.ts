import { Component, NgModule, trigger, state, style, transition, animate, keyframes, ViewChildren, Renderer, QueryList } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';


import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

import { Storage } from '@ionic/storage';



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
        top: '-182px',
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
  viewTitle: string;
  calendar = {'mode': 'month', 'currentDate': this.viewDate}
  moveState: String = 'up';
  items: FirebaseListObservable<any>;
  username = "jackson";
  picURLS = [];
  square = 0;
  _imageViewerCtrl: ImageViewerController;
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor(public storage: Storage, public imageViewerCtrl: ImageViewerController, public loadingController: LoadingController,/*public firebase: FirebaseApp, */public myrenderer: Renderer, af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public camera: Camera, public navCtrl: NavController, private navParams: NavParams, public cameraService: CameraService) {
    /*this.items = af.list('/profile/' + this.username);
    this.items.subscribe(items => items.forEach(item => {
      console.log(item.$value);
      this.picURLS.push(item.$value);
    }));*/
    //this._imageViewerCtrl = imageViewerCtrl;
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

  openCamera(squarez) {
    this.presentActionSheet();
    this.square = squarez;
  }

  presentImage(squarez) {
    this.square = squarez;
    let itemArrayTwo = this.profComponents.toArray();
    console.log(JSON.stringify(itemArrayTwo[this.square-1]));
    const imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
    imageViewer.present();
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
              
                let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                let loading = this.loadingController.create({content : "Loading..."});
                loading.present();
                setTimeout(() => {
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                    this.showSquare();
                    loading.dismiss();
                  });
                }, 3000);
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
          }
        },{
          text: 'Photo Library',
          handler: () => {
            let itemArrayTwo = this.profComponents.toArray();

            this.cameraService.getMedia(this.optionsGetMedia, this.square).then(() => {
                return new Promise((resolve, reject) => {
                  let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                  let loading = this.loadingController.create({content : "Loading..."});
                  loading.present();
                  setTimeout(() => {
                    storageRef.getDownloadURL().then(url => {
                      console.log(url);
                      this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                      this.showSquare();
                      loading.dismiss();
                      resolve();
                    });
                  }, 3000);
                });
              //
              
            }).catch(e => {
              console.log(e + "       eeeee");
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

  tappedPost() {
    this.navCtrl.push(PostpagePage);
  }

  tappedEmergency() {
    this.navCtrl.push(BookingPage);
  }

  backToFeed() {
    /*if(this.navParams.get('param1') == 'user') {
      this.navCtrl.push(FeedUser);
    }*/
    //else {
      this.navCtrl.push(FeedStylist,{},{animate:true,animation:'transition',duration:500,direction:'back'})
      //this.navCtrl.push(FeedStylist);
    //}
  }

  backToCal() {
    //if(this.navParams.get('param1') == 'user') {
      this.navCtrl.push(BookingPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'})
      //this.navCtrl.push(BookingPage);
    //}
    //else {
      //this.navCtrl.push(FeedStylist);
    //}
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //Short enough
        && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
        && Math.abs(direction[0]) > 30) {  //Long enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          console.log(swipe);

          if(swipe == 'next') {
            this.backToCal();
          }
          else {
            this.backToFeed();
          }
      //Do whatever you want with swipe
      }
    }
  }

  downloadImages():Promise<any> {
    let self = this;
    let promises_array:Array<any> = [];
    let itemArrayTwo = this.profComponents.toArray();
    let itemArray = this.components.toArray();

    for (let z = 1; z < 10; z++) {
      promises_array.push(new Promise(function(resolve,reject) {
        let storageRef = firebase.storage().ref().child('/profile/'+ self.username + '/profile_' + self.username + '_' + z + '.png');
        storageRef.getDownloadURL().then(url => {
          self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', url);
          self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
          self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
          console.log(z);
          resolve();
        }).catch(error => {
          resolve();
          console.log(error.message);
        });
      }));
    }

    return Promise.all(promises_array);
  }

  ionViewDidEnter() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();
    this.downloadImages().then(() => {
      loading.dismiss();
    })

    this.storage.get('username').then((val) => {
      this.username = val;
      console.log(val);
    });
  }

  moveCover() {
    this.moveState = (this.moveState == 'up') ? 'down' : 'up';
  }

  onCurrentDateChanged($event) {}

  reloadSource(startTime, endTime) {}

  onEventSelected($event) {}

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected($event) {}
}
