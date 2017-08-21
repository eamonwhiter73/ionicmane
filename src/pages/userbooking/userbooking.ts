import { Component, ViewChild, Renderer, QueryList, ElementRef, ViewChildren, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { FeedStylist } from '../../pages/feedstylist/feedstylist';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { LoadingController } from 'ionic-angular';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { NgCalendarModule } from 'ionic2-calendar';




/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-booking',
  templateUrl: 'userbooking.html',
})
export class UserBooking implements OnDestroy {
  @ViewChildren('slot') slots:QueryList<any>;
  viewDate = new Date();
  events = [];
  viewTitle: string;
  calendar = {'mode': 'month', 'currentDate': this.viewDate};
  times = [];
  slot = [];
  username;
  appointments: string[] = [];
  selectedDate: Date;
  items : FirebaseListObservable<any>;
  items2 : FirebaseListObservable<any>;
  items3 : FirebaseListObservable<any>;
  items4 : FirebaseListObservable<any>;
  isSomething : boolean;
  titleYear;
  datesToSelect = [];
  tds;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  private subscription: ISubscription;
  private subscription2: ISubscription;
  private subscription3: ISubscription;
  private subscription4: ISubscription;

  constructor(private elRef:ElementRef, public myrenderer: Renderer, public loadingController: LoadingController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    this.times = [{'time':'8:00 AM', 'selected': false}, {'time':'12:00 PM', 'selected': false}, {'time':'4:00 PM', 'selected': false},
                  {'time':'8:30 AM', 'selected': false}, {'time':'12:30 PM', 'selected': false}, {'time':'4:30 PM', 'selected': false},
                  {'time':'9:00 AM', 'selected': false}, {'time':'1:00 PM', 'selected': false}, {'time':'5:00 PM', 'selected': false},
                  {'time':'9:30 AM', 'selected': false}, {'time':'1:30 PM', 'selected': false}, {'time':'5:30 PM', 'selected': false},
                  {'time':'10:00 AM', 'selected': false}, {'time':'2:00 PM', 'selected': false}, {'time':'6:00 PM', 'selected': false},
                  {'time':'10:30 AM', 'selected': false}, {'time':'2:30 PM', 'selected': false}, {'time':'6:30 PM', 'selected': false},
                  {'time':'11:00 AM', 'selected': false}, {'time':'3:00 PM', 'selected': false}, {'time':'7:00 PM', 'selected': false},
                  {'time':'11:30 AM', 'selected': false}, {'time':'3:30 PM', 'selected': false}, {'time': '7:30 PM', 'selected': false}
                ];

    
    //this.items = this.af.list('/appointments/' + this.username);
    //console.log(this.items);
        
    
  }

  ngAfterViewInit() {
    console.log("IN NGAFTER");
    //console.log(this.elRef.nativeElement.querySelectorAll('td[tappable]'));
  }

  ionViewDidLoad() {

  }

  emergency(i) {
    console.log(this.slots);
    let slotsarray = this.slots.toArray();
    this.myrenderer.setElementStyle(slotsarray[i]._elementRef.nativeElement, 'background-color', 'red');
    this.times[i].selected = true;
    alert("Mane Emergency text sent to followers.")
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
            this.goToFeed();
            //this.loading.present();
          }
          else {

            this.goToProfile();
          }
      //Do whatever you want with swipe
      }
    }
  }

  swipeLeft() {
    this.goToFeed();
  }

  swipeRight() {
    this.goToProfile();
  }

  logForm() {
    let foundit = false;
    console.log(JSON.stringify(this.times)  + "               in logform");
    //let appoint = {} as Appointment;
    //console.log(this.selectedDate);
    //appoint.datex = this.selectedDate;
    //appoint.reserved = this.appointments;
    //console.log(appoint);
    //let timestamp = this.toTimeStamp(this.selectedDate.toString());

    this.items = this.af.list('/appointments/' + this.username + '/' + this.selectedDate.getMonth());
    this.subscription = this.items.subscribe(items => items.forEach(item => {
      let str = new Date(item.date.day * 1000);
      let mon = str.getMonth();
      let dy = str.getDate();
      if(mon == this.selectedDate.getMonth() && dy == this.selectedDate.getDate()) {
        console.log("             inside update");
        foundit=true;
        this.items.update(item.$key, {'reserved':{'appointment':this.times}})
      }

    }));

     
    
    if(!foundit) {
      let bool = false;
      console.log(this.username + 'down here');
      for(let x of this.times) {
        if(x.selected) {
          bool = true;
        }
      }
      if(bool) {
        this.items.push({date:{day:this.selectedDate.getTime() / 1000}, reserved:{appointment:this.times}}).then((snap) => {
          const key = snap.key;
          console.log(key);
        });
      } 
    }

    alert("Availability Saved");
  }

  checkboxCheck(z) {

  }

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  getData(val) {
    this.username = val;
  }

  goToFeed() {
    this.navCtrl.push(FeedStylist,{},{animate:true,animation:'transition',duration:500,direction:'forward'})
  }

  goToProfile() {
    //this.loading = this.loadingController.create({content : "Loading..."});
    //this.loading.present();
    this.navCtrl.push(StylistProfile,{},{animate:true,animation:'transition',duration:500,direction:'back'})
  }

  ionViewWillLeave() {
   //this.loading.dismiss()
  }

  ionViewDidLeave() {
    //this.loading.dismiss();
  }

  //ionViewDidLoad() {
    /*this.isSomething = true;

    this.storage.get('username').then((val) => {
      this.getData(val);
    });*/
  //}

  

  ionViewDidEnter() {
    //let loading = this.loadingController.create({content : "Loading..."});
    //loading.present();
    this.isSomething = true;

    this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');

    this.storage.get('username').then((val) => {
      this.getData(val);
    });
  
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
          //for(let m = 0; m < item.reserved.length; m++) {
          //for(let r of item.reserved) {
            //console.log(JSON.stringify(r));
            this.times = item.reserved.appointment.slice(0);
            console.log('hit appointment');
            //count++;
            /*for(let x of this.times) {
              if(x.time == r) {
                console.log('change selected');
                x.selected = true;
              }
            }*/
          //}
        }

        /*let da = new Date(item.date.day*1000);
        if(this.viewDate.getDate() == da.getDate() && this.viewDate.getMonth() == da.getMonth()) {
          console.log("selected = item");
          let count = 0;
          console.log(JSON.stringify(item.reserved) + "         item resesrved");
          for(let r in item.reserved) {
            this.times[count].selected = r[count].selected;
            console.log('hit appointment');
            count++;
            /*for(let x of this.times) {
              if(x.time == r) {
                console.log('change selected');
                x.selected = true;
              }
            }*/
          /*}
        }*/
        for(let item of this.tds) {
          if(!item.classList.contains('text-muted')) {
            console.log(typeof item.innerText + "         innertext" + typeof this.datesToSelect[0]);
            let count = 0;
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

  toTimeStamp(dateString){
    return new Date(dateString.split('-').reverse().join('/')).getTime()
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  } 

  reloadSource(startTime, endTime) {
    console.log(startTime + " : starttime           endtime: " + endTime);
  }

  onEventSelected($event) {}

  onViewTitleChanged(title) {
    let array = title.split(" ");
    //array[1];
    this.viewTitle = array[0];
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
            /*let bool = false;
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
              let count = 0;
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
