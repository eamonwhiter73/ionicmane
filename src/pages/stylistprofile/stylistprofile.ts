import { Component, trigger, state, style, transition, animate, ViewChildren, OnDestroy, Renderer, Renderer2, ElementRef, QueryList } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedStylist } from '../feedstylist/feedstylist';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';
import { FormulapostPage } from '../formulapost/formulapost';

import { SettingsPage } from '../settings/settings';
import { ISubscription } from "rxjs/Subscription";



import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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
        //height: '100%',
      })),
      state('up', style({
        //height: '75px',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
  ]
})
export class StylistProfile implements OnDestroy {
  @ViewChildren('pluscontain') components:QueryList<any>;
  @ViewChildren('profsquare') profComponents:QueryList<any>;
  @ViewChildren('xclass') xclass:QueryList<any>;
  @ViewChildren('formulabar') formulaBars:QueryList<any>;
  viewDate = new Date();
  events = [];
  viewTitle: string;
  calendar = {'mode': 'month', 'currentDate': this.viewDate}
  moveState: String = 'up';
  item2: FirebaseObjectObservable<any>;
  item9: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  items4: FirebaseListObservable<any>;
  items3: FirebaseListObservable<any>;
  items2: FirebaseListObservable<any>;
  subscription2: ISubscription;
  subscription3: ISubscription;
  subscription4: ISubscription;
  subscription5: ISubscription;
  subscription9: ISubscription;
  username;
  picURLS = [];
  square = 0;
  _imageViewerCtrl: ImageViewerController;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  loadings;
  tds;
  selectedDate;
  titleYear;
  times;
  datesToSelect = [];
  followers;
  totalRatings;
  profilePic;
  stars;
  bio;
  square2;


