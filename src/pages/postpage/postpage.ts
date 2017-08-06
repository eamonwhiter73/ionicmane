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




/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class PostpagePage implements OnDestroy {
	@ViewChild('imagey') image:ElementRef;
  @ViewChild('sharer') share;
 	imageHolder;
  item = {'date': new Date(), 'title':'asdfasdf', 'price':'44', 'caption':'asdfasdfasdfasdf', 'typeofselect':'Promo'};
  selectVal;
  username;
  list: FirebaseListObservable<any>
  private subscription: ISubscription;
  private subscription2: ISubscription;

  constructor(public af: AngularFireDatabase, public viewCtrl: ViewController, public storage: Storage, public keyboard: Keyboard, private datePicker: DatePicker, public myrenderer: Renderer, public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ionViewDidLoad() {
    
    this.imageHolder = this.navParams.get("path");
    this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);
    for (let r in this.share) {
      console.log(r);
    }
    
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
    this.navCtrl.push(FeedStylist,{
      param1: 'user'
    },{animate:true,animation:'transition',duration:500,direction:'back'});
  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.item.date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
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
                'url': url
              }
            }
            this.list = this.af.list('/promos');
            this.list.subscribe(items => {
                            
            })

            this.list.push(metadata)
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

    if(this.item.title == '' || this.item.caption == '' || this.item.price == '' || this.item.date == null || this.imageHolder == null) {
      alert("You need to fill in all of the information");
    }

    if(this.item.typeofselect == 'Promo') {
      this.isPromo();
    }

    this.navCtrl.push(FeedStylist);

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
