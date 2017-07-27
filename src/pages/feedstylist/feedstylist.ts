import { Component, trigger, state, style, transition, animate, keyframes, ElementRef, ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { PostpagePage } from '../postpage/postpage';
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth'






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
        top: 307 + "px",
      })),
      state('up', style({
        top: 145 + "px",
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('toolSlide', [
      state('down', style({
        top: '250px'
      })),
      state('up', style({
        top: '88px'
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('plusSlide', [
      state('down', style({
        bottom: '-190px'
      })),
      state('up', style({
        bottom: '-25px'
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),

  ]
})
export class FeedStylist {
  @ViewChild('clickme') clickme;
  @ViewChildren('feedstyle') components:QueryList<any>;
  @ViewChildren('flex') flexComponents:QueryList<any>;
  @ViewChildren('feedtop') feedComponents:QueryList<any>;
  @ViewChildren('imagepost') imageComponents:QueryList<any>;
  @ViewChildren('allF') allFeed:QueryList<any>;
  @ViewChildren('productsFeed') productsF:QueryList<any>;
  @ViewChildren('classesFeed') classesF:QueryList<any>;

  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  toolbarClicks = 0;

  items = [];
  totalCount = 0;
  lastNumRows = 0;
  el;

  private nav:NavController;

  constructor(private afAuth: AngularFireAuth, public camera: Camera, private app:App, public cameraServicePost: CameraServicePost, public actionSheetCtrl: ActionSheetController, public myrenderer: Renderer, private elRef:ElementRef, public loadingController: LoadingController, public navCtrl: NavController) {
    this.nav = this.app.getActiveNav();
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid) {
        console.log("logged in");
      }
    })
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
                this.nav.push(PostpagePage, { path: data });
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
              this.nav.push(PostpagePage, { path: data });
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

  toProfile() {
    this.navCtrl.push(StylistProfile, {
      param1: 'stylist'
    });
  }

  all() {
    console.log(this.allFeed);
    console.log(this.classesF);
    console.log(this.productsF);
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
  }

  products() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
  }

  classes() {
    this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');  
    this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
    this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
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
    this.getInitialImages();

    /*this.el = document.getElementById('iontoolbar');

    this.el.addEventListener('click', function() {
      this.downState = (this.downState == 'notDown') ? 'down' : 'notDown';
      console.log("this.downState" + this.downState);
    })*/
  }

  expandItem(item) {
    let flexArray = this.flexComponents.toArray();
    let feedArray = this.feedComponents.toArray();
    let itemArray = this.components.toArray();
    let imageComps = this.imageComponents.toArray();

    console.log(flexArray);
    console.log(feedArray);
    console.log(itemArray);
    console.log(imageComps);

    this.myrenderer.setElementStyle(flexArray[item].nativeElement, 'display', 'none');
    this.myrenderer.setElementStyle(feedArray[item].nativeElement, 'display', 'flex');
    //flexArray[item].nativeElement.style = 'display: none';
    //feedArray[item].nativeElement.style = 'display: flex';
    this.myrenderer.setElementStyle(imageComps[item].nativeElement, 'display', 'block');
    //imageComps[item].nativeElement.style = 'display: block';
    this.myrenderer.setElementStyle(itemArray[item]._elementRef.nativeElement, 'padding', '0');
    //itemArray[item]._elementRef.nativeElement.style = "padding: 0";
    this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-padding', 'null');
    this.myrenderer.setElementAttribute(itemArray[item]._elementRef.nativeElement, 'no-lines', 'null');
    //var selectedRow = document.getElementById('item');
    //console.log(selectedRow);
  }

  getInitialImages() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();

    this.items = /*['../../assets/hair1.jpg', '../../assets/hair2.jpg', '../../assets/hair3.jpeg', '../../assets/hair4.jpeg',
                  '../../assets/hair5.jpeg', '../../assets/hair6.jpg', '../../assets/hair7.jpg', '../../assets/hair8.jpg', 
                  '../../assets/hair9.jpeg', '../../assets/hair10.jpg'];*/
                  [{'pic': '../../assets/hair5.jpeg', 'description':'This is a description of a deal/post/sale 5', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair6.jpg', 'description':'This is a description of a deal/post/sale 6', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair7.jpg', 'description':'This is a description of a deal/post/sale 7', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair8.jpg', 'description':'This is a description of a deal/post/sale 8', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair9.jpeg', 'description':'This is a description of a deal/post/sale 9', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair10.jpg', 'description':'This is a description of a deal/post/sale 10', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair7.jpg', 'description':'This is a description of a deal/post/sale 1', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair2.jpg', 'description':'This is a description of a deal/post/sale 2', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair3.jpeg', 'description':'This is a description of a deal/post/sale 3', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair4.jpeg', 'description':'This is a description of a deal/post/sale 4', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair5.jpeg', 'description':'This is a description of a deal/post/sale 5', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair6.jpg', 'description':'This is a description of a deal/post/sale 6', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair7.jpg', 'description':'This is a description of a deal/post/sale 7', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair8.jpg', 'description':'This is a description of a deal/post/sale 8', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair9.jpeg', 'description':'This is a description of a deal/post/sale 9', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair10.jpg', 'description':'This is a description of a deal/post/sale 10', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair7.jpg', 'description':'This is a description of a deal/post/sale 1', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair2.jpg', 'description':'This is a description of a deal/post/sale 2', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair3.jpeg', 'description':'This is a description of a deal/post/sale 3', 'link':'@stylist_profile'},
                  {'pic': '../../assets/hair4.jpeg', 'description':'This is a description of a deal/post/sale 4', 'link':'@stylist_profile'}];

    loading.dismiss();
    /*let data = new URLSearchParams();
    data.append('page', this.totalCount.toString());
    console.log("constructed");
     this.http
      .post('http://192.168.1.131:8888/maneappback/more-items.php', data)
        .subscribe(res => {
          for(let i=0; i<res.json().length - 1; i++) {
            this.totalCount+=1;
            this.items.push(res.json()[i]);
            console.log('this.items is pushed.....');
          };

          this.lastNumRows = res.json()[res.json().length - 1];
          console.log(this.lastNumRows)
          loading.dismiss();
        }, error => {
          console.log(JSON.stringify(error));
        });*/
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
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
      }, 500);
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