import { Component, trigger, state, style, transition, animate, ViewChild, ViewChildren, QueryList, Renderer, ElementRef } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { PostpagePage } from '../postpage/postpage';
import { FeedUser } from '../feeduser/feeduser';
import { UserProfile } from '../userprofile/userprofile';
import { Storage } from '@ionic/storage';


import { BookingPage } from '../booking/booking';

import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { OnDestroy } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';







@Component({
  selector: 'page-feed-stylist',
  templateUrl: 'feedstylist.html',
  animations: [
 
    trigger('slideDown', [
      state('down', style({
        height: '250px',
      })),
      state('notDown', style({
        height:'88px',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('moveList', [
      state('down', style({
        top: 82 + "px",
      })),
      state('up', style({
        top: 0 + "px",
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('toolSlide', [
      state('down', style({
        top: '0px'
      })),
      state('up', style({
        top: '0px'
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('plusSlide', [
      state('down', style({
        top: '185px'
      })),
      state('notDown', style({
        top: '20px'
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),

  ]
})
export class FeedStylist implements OnDestroy {
  @ViewChildren('feedstyle') components:QueryList<any>;
  @ViewChildren('flex') flexComponents:QueryList<any>;
  @ViewChildren('feedtop') feedComponents:QueryList<any>;
  @ViewChildren('imagepost') imageComponents:QueryList<any>;
  @ViewChildren('caption') captionComponents:QueryList<any>;
  @ViewChildren('allF') allFeed:QueryList<any>;
  @ViewChildren('productsFeed') productsF:QueryList<any>;
  @ViewChildren('classesFeed') classesF:QueryList<any>;
  @ViewChild('contentone') contentOne:ElementRef;
  @ViewChild('classeslist') classeslist:ElementRef;
  @ViewChild('productslist') productslist:ElementRef;
  @ViewChildren('feedtoptwo') feedTopTwoComponents:QueryList<any>;


  @ViewChildren('feedstyle2') components2:QueryList<any>;
  @ViewChildren('flex2') flexComponents2:QueryList<any>;
  @ViewChildren('feedtop2') feedComponents2:QueryList<any>;
  @ViewChildren('feedtop2two') feedTop22Components:QueryList<any>;
  @ViewChildren('imagepost2') imageComponents2:QueryList<any>;
  @ViewChildren('caption2') captionComponents2:QueryList<any>;

  @ViewChildren('feedstyle3') components3:QueryList<any>;
  @ViewChildren('flex3') flexComponents3:QueryList<any>;
  @ViewChildren('feedtop3') feedComponents3:QueryList<any>;
  @ViewChildren('feedtop3two') feedTop32Components:QueryList<any>;
  @ViewChildren('imagepost3') imageComponents3:QueryList<any>;
  @ViewChildren('caption3') captionComponents3:QueryList<any>;



  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  toolbarClicks = 0;

  items = [];
  totalCount = 0;
  lastNumRows = 0;
  el;
  classesListArray = [];
  productListArray = [];

  list: FirebaseListObservable<any>;
  objj: FirebaseObjectObservable<any>;
  subscription4: ISubscription;
  subscription5: ISubscription;
  ads = [];


  

  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private nav:NavController;

  constructor(public storage: Storage, public platform: Platform, public af: AngularFireDatabase, public element: ElementRef, public camera: Camera, private app:App, public cameraServicePost: CameraServicePost, public actionSheetCtrl: ActionSheetController, public myrenderer: Renderer, public loadingController: LoadingController, public navCtrl: NavController) {
    this.nav = this.app.getActiveNav();
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

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

  getAds() {
    this.objj = this.af.object('/adcounter/count');

    this.subscription4 = this.list.subscribe(item => { 

        for(let x = 1; x < item + 1; x++) {
          let storageRef = firebase.storage().ref().child('/ads/ad' + x + '.png');
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            this.ads.push(url);
          });
        }
       
    })

    
  }

  goSeeProfile(item) {
    this.navCtrl.push(UserProfile, {username:item.username});
  }

  tappedPost() {
    this.navCtrl.push(PostpagePage);
  }

  tappedEmergency() {
    this.navCtrl.push(BookingPage);
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
            this.toProfile();
          }
          else {
            this.toBooking();
          }
      //Do whatever you want with swipe
      }
    }
  }

  swipeLeft() {
    this.toProfile();
  }

  swipeRight() {
    this.toBooking();
  }

  switchView() {
    this.navCtrl.push(FeedUser);
  }

  toProfile() {
    this.navCtrl.push(StylistProfile,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  toBooking() {
    this.navCtrl.push(BookingPage,{
      param1: 'user'
    },{animate:true,animation:'transition',duration:500,direction:'back'});
  }

  loadPost() {
    this.presentActionSheet();
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
                this.navCtrl.push(PostpagePage, { path: data });
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
              console.log(data + "dadadaddkdkktatatat");
              if(data) {
                this.navCtrl.push(PostpagePage, { path: data });
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
              }    
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

  all() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');

  }

  products() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'block');

  }

  classes() {
    console.log("classeslist      " + this.classeslist.nativeElement);
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');  
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    
  }

  toolClicked(event) {
    this.toolbarClicks++;
    console.log('tapped');

    
    if(this.toolbarClicks == 1) {
      setTimeout(() => {
        if(this.toolbarClicks == 2) {
          console.log('running application');
          this.downState = (this.downState == 'notDown') ? 'down' : 'notDown';
          this.moveState = (this.moveState == 'up') ? 'down' : 'up';
          this.toolbarState = (this.toolbarState == 'up') ? 'down' : 'up';
          this.toolbarClicks = 0;
        }
        else {
          this.toolbarClicks = 0;
        }
      }, 300)
    }
  }

  ionViewDidLoad() {

    this.listClasses().then(() => {
      this.listProducts().then(() => {
        this.listAll();
      });
    });

    this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
    
    
    this.storage.get('username').then((val) => {
      //this.username = val;
    })
  }

  ionViewWillLeave() {
    //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'none');
  }

  ionViewWillEnter() {
    //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'block');
  }

  contractItem(item) {
    console.log("in contract item 8*****");
    let flexArray = this.flexComponents.toArray();
    let feedArray = this.feedComponents.toArray();
    let feedArray2 = this.feedTopTwoComponents.toArray();
    let itemArray = this.components.toArray();
    let imageComps = this.imageComponents.toArray();
    let captionComps = this.captionComponents.toArray();


    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');
    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  contractItem2(item) {
    let flexArray = this.flexComponents2.toArray();
    let feedArray = this.feedComponents2.toArray();
    let feedArray2 = this.feedTop22Components.toArray();
    let itemArray = this.components2.toArray();
    let imageComps = this.imageComponents2.toArray();
    let captionComps = this.captionComponents2.toArray();


    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');

    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  contractItem3(item) {
    let flexArray = this.flexComponents3.toArray();
    let feedArray = this.feedComponents3.toArray();
    let feedArray2 = this.feedTop32Components.toArray();
    let itemArray = this.components3.toArray();
    let imageComps = this.imageComponents3.toArray();
    let captionComps = this.captionComponents3.toArray();


    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'padding', '4px 4px 0px 4px');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'none');

    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'none');
    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', '');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', '');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  expandItem(item) {
    let flexArray = this.flexComponents.toArray();
    let feedArray = this.feedComponents.toArray();
    let feedArray2 = this.feedTopTwoComponents.toArray();
    let itemArray = this.components.toArray();
    let imageComps = this.imageComponents.toArray();
    let captionComps = this.captionComponents.toArray();


    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');

    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');
    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  expandItem2(item) {
    let flexArray = this.flexComponents2.toArray();
    let feedArray = this.feedComponents2.toArray();
    let feedArray2 = this.feedTop22Components.toArray();
    let itemArray = this.components2.toArray();
    let imageComps = this.imageComponents2.toArray();
    let captionComps = this.captionComponents2.toArray();

    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');

    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');

    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  expandItem3(item) {
    let flexArray = this.flexComponents3.toArray();
    let feedArray = this.feedComponents3.toArray();
    let feedArray2 = this.feedTop32Components.toArray();
    let itemArray = this.components3.toArray();
    let imageComps = this.imageComponents3.toArray();
    let captionComps = this.captionComponents3.toArray();

    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
    this.myrenderer.setElementStyle(feedArray2[item].nativeElement, 'display', 'flex');

    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
    this.myrenderer.setElementStyle(captionComps[item].nativeElement, 'display', 'block');

    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
    //this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  listClasses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.list = this.af.list('/classes');

      this.subscription4 = this.list.subscribe(items => { 
        items.forEach(item => {
          console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");

          let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
          
          storageRef.getDownloadURL().then(url => {
            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
            item.customMetadata.profilepic = url;
          }).catch((e) => {
            console.log("in caught url !!!!!!!$$$$$$$!!");
            item.customMetadata.profilepic = 'assets/blankprof.png';
          });
          //this.startAtKey = item.$key;
          this.classesListArray.push(item.customMetadata);
          
          

        });

        
        console.log(JSON.stringify(this.classesListArray) + " ***** CLASSESL IST ARRAY");
        this.classesListArray.reverse(); 
        resolve();            
      })

    })
  }

  listProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.list = this.af.list('/products');

      this.subscription5 = this.list.subscribe(items => { 
        items.forEach(item => {
          console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");

          let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
          
          storageRef.getDownloadURL().then(url => {
            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
            item.customMetadata.profilepic = url;
          }).catch((e) => {
            console.log("in caught url !!!!!!!$$$$$$$!!");
            item.customMetadata.profilepic = 'assets/blankprof.png';
          });
          //this.startAtKey = item.$key;
          this.productListArray.push(item.customMetadata);
          
          

        });



        console.log(JSON.stringify(this.classesListArray) + " ***** CLASSESL IST ARRAY");
        this.productListArray.reverse();   
        resolve();          
      })

    });
  }

  listAll() {
      this.items.push.apply(this.items, this.productListArray);
      this.items.push.apply(this.items, this.classesListArray);

      this.items.sort(function(a,b) {
          return b.postdate - a.postdate;
      });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    //this.subscription2.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {

        /*let data = new URLSearchParams();
        data.append('page', this.totalCount.toString());*/
        resolve();
        /*this.http
          .post('http://192.168.1.131:8888/maneappback/more-items.php', data)
            .subscribe(res => {
              //console.log(JSON.stringify(res));
              //let response = JSON.stringify(res);
                if(res.json()[0] == "0 results") {
                  console.log('Async operation has ended');
                  //infiniteScroll.complete();
                  resolve();
                  return;
                }
                else {
                  for(let i=0; i<res.json().length - 1; i++) {
                    this.totalCount+=1;
                    console.log('items get pushed in more &&&*&**&&*&* \n\n\n\n\n\n\n');
                    this.items.push(res.json()[i]);
                  };
                  console.log('Async operation has ended');
                  //infiniteScroll.complete();
                  resolve();
                }
                console.log(this.totalCount + ': totalCount!!!!!!');
            }, error => {
                console.log(error.json());
            });*/

    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    

    setTimeout(() => {

      console.log('Async operation has ended');
      refresher.complete();

      //let element = this.clickme._elementRef.nativeElement;
      //console.log(element);
      //element.style.cssText = "position: fixed; z-index: 99; left: 0; top: 0"; 
    }, 700);


    /*let data = new URLSearchParams();
    data.append('page', this.totalCount.toString());
    data.append('lastNumRows', this.lastNumRows.toString());

    console.log("constructed");

    this.http
      .post('http://192.168.1.131:8888/maneappback/more-items-refresher.php', data)
        .subscribe(res => {
          console.log('getInitialImages completed ***********');

          if(res.json()[0] == "0 results") {
            console.log('Async operation has ended');
            refresher.complete();
            //infiniteScroll.complete();
            return;
          }

          for(let i=0; i<res.json().length - 1; i++) {
            this.totalCount+=1;
            this.items.unshift(res.json()[i]);
            console.log('this.items is pushed.....');
          };

          this.lastNumRows = res.json()[res.json().length - 1];
          console.log('Async operation has ended');
          refresher.complete();
        }, error => {
          console.log(JSON.stringify(error));
          console.log('Async operation has ended');
          refresher.complete();
        });*/
    
  }
}