  constructor(public myrenderer2: Renderer2, public navParams: NavParams, public elRef: ElementRef, public storage: Storage, public imageViewerCtrl: ImageViewerController, public loadingController: LoadingController,/*public firebase: FirebaseApp, */public myrenderer: Renderer, public af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public camera: Camera, public navCtrl: NavController, public cameraService: CameraService) {
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

  ionViewDidEnter() {
    //let loading = this.loadingController.create({content : "Loading..."});
    //loading.present();
  }

  getFollowers() {
    
  }

  downloadImages() {
    let self = this;
    let promises_array:Array<any> = [];
    let itemArrayTwo = this.profComponents.toArray();
    let itemArray = this.components.toArray();
    let itemArraythree = this.xclass.toArray();
    let itemArrayfour = this.formulaBars.toArray();

    for (let z = 1; z < 10; z++) {
      //promises_array.push(new Promise(function(resolve,reject) {
        //let storageRef = firebase.storage().ref().child('/profile/'+ self.username + '/profile_' + self.username + '_' + z + '.png');
        //storageRef.getDownloadURL().then(url => {
          self.storage.get("profile"+z).then((val) =>{
            if(val!=null) {
              self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
              self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
              self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
              self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');

              console.log(z);
              
            }
            //resolve();
          })

          self.storage.get("formula"+z).then((val) =>{
            if(val!=null) {
              self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
              self.myrenderer2.addClass(itemArrayTwo[z - 1].nativeElement, 'formula');
              self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
              self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
              self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
              self.myrenderer.setElementStyle(itemArrayfour[z - 1].nativeElement, 'display', 'flex');
              console.log(z);
              
            }
            //resolve();
          })           
        /*}).catch(error => {
          console.log(error.message);
          resolve();*/
          
      //}));
    }

    //return Promise.all(promises_array);
  }

  ionViewDidLoad() {
    this.square2 = this.navParams.get("square");

    if(this.square2 != null) {
      this.removePicFormula(this.square2);
    }

    this.storage.get('bio').then((val)=> {
      this.bio = val;
    })
    
    this.storage.get('username').then((val) => {
      this.username = val;
      console.log(val);

      this.downloadImages();

      this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
      this.subscription5 = this.item2.subscribe(item => {
        console.log(JSON.stringify(item) + "      followers number 98989899889");
        if(Object.keys(item)[0] == '$value') {
          this.followers = 0;
        }
        else {
          this.followers = item.length;
        }
      });

      this.item9 = this.af.object('/profiles/stylists/' + this.username);
      this.subscription9 = this.item9.subscribe(item => {
        console.log(JSON.stringify(item) + "      rating number 989898222229889");
        let total = 0;
        for(let u in item.rating) {
          total += item.rating[u];
        }
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

    });

    this.storage.get('picURL').then((val) => {
      this.profilePic = val;

      if(this.profilePic == null) {
        this.profilePic = 'assets/blankprof.png';
      }
    });    

    //this.isSomething = true;

    this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
  
    console.log(this.viewDate + " view date ");
      setTimeout(()=>{
        this.selectedDate = this.viewDate;
        console.log(this.username + "this.username");
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

              this.times = item.reserved.appointment.slice(0);
              console.log('hit appointment');

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

  ngOnDestroy() {
    this.subscription2.unsubscribe();
    if(this.subscription3 != null) {
      this.subscription3.unsubscribe();
    }
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
    this.subscription9.unsubscribe();
  }

  openCamera(squarez) {
    this.presentActionSheet2();
    this.square = squarez;
  }

  removePic(squarez) {
    console.log("in remove pic 333333333          " + squarez);

    let itemArray = this.components.toArray();
    let itemArrayTwo = this.profComponents.toArray();
    let itemArraythree = this.xclass.toArray();
    let itemArrayfour = this.formulaBars.toArray();

    
    console.log(JSON.stringify(itemArray) + " item array");
    this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(itemArrayfour[squarez - 1].nativeElement, 'display', 'none');

    this.storage.set("profile"+squarez, null);
    this.storage.set("formula"+squarez, null);
  }

  removePicFormula(squarez) {
    console.log("in remove pic 333333333          " + squarez);

    let itemArray = this.components.toArray();
    let itemArrayTwo = this.profComponents.toArray();
    let itemArraythree = this.xclass.toArray();

    console.log(JSON.stringify(itemArray) + " item array");
    this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');

    this.storage.set("formula"+squarez, null);
  }
    



  presentImage(squarez) {
    this.square = squarez;
    let itemArrayTwo = this.profComponents.toArray();
    console.log(JSON.stringify(itemArrayTwo[this.square-1]));
    if(itemArrayTwo[this.square-1].nativeElement.classList.contains('formula')) {
      //
    }
    else {
      const imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
      imageViewer.present();
    }
  }

  showSquare() {
    let itemArray = this.components.toArray();
    let itemArrayTwo = this.profComponents.toArray();
    let itemArraythree = this.xclass.toArray();
    this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(itemArraythree[this.square - 1].nativeElement, 'display', 'block');
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
                    this.storage.set("profile"+this.square, url);
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
                      this.storage.set("profile"+this.square, url);
                      this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                      this.showSquare();
                      
                      resolve();
                    });
                    loading.dismiss();
                  }, 3500);
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

  presentActionSheet2() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose type',
      buttons: [
        {
          text: 'Formula',
          handler: () => {
            this.presentActionSheet3();
          }
        },{
          text: 'Picture',
          handler: () => {
            this.presentActionSheet();
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

  ////////////********************************************** SAVING FORMULAS TO SERVER

  presentActionSheet3() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            let itemArrayTwo = this.profComponents.toArray();
            let itemArrayFour = this.formulaBars.toArray();
            
            this.cameraService.getMediaFormulas(this.optionsGetMedia, this.square).then((url) => {
                console.log(url + " url url url url")
                actionSheet.dismiss();
                this.storage.set("formula"+this.square, url);
                this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                this.myrenderer.setElementStyle(itemArrayFour[this.square - 1].nativeElement, 'display', 'flex');
                this.myrenderer2.addClass(itemArrayTwo[this.square - 1].nativeElement, 'formula');
                this.showSquare();
                this.navCtrl.push(FormulapostPage, { path: url, square: this.square });
              
            }); 
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('camera clicked');
            //actionSheet.dismiss();
          }
        },{
          text: 'Photo Library',
          handler: () => {
            let itemArrayTwo = this.profComponents.toArray();
            let itemArrayFour = this.formulaBars.toArray();

            this.cameraService.getMediaFormulas(this.optionsGetMedia, this.square).then((url) => {
                console.log(url + " url url url url")
                actionSheet.dismiss();
                this.storage.set("formula"+this.square, url);
                this.myrenderer.setElementAttribute(itemArrayTwo[this.square - 1].nativeElement, 'src', url);
                this.myrenderer.setElementStyle(itemArrayFour[this.square - 1].nativeElement, 'display', 'flex');
                this.myrenderer2.addClass(itemArrayTwo[this.square - 1].nativeElement, 'formula');
                this.showSquare();
                this.navCtrl.push(FormulapostPage, { path: url, square: this.square });
              
            }); //pass in square choice
            //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
            console.log('photo clicked');
            //actionSheet.dismiss();
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

  goToSettings() {
    this.navCtrl.push(SettingsPage);
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

  swipeLeft() {
    this.backToCal();
  }

  openCal() {
    this.backToCal();
  }

  swipeRight() {
    this.backToFeed();
  }

  

  //changed this***

  moveCover() {
    this.moveState = (this.moveState == 'up') ? 'down' : 'up';
    this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
    this.myrenderer.setElementClass(this.tds, 'moveCover', true);
    let thisel  = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');

    this.myrenderer.setElementClass(thisel, 'marginchange', true);

    console.log('element class list   ' + thisel.classList);
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
