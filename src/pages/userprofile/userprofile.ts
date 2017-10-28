import { OnDestroy, Component, trigger, state, style, transition, animate, ViewChildren, ViewChild, ElementRef, Renderer, QueryList } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedUser } from '../feeduser/feeduser';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';
import { UserBooking } from '../userbooking/userbooking';



import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ISubscription } from "rxjs/Subscription";
import { Rate } from '../../modals/rate/rate';

import { Storage } from '@ionic/storage';
import { InAppBrowser } from 'ionic-native';



//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'userprofile.html',
  animations: [
    trigger('moveCover', [
      state('down', style({
        //top: '-109px',
      })),
      state('up', style({
        //top: '-188px',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
  ]
})
export class UserProfile implements OnDestroy {
  @ViewChildren('pluscontain') components:QueryList<any>;
  @ViewChildren('profsquare') profComponents:QueryList<any>;
  @ViewChild('followsty') followsty;
  @ViewChild('instagram') instagram: ElementRef;
  @ViewChild('facebook') facebook: ElementRef;
  viewDate = new Date();
  events = [];
  viewTitle: string;
  calendar = {'mode': 'month', 'currentDate': this.viewDate}
  moveState: String = 'up';
  items: FirebaseListObservable<any>;
  profiless: FirebaseListObservable<any>;
  username;
  picURLS = [];
  square = 0;
  picURL = "";
  bio = "";
  tds;
  profdata;
  selectedDate;
  item: FirebaseObjectObservable<any>;
  item2: FirebaseObjectObservable<any>;
  item5: FirebaseObjectObservable<any>;
  item6: FirebaseObjectObservable<any>;
  item9: FirebaseObjectObservable<any>;
  items4: FirebaseListObservable<any>;
  items3: FirebaseListObservable<any>;
  items2: FirebaseListObservable<any>;
  subscription2: ISubscription;
  subscription3: ISubscription;
  subscription4: ISubscription;
  subscription: ISubscription;
  subscription7: ISubscription;
  subscription6: ISubscription;
  subscription9: ISubscription;
  datesToSelect = [];
  times;
  timesOpen = [];
  set = false;
  uuid;
  userusername;
  profilePic;
  totalRatings;
  titleYear;
  stars;


  _imageViewerCtrl: ImageViewerController;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  loadings;

  

  constructor(public afAuth: AngularFireAuth, public elRef: ElementRef, public params: NavParams,public modalCtrl: ModalController, public storage: Storage, public imageViewerCtrl: ImageViewerController, public loadingController: LoadingController, public myrenderer: Renderer, public af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public camera: Camera, public navCtrl: NavController, private navParams: NavParams, public cameraService: CameraService) {
    this.times = [{'time':'8:00 AM', 'selected': false}, {'time':'12:00 PM', 'selected': false}, {'time':'4:00 PM', 'selected': false},
                  {'time':'8:30 AM', 'selected': false}, {'time':'12:30 PM', 'selected': false}, {'time':'4:30 PM', 'selected': false},
                  {'time':'9:00 AM', 'selected': false}, {'time':'1:00 PM', 'selected': false}, {'time':'5:00 PM', 'selected': false},
                  {'time':'9:30 AM', 'selected': false}, {'time':'1:30 PM', 'selected': false}, {'time':'5:30 PM', 'selected': false},
                  {'time':'10:00 AM', 'selected': false}, {'time':'2:00 PM', 'selected': false}, {'time':'6:00 PM', 'selected': false},
                  {'time':'10:30 AM', 'selected': false}, {'time':'2:30 PM', 'selected': false}, {'time':'6:30 PM', 'selected': false},
                  {'time':'11:00 AM', 'selected': false}, {'time':'3:00 PM', 'selected': false}, {'time':'7:00 PM', 'selected': false},
                  {'time':'11:30 AM', 'selected': false}, {'time':'3:30 PM', 'selected': false}, {'time': '7:30 PM', 'selected': false}
                ];
  }

  ngOnDestroy() {
    if(this.subscription2 != null) {
      this.subscription2.unsubscribe();
    }
    if(this.subscription3 != null) {
      this.subscription3.unsubscribe();
    }
    if(this.subscription4 != null) {
      this.subscription4.unsubscribe();
    }
    if(this.subscription != null) {
      this.subscription.unsubscribe();
    }
    if(this.subscription6 != null) {
      this.subscription6.unsubscribe();
    }
    if(this.subscription7 != null) {
      this.subscription7.unsubscribe();
    }
    if(this.subscription9 != null) {
      this.subscription9.unsubscribe();
    }
  }

  instagramOpen() {
    let url;
    this.item5 = this.af.object('/profiles/stylists/' + this.username + '/instagramURL');
    this.item5.subscribe(item => {
      if(item["$value"] == null) {
        //
      }
      else {
        let browser = new InAppBrowser(item['$value'], "_system");
      }
    }).unsubscribe();
    
  }

  facebookOpen() {
    this.item6 = this.af.object('/profiles/stylists/' + this.username + '/facebookURL');
    this.item6.subscribe(item => {
      if(item["$value"] == null) {
        //
      }
      else {
        let browser = new InAppBrowser(item['$value'], "_system");
      }
    }).unsubscribe();
  }


  followStylist() {
      this.item = this.af.object('/profiles/stylists/' + this.username + '/followers');
      this.subscription = this.item.subscribe(item => {
        if(item.$value == null) {
          let array = [];
          array.push({[this.userusername]:this.uuid});
          this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
          this.item.update(array);
        }
        else {
          if(item.indexOf(this.userusername) == -1) {
            item.push({[this.userusername]:this.uuid})
            this.item.update(item);
          }
          else {
            this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
          }
        }
      })
  }

  ionViewDidLoad() {
    this.username = this.params.get('username');

    this.subscription7 = this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid) {
        console.log("logged in");
        this.uuid = data.uid;
      }
    })

    this.storage.get('username').then((val) => {
      this.userusername = val;
    })
    console.log(this.username + "         this is item @@#2332dfdffdfd23");
    this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
    this.item2.subscribe(item => {

      let bool = false;
      if(Object.keys(item)[0] == '$value') {
        bool = true;
      }

        if(!bool) {
          console.log(typeof item + " type of type of type of");
          const index = item.findIndex(item => item[this.userusername] === this.uuid);
          console.log(index + "         this.userusername   8888888*&&&*&*&*&*");
          if(index !== -1) {
            this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
          }
        }
      
      
    }).unsubscribe();

    let storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');               

    storageRef.getDownloadURL().then(url => {
      console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
      this.profilePic = url;
    }).catch((e) => {
      console.log("in caught url !!!!!!!$$$$$$$!!");
      this.profilePic = 'assets/blankprof.png';
    });

    this.item9 = this.af.object('/profiles/stylists/' + this.username);
    this.subscription9 = this.item9.subscribe(item => {
      console.log(JSON.stringify(item) + "      rating number 989898222229889");
      let total = 0;
      for(let u in item.rating) {
        total += item.rating[u];
      }
      //this.facebook.nativeElement.src = item.facebookURL;
      //this.instagram.nativeElement.src = item.instagramURL;
      this.totalRatings = total;
      
      let totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
      let ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five *5;
      
      console.log(ratings + "   ratings          total potential:    " + totalPotential);

      if(ratings == 0 && totalPotential == 0) {
        this.stars = '\u2606\u2606\u2606\u2606\u2606';
      }

      let i = (ratings / totalPotential) * 100;
      if(Math.round(i) <= 20) {
        this.stars = '\u2605\u2606\u2606\u2606\u2606';
      }
      if(Math.round(i) > 20 && Math.round(i) <= 40) {
        this.stars = '\u2605\u2605\u2606\u2606\u2606';
      }
      if(Math.round(i) > 40 && Math.round(i) <= 60) {
        this.stars = '\u2605\u2605\u2605\u2606\u2606';
      }
      if(Math.round(i) > 60 && Math.round(i) <= 80) {
        this.stars = '\u2605\u2605\u2605\u2605\u2606';
      }
      if(Math.round(i) > 80) {
        this.stars = '\u2605\u2605\u2605\u2605\u2605';
      }
    });

    this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
  
    this.username = this.navParams.get('username');
  
    console.log(this.viewDate + " view date ");
    setTimeout(()=>{
      this.timesOpen = [];
      this.selectedDate = this.viewDate;
      console.log(this.username + "this.username");
      let bool = false;
      this.items2 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
      this.subscription2 = this.items2.subscribe(items => items.forEach(item => {

        console.log(item);

        let da = new Date(item.date.day * 1000);
        this.datesToSelect.push(da.getDate());


        console.log(da + "da");
        console.log(da.getDate() + "dagetdate");
        console.log(this.selectedDate.getDate());
        if(this.selectedDate.getDate() == da.getDate() && this.selectedDate.getMonth() == da.getMonth()) {
          console.log("selected = item");
          console.log(JSON.stringify(item.reserved) + "         item resesrved above");
          //for(let m = 0; m < item.reserved.length; m++) {
          //for(let r of item.reserved) {
            //console.log(JSON.stringify(r));
            for (let r of item.reserved.appointment) {
              if(r.selected == true) {
                this.timesOpen.push(r);
                console.log('hit appointment');
                bool = true;
              }
            }

        }

        for(let item of this.tds) {
          if(!item.classList.contains('text-muted')) {
            console.log(typeof item.innerText + "         innertext" + typeof this.datesToSelect[0]);
            if(this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
              console.log("Inner text in      " + item.innerText);
              this.myrenderer.setElementClass(item,"greencircle",true);            
            }
            else {
              //this.myrenderer.setElementClass(item,"monthview-selected",false);
            }
          }
        }
        
      }));
        
        
        //loading.dismiss();
      },1500)
  }

  getProfileInfo() {
    this.item = this.af.object('/profiles/stylists/' + this.username);
    this.subscription6 = this.item.subscribe(item => {this.picURL = item.picURL; this.bio = item.bio;});
    
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
              return new Promise((resolve, reject) => {
                let storageRef = firebase.storage().ref().child('/profile/' + this.username + '/profile_' + this.username + '_' + this.square + '.png');
                let loading = this.loadingController.create({content : "Loading..."});
                loading.present();
                setTimeout(() => {
                  storageRef.getDownloadURL().then(url => {
                    console.log(url);
                    this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                    this.showSquare();
                    
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
                      
                      resolve();
                    });
                    loading.dismiss();
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

  presentRateModal() {
    let profileModal = this.modalCtrl.create(Rate, {"user": this.username});
    profileModal.present();
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
      this.navCtrl.push(FeedUser,{},{animate:true,animation:'transition',duration:500,direction:'back'})
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

  swipeLeft() {
    this.backToCal();
  }

  swipeRight() {
    this.backToFeed();
  }

  openCal() {
    this.navCtrl.push(UserBooking, {username: this.username});
  }

  downloadImages():Promise<any> {
    let self = this;
    let promises_array:Array<any> = [];
    let itemArrayTwo = this.profComponents.toArray();

    for (let z = 1; z < 10; z++) {
      promises_array.push(new Promise(function(resolve,reject) {
        let storageRef = firebase.storage().ref().child('/profile/'+ self.username + '/profile_' + self.username + '_' + z + '.png');
        storageRef.getDownloadURL().then(url => {
          self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', url);
          self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
          //self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
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

  ionViewWillEnter() {
    this.loadings = this.loadingController.create({content : "Loading..."});
    this.loadings.present();
    
  }

  

  ionViewDidEnter() {
    this.username = this.navParams.get("username");

    this.downloadImages().then(() => {
      this.getProfileInfo();
      this.loadings.dismiss();
    })
  }

  

 moveCover() {

   if(this.set == false) {
     try {
       this.set = true;
       this.moveState = 'down';
       this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
       console.log(this.tds + "   >>>>>>> >>>>>>");
       this.myrenderer.setElementClass(this.tds, 'moveCover', true);
       let thisel  = this.elRef.nativeElement.querySelector('body > ion-app > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');

       this.myrenderer.setElementClass(thisel, 'marginchange', true);

       console.log('element class list   ' + thisel.classList);
       
       
     }
     catch(e) {
       console.log(e.message);
     }
   }
   else {
     this.navCtrl.push(UserBooking, {username: this.username});
   }   
 }

  onCurrentDateChanged($event) {
    //console.log(typeof $event);
      for(let x of this.times) {
        x.selected = false;
      }

      console.log(typeof $event + "event event event *******");

      this.selectedDate = new Date($event);
      console.log(this.selectedDate + " thi si the selected date ((())))))");

      this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
      //console.log($event);

      this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
      this.subscription4 = this.items4.subscribe(items => items.forEach(item => {
        //console.log(JSON.stringify(item));
        //console.log(item.date.day);
        console.log("dafirst    " + item.date.day )
        let da = new Date(item.date.day * 1000);
        this.datesToSelect = [];
        this.datesToSelect.push(da.getDate());

        console.log(da + "da");
        console.log(da.getDate() + "dagetdate");
        console.log(this.selectedDate.getDate());
        if(this.selectedDate.getDate() == da.getDate() && this.selectedDate.getMonth() == da.getMonth()) {
          console.log("selected = item");
          console.log(JSON.stringify(item.reserved) + "         item resesrved");
          //for(let r of item.reserved.appointment) {
            //console.log(JSON.stringify(r));
            this.times = item.reserved.appointment.slice(0);
            console.log('hit appointment');
            console.log(JSON.stringify(this.times));
            
            /*for(let x of this.times) {
              if(x.time == r) {
                console.log('change selected');
                x.selected = true;
              }
            }*/
          //}
        }
      }));
  }

  reloadSource(startTime, endTime) {
    console.log(startTime + " : starttime           endtime: " + endTime);
  }

  onEventSelected($event) {}

  onViewTitleChanged(title) {
    let array = title.split(" ");
    //array[1];
    this.viewTitle = array[0].substring(0, 3);
    this.titleYear = array[1];
  }

  onTimeSelected($event) {
    console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
    this.selectedDate = new Date($event.selectedTime);
    console.log(this.selectedDate + " thi si the selected date ((())))))");

    this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
    if($event.dontRunCode) {
    //console.log($event);
      this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
      this.subscription3 = this.items3.subscribe(items => items.forEach(item => {
        //console.log(JSON.stringify(item));
        //console.log(item.date.day);
        console.log("dafirst    " + item.date.day )
        let da = new Date(item.date.day * 1000);
        this.datesToSelect = [];
        this.datesToSelect.push(da.getDate());

        console.log(da + "da");
        console.log(da.getDate() + "dagetdate");
        console.log(this.selectedDate.getDate());
        if(this.selectedDate.getDate() == da.getDate() && this.selectedDate.getMonth() == da.getMonth()) {
          console.log("selected = item");
          console.log(JSON.stringify(item.reserved) + "         item resesrved");
          //for(let r of item.reserved.appointment) {
            //console.log(JSON.stringify(r));
            /*let bool = lse;
            for(let r in item.reserved.appointment) {
              if(r['selected'] == "true") {
                bool = true;
              }
            }*/
            this.times = item.reserved.appointment.slice(0);
            console.log('hit appointment');
            console.log(JSON.stringify(this.times));
            
            /*for(let x of this.times) {
              if(x.time == r) {
                console.log('change selected');
                x.selected = true;
              }
            }*/
          //}
        }
        //console.log($event.runCode + "     dont run code!!!!!!");
        //if($event.runCode == true) {
          for(let item of this.tds) {
            if(!item.classList.contains('text-muted')) {
              console.log(typeof item.innerText + "         innertext" + typeof this.datesToSelect[0]);
              if(this.datesToSelect.indexOf(parseInt(item.innerText)) != -1) {
                console.log("Inner text in      " + item.innerText);
                this.myrenderer.setElementClass(item,"greencircle",true);
              }
              else {
                //this.myrenderer.setElementClass(item,"monthview-selected",false);
              }
            }
          }
        //}

        
      }));
    }
  }
}
