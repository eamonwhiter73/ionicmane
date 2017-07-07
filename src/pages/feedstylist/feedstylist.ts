import { Component, trigger, state, style, transition, animate, keyframes, ElementRef, ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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

  ]
})
export class FeedStylist {
  @ViewChild('clickme') clickme;
  @ViewChildren('feedstyle') components:QueryList<any>;
  @ViewChildren('flex') flexComponents:QueryList<any>;
  @ViewChildren('feedtop') feedComponents:QueryList<any>;
  @ViewChildren('imagepost') imageComponents:QueryList<any>;
  downState: String = 'notDown';
  moveState: String = 'up';
  toolbarState: String = 'up';
  toolbarClicks = 0;

  items = [];
  totalCount = 0;
  lastNumRows = 0;
  el;

  constructor(public myrenderer: Renderer, private elRef:ElementRef, public loadingController: LoadingController, public navCtrl: NavController) {

  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
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

    flexArray[item].nativeElement.style = 'display: none';
    feedArray[item].nativeElement.style = 'display: flex';
    imageComps[item].nativeElement.style = 'display: block';
    itemArray[item]._elementRef.nativeElement.style = "padding: 0"
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