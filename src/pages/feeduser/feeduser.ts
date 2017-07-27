import { AfterViewInit, Component, trigger, state, style, transition, animate, keyframes, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-feed-user',
  templateUrl: 'feeduser.html',
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
    trigger('show', [
      state('down', style({
        display: 'block',
      })),
      state('up', style({
        display: 'none',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
    trigger('showHeight', [
      state('down', style({
        display: 'block',
      })),
      state('up', style({
        display: 'none',
      })),
      transition('* => *', animate('400ms ease-in')),
    ]),
  ]
})
export class FeedUser implements AfterViewInit {
  @ViewChild('changeText') changeText: ElementRef;
  @ViewChild('availability') availability: ElementRef;
  @ViewChild('contentone') contentOne: ElementRef;
  @ViewChild('ratings') ratingbox: ElementRef;
  @ViewChild('weeklydeals') weekly: ElementRef;
  @ViewChild('promos') promos: ElementRef;
  @ViewChild('weekly') weeklyyellow: ElementRef;

  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  showDropDown: String = 'up';
  showDropDownHeight: String = 'up';


  toolbarClicks = 0;

  items = [];
  availabilities = [];
  rating = [];
  weeklydeal = [];

  totalCount = 0;
  lastNumRows = 0;
  el;

  constructor(public storage: Storage, private afAuth: AngularFireAuth, public renderer: Renderer, public loadingController: LoadingController, public navCtrl: NavController) {

  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid) {
        console.log("logged in");
      }
    })
  }

  toProfile() {
    this.navCtrl.push(StylistProfile, {
      param1: 'user'
    });
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
          if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
            this.showDropDown = (this.showDropDown == 'up') ? 'down' : 'up';
            this.showDropDownHeight = (this.showDropDownHeight == 'up') ? 'down' : 'up';
          }
          this.toolbarClicks = 0;
        }
        else {
          this.toolbarClicks = 0;
        }
      }, 300)
    }
  }

  closeMenu() {
    if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
      this.showDropDown = 'up';
      this.showDropDownHeight = 'up';
    }
    else {
      //
    }
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'block');
    //this.weekly.nativeElement.style= "display: none"
  }

  closeMenuP() {
    if(this.showDropDown == 'down' || this.showDropDownHeight == 'down') {
      this.showDropDown = 'up';
      this.showDropDownHeight = 'up';
    }
    else {
      //
    }
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', 'gray');
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');

    //this.weekly.nativeElement.style= "display: none"
  }

  dropDown() {
    if(this.downState == 'down') {
      this.showDropDownHeight = (this.showDropDownHeight == 'up') ? 'down' : 'up';
    }
    else {
      this.showDropDown = (this.showDropDown == 'up') ? 'down' : 'up';
    }
  }

  ngAfterViewInit() {
    console.log(this.changeText.nativeElement);
    //this.renderer.setElementProperty(this.changeText.nativeElement, 'innerHTML', 'Dick');   
  }

  dropDownD() {
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    this.changeText.nativeElement.innerHTML = "Distance";
    //this.changeText.nativeElement.style = "color:#e6c926";
    this.dropDown();
  }

  dropDownA() {
    this.changeText.nativeElement.innerHTML = "Availability";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'block');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'none');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    /*this.changeText.nativeElement.style = "color:#e6c926";
    this.availability.nativeElement.style = "display: block";
    this.contentOne.nativeElement.style = "display: none";
    this.ratingbox.nativeElement.style = "display: none";
    this.weekly.nativeElement.style = "display: none";*/
    this.dropDown();
  }

  dropDownP() {
    this.changeText.nativeElement.innerHTML = "Price";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');

    this.dropDown();
  }

  dropDownR() {
    this.changeText.nativeElement.innerHTML = "Rating";
    this.renderer.setElementStyle(this.changeText.nativeElement, 'color', '#e6c926');
    this.renderer.setElementStyle(this.weeklyyellow.nativeElement, 'color', 'gray');
    this.renderer.setElementStyle(this.promos.nativeElement, 'color', 'gray');
    
    //this.changeText.nativeElement.style = "color:gray";
    this.renderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
    //this.contentOne.nativeElement.style = "display: block";
    this.renderer.setElementStyle(this.availability.nativeElement, 'display', 'none');
    //this.availability.nativeElement.style = "display: none";
    this.renderer.setElementStyle(this.ratingbox.nativeElement, 'display', 'block');
    //this.ratingbox.nativeElement.style= "display: none";
    this.renderer.setElementStyle(this.weekly.nativeElement, 'display', 'none');
    this.dropDown();
  }

  ionViewDidLoad() {
    this.getInitialImages();

    /*this.el = document.getElementById('iontoolbar');

    this.el.addEventListener('click', function() {
      this.downState = (this.downState == 'notDown') ? 'down' : 'notDown';
      console.log("this.downState" + this.downState);
    })*/
  }

  getInitialImages() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();

    this.items = ['../../assets/hair1.jpg', '../../assets/hair2.jpg', '../../assets/hair3.jpeg', '../../assets/hair4.jpeg',
                  '../../assets/hair5.jpeg', '../../assets/hair6.jpg', '../../assets/hair7.jpg', '../../assets/hair8.jpg', 
                  '../../assets/hair9.jpeg', '../../assets/hair10.jpg'];

    this.availabilities = [
                            
                            {'pic': '../../assets/hair5.jpeg', 'salon':'Salon 5', 'time':'12:30PM'},
                            {'pic': '../../assets/hair6.jpg', 'salon':'Salon 6', 'time':'1:00PM'},
                            {'pic': '../../assets/hair7.jpg', 'salon':'Salon 7', 'time':'1:30PM'},
                            {'pic': '../../assets/hair8.jpg', 'salon':'Salon 8', 'time':'2:00PM'},
                            {'pic': '../../assets/hair9.jpeg', 'salon':'Salon 9', 'time':'2:30PM'},
                            {'pic': '../../assets/hair10.jpg', 'salon':'Salon 10', 'time':'3:00PM'},
                            {'pic': '../../assets/hair7.jpg', 'salon':'Salon 1', 'time':'10:30AM'},
                            {'pic': '../../assets/hair2.jpg', 'salon':'Salon 2', 'time':'11:00AM'},
                            {'pic': '../../assets/hair3.jpeg', 'salon':'Salon 3', 'time':'11:30AM'},
                            {'pic': '../../assets/hair4.jpeg', 'salon':'Salon 4', 'time':'12:00PM'},
                            {'pic': '../../assets/hair5.jpeg', 'salon':'Salon 5', 'time':'12:30PM'},
                            {'pic': '../../assets/hair6.jpg', 'salon':'Salon 6', 'time':'1:00PM'},
                            {'pic': '../../assets/hair7.jpg', 'salon':'Salon 7', 'time':'1:30PM'},
                            {'pic': '../../assets/hair8.jpg', 'salon':'Salon 8', 'time':'2:00PM'},
                            {'pic': '../../assets/hair9.jpeg', 'salon':'Salon 9', 'time':'2:30PM'},
                            {'pic': '../../assets/hair10.jpg', 'salon':'Salon 10', 'time':'3:00PM'},
                            {'pic': '../../assets/hair7.jpg', 'salon':'Salon 1', 'time':'10:30AM'},
                            {'pic': '../../assets/hair2.jpg', 'salon':'Salon 2', 'time':'11:00AM'},
                            {'pic': '../../assets/hair3.jpeg', 'salon':'Salon 3', 'time':'11:30AM'},
                            {'pic': '../../assets/hair4.jpeg', 'salon':'Salon 4', 'time':'12:00PM'}

                          ];

    this.rating = [
                    {'pic': '../../assets/hair5.jpeg', 'salon':'Salon 5', 'time':'\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair6.jpg', 'salon':'Salon 6', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair7.jpg', 'salon':'Salon 7', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair8.jpg', 'salon':'Salon 8', 'time':'\u2605\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair9.jpeg', 'salon':'Salon 9', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair10.jpg', 'salon':'Salon 10', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair7.jpg', 'salon':'Salon 1', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair2.jpg', 'salon':'Salon 2', 'time':'\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair3.jpeg', 'salon':'Salon 3', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair4.jpeg', 'salon':'Salon 4', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair5.jpeg', 'salon':'Salon 5', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair6.jpg', 'salon':'Salon 6', 'time':'\u2605\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair7.jpg', 'salon':'Salon 7', 'time':'\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair8.jpg', 'salon':'Salon 8', 'time':'\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair9.jpeg', 'salon':'Salon 9', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair10.jpg', 'salon':'Salon 10', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair7.jpg', 'salon':'Salon 1', 'time':'\u2605\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair2.jpg', 'salon':'Salon 2', 'time':'\u2605\u2605'},
                    {'pic': '../../assets/hair3.jpeg', 'salon':'Salon 3', 'time':'\u2605\u2605\u2605'},
                    {'pic': '../../assets/hair4.jpeg', 'salon':'Salon 4', 'time':'\u2605\u2605\u2605\u2605'}
                  ];
    
    this.weeklydeal = [
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 5', 'time':'$20 off coloring'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 6', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 7', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 8', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 9', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 10', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 1', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 2', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 3', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 4', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 5', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 6', 'time':'$10 off on first session'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 7', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 8', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 9', 'time':'$10 off bleaching'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 10', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 1', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 2', 'time':'50% off ombre'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 3', 'time':'$20 off coloring'},
                    {'pic': 'Weekly Deal', 'salon':'@salon_ 4', 'time':'$20 off coloring'}
                  ];                    

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