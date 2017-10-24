import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { FeedStylist } from '../feedstylist/feedstylist';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';





/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html'
})
export class PostpagePage implements OnDestroy {
	@ViewChild('imagey') image:ElementRef;
  @ViewChild('sharer') share;
 	imageHolder;
  item = {'date': null, 'title':'asdfasdf', 'price':'44', 'caption':'asdfasdfasdfasdf', 'typeofselect':'Promo'};
  selectVal;
  username;
  list: FirebaseListObservable<any>
  private subscription: ISubscription;
  private subscription2: ISubscription;

  constructor(public cameraServicePost: CameraServicePost, public actionSheetCtrl: ActionSheetController, public camera: Camera, public af: AngularFireDatabase, public viewCtrl: ViewController, public storage: Storage, public keyboard: Keyboard, private datePicker: DatePicker, public myrenderer: Renderer, public navCtrl: NavController, public navParams: NavParams) {

  }

  public optionsGetMedia: any = {
        allowEdit: false,
        quality: 2,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI
  }

  public optionsGetCamera: any = {
        quality: 2,
        targetWidth: 600,
        targetHeight: 600,
        encodingType: this.camera.EncodingType.PNG,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            //let itemArrayTwo = this.profComponents.toArray();
            this.cameraServicePost.getMedia(this.optionsGetCamera).then((data) => {
                /*let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                let loading = this.loadingController.create({content : "Loading..."});
                loading.present();
                setTimeout(() => {
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                    this.showSquare();
                    loading.dismiss();
                  });
                }, 3000);*/
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
          }
        },{
          text: 'Photo Library',
          handler: () => {
            //let itemArrayTwo = this.profComponents.toArray();

            this.cameraServicePost.getMedia(this.optionsGetMedia).then((data) => {
              this.image.nativeElement.src = data;
                  /*return new Promise((resolve, reject) => {
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
                  });*/
                //
                 
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ionViewDidLoad() {
    
    this.imageHolder = this.navParams.get("path");
    this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);

    
    this.subscription = this.keyboard.onKeyboardShow().subscribe(()=>{
      this.myrenderer.setElementStyle(this.share.getNativeElement(), 'bottom', '-150px');
    })
    this.subscription2 = this.keyboard.onKeyboardHide().subscribe(()=>{
      console.log("keyboard being hid **&^&^&^&^&^&");
      console.log(this.share.getNativeElement() + " * f8d fd8 f8df8 fd8 f8d 8f fd8 8 fd");
      this.myrenderer.setElementStyle(this.share.getNativeElement(), 'bottom', '0');
    })
    
    this.storage.get('username').then((val) => {this.username = val; console.log(val + "        getting username")});
  }

  goToFeed() {
    this.navCtrl.pop();
  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => { console.log(date + " this is the date &&&&&&&"); this.item.date = date},
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  isPromo() {
    let image       : string  = 'promo_' + this.username + '_' + new Date() + '.png',
      storageRef  : any,
      parseUpload : any;

    return new Promise((resolve, reject) => {
      
      storageRef       = firebase.storage().ref('/promos/' + image);
      parseUpload      = storageRef.putString(this.imageHolder, 'data_url');

      

      parseUpload.on('state_changed', (_snapshot) => {
          // We could log the progress here IF necessary
          console.log('snapshot progess ' + _snapshot);
        },
        (_err) => {
           reject(_err);
           console.log(_err.messsage);
        },
        (success) => {
           resolve(parseUpload.snapshot); 
        })
      }).then(value => {

        storageRef.getDownloadURL()
          .then(url => {
            let metadata = {
              customMetadata: {
                'title': this.item.title,
                'caption': this.item.caption,
                'price': this.item.price,
                'date': this.item.date,
                'typeofselect': this.item.typeofselect,
                'username': this.username,
                'url': url,
                'postdate': Date.now()
              }
            }
            this.list = this.af.list('/promos');

            this.list.push(metadata)
          })
        
      }).catch(function(error) {
        console.log(error.message);
      });
  }

  isClass() {
    if(!this.item.date) {
      alert("Please select a date for your class");
    }
    else {
      let image       : string  = 'class_' + this.username + '_' + new Date() + '.png',
        storageRef  : any,
        parseUpload : any;

      return new Promise((resolve, reject) => {
        
        storageRef       = firebase.storage().ref('/classes/' + image);
        parseUpload      = storageRef.putString(this.imageHolder, 'data_url');

        

        parseUpload.on('state_changed', (_snapshot) => {
            // We could log the progress here IF necessary
            console.log('snapshot progess ' + _snapshot);
          },
          (_err) => {
             reject(_err);
             console.log(_err.messsage);
          },
          (success) => {
             resolve(parseUpload.snapshot); 
          })
        }).then(value => {

          storageRef.getDownloadURL()
            .then(url => {
              let metadata = {
                customMetadata: {
                  'title': this.item.title,
                  'caption': this.item.caption,
                  'price': this.item.price,
                  'date': this.formatDate(this.item.date),
                  'typeofselect': this.item.typeofselect,
                  'username': this.username,
                  'url': url,
                  'postdate': Date.now()
                }
              }
              this.list = this.af.list('/classes');
              this.list.push(metadata);

              
            })
          
        }).catch(function(error) {
          console.log(error.message);
        });
      }
  }

  isProduct() {
    let image       : string  = 'product_' + this.username + '_' + new Date() + '.png',
      storageRef  : any,
      parseUpload : any;

    return new Promise((resolve, reject) => {
      
      storageRef       = firebase.storage().ref('/products/' + image);
      parseUpload      = storageRef.putString(this.imageHolder, 'data_url');

      

      parseUpload.on('state_changed', (_snapshot) => {
          // We could log the progress here IF necessary
          console.log('snapshot progess ' + _snapshot);
        },
        (_err) => {
           reject(_err);
           console.log(_err.messsage);
        },
        (success) => {
           resolve(parseUpload.snapshot); 
        })
      }).then(value => {

        storageRef.getDownloadURL()
          .then(url => {
            let metadata = {
              customMetadata: {
                'title': this.item.title,
                'caption': this.item.caption,
                'price': this.item.price,
                'date': this.item.date,
                'typeofselect': this.item.typeofselect,
                'username': this.username,
                'url': url,
                'postdate': Date.now()
              }
            }
            this.list = this.af.list('/products');
            this.list.push(metadata);

            
          })
        
      }).catch(function(error) {
        console.log(error.message);
      });
  }

  shareItem() {
    console.log(this.item.title);
    console.log(this.item.caption);
    console.log(this.item.price);
    console.log(this.item.date);
    console.log(this.imageHolder + "                    **************************** src ****************");
    console.log("****&*&&*&*&*&*&*          " + this.item.typeofselect);

    if(this.item.title == '' || this.item.caption == '' || this.item.price == '' || this.imageHolder == null) {
      alert("You need to fill in all of the information");
    }

    if(this.item.typeofselect == 'Promo') {
      this.isPromo();
      this.navCtrl.push(FeedStylist);
    }

    if(this.item.typeofselect == 'Class') {
      this.isClass();
      this.navCtrl.push(FeedStylist);
    }

    if(this.item.typeofselect == 'Product') {
      this.isProduct();
      this.navCtrl.push(FeedStylist);
    }

    

    /*var dataURL = data;

    let image       : string  = 'profile_' + this.username + '_' + square + '.png',
      storageRef  : any,
      parseUpload : any;

    return new Promise((resolve, reject) => {
      storageRef       = firebase.storage().ref('/profile/' + this.username + '/' + image);
      parseUpload      = storageRef.putString(dataURL, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
          // We could log the progress here IF necessary
          console.log('snapshot progess ' + _snapshot);
        },
        (_err) => {
           reject(_err);
           console.log(_err.messsage);
        },
        (success) => {
           resolve(parseUpload.snapshot); 
        })
      }).then(value => {
        //this.af.list('/profile/' + self.username).push({ pic: image });
      }).catch(function(error) {
        console.log(error.message);
      });*/
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

}
