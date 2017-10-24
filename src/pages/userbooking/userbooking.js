var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, QueryList, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedUser } from '../../pages/feeduser/feeduser';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserBooking = /** @class */ (function () {
    function UserBooking(elRef, myrenderer, loadingController, storage, navCtrl, navParams, af) {
        this.elRef = elRef;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.times = [];
        this.slot = [];
        this.appointments = [];
        this.datesToSelect = [];
        this.timesOpen = [];
        this.show = false;
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
        //this.items = this.af.list('/appointments/' + this.username);
        //console.log(this.items);
    }
    UserBooking.prototype.ngAfterViewInit = function () {
        console.log("IN NGAFTER");
        //console.log(this.elRef.nativeElement.querySelectorAll('td[tappable]'));
    };
    UserBooking.prototype.ionViewDidLoad = function () {
    };
    UserBooking.prototype.emergency = function (i) {
        console.log(this.slots);
        var slotsarray = this.slots.toArray();
        this.myrenderer.setElementStyle(slotsarray[i]._elementRef.nativeElement, 'background-color', 'red');
        this.times[i].selected = true;
        alert("Mane Emergency text sent to followers.");
    };
    UserBooking.prototype.swipe = function (e, when) {
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            var direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            var duration = time - this.swipeTime;
            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {
                var swipe = direction[0] < 0 ? 'next' : 'previous';
                console.log(swipe);
                if (swipe == 'next') {
                    this.goToFeed();
                    //this.loading.present();
                }
                else {
                    this.goToProfile();
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserBooking.prototype.swipeLeft = function () {
        this.goToFeed();
    };
    UserBooking.prototype.swipeRight = function () {
        this.goToFeed();
    };
    UserBooking.prototype.logForm = function () {
        var _this = this;
        var foundit = false;
        console.log(JSON.stringify(this.times) + "               in logform");
        //let appoint = {} as Appointment;
        //console.log(this.selectedDate);
        //appoint.datex = this.selectedDate;
        //appoint.reserved = this.appointments;
        //console.log(appoint);
        //let timestamp = this.toTimeStamp(this.selectedDate.toString());
        this.items = this.af.list('/appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription = this.items.subscribe(function (items) { return items.forEach(function (item) {
            var str = new Date(item.date.day * 1000);
            var mon = str.getMonth();
            var dy = str.getDate();
            if (mon == _this.selectedDate.getMonth() && dy == _this.selectedDate.getDate()) {
                console.log("             inside update");
                foundit = true;
                _this.items.update(item.$key, { 'reserved': { 'appointment': _this.times } });
            }
        }); });
        if (!foundit) {
            var bool = false;
            console.log(this.username + 'down here');
            for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.selected) {
                    bool = true;
                }
            }
            if (bool) {
                this.items.push({ date: { day: this.selectedDate.getTime() / 1000 }, reserved: { appointment: this.times } }).then(function (snap) {
                    var key = snap.key;
                    console.log(key);
                });
            }
        }
        alert("Availability Saved");
    };
    UserBooking.prototype.checkboxCheck = function (z) {
    };
    UserBooking.prototype.arraysEqual = function (a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    UserBooking.prototype.getData = function (val) {
        this.username = val;
    };
    UserBooking.prototype.goToFeed = function () {
        this.navCtrl.push(FeedUser, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    };
    UserBooking.prototype.goToProfile = function () {
        //this.loading = this.loadingController.create({content : "Loading..."});
        //this.loading.present();
        this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    };
    UserBooking.prototype.ionViewWillLeave = function () {
        //this.loading.dismiss()
    };
    UserBooking.prototype.ionViewDidLeave = function () {
        //this.loading.dismiss();
    };
    //ionViewDidLoad() {
    /*this.isSomething = true;

    this.storage.get('username').then((val) => {
      this.getData(val);
    });*/
    //}
    UserBooking.prototype.ionViewDidEnter = function () {
        var _this = this;
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
        this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.username = this.navParams.get('username');
        console.log(this.viewDate + " view date ");
        //setTimeout(()=>{
        this.timesOpen = [];
        this.selectedDate = this.viewDate;
        console.log(this.username + "this.username");
        var bool = false;
        this.items2 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription2 = this.items2.subscribe(function (items) { return items.forEach(function (item) {
            console.log(item);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect.push(da.getDate());
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved above");
                //for(let m = 0; m < item.reserved.length; m++) {
                //for(let r of item.reserved) {
                //console.log(JSON.stringify(r));
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        _this.timesOpen.push(r);
                        console.log('hit appointment');
                        bool = true;
                    }
                }
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
            for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                var item_1 = _c[_b];
                if (!item_1.classList.contains('text-muted')) {
                    console.log(typeof item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                    if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                        console.log("Inner text in      " + item_1.innerText);
                        _this.myrenderer.setElementClass(item_1, "greencircle", true);
                    }
                    else {
                        //this.myrenderer.setElementClass(item,"monthview-selected",false);
                    }
                }
            }
        }); });
        if (!bool) {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
        }
        else {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
        }
        //loading.dismiss();
        //},1500)
    };
    UserBooking.prototype.toTimeStamp = function (dateString) {
        return new Date(dateString.split('-').reverse().join('/')).getTime();
    };
    UserBooking.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        var bool = false;
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.timesOpen = [];
        this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription4 = this.items4.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);\
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            _this.datesToSelect.push(da.getDate());
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        _this.timesOpen.push(r);
                        console.log('hit appointment');
                        bool = true;
                    }
                }
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
        if (!bool) {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
        }
        else {
            this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
        }
    };
    UserBooking.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
        this.subscription4.unsubscribe();
    };
    UserBooking.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    UserBooking.prototype.onEventSelected = function ($event) { };
    UserBooking.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0];
        this.titleYear = array[1];
    };
    UserBooking.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        var bool = false;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            this.timesOpen = [];
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
                //console.log(JSON.stringify(item));
                //console.log(item.date.day);
                console.log("dafirst    " + item.date.day);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect = [];
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
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
                    for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                        var r = _a[_i];
                        if (r.selected == true) {
                            _this.timesOpen.push(r);
                            console.log('hit appointment');
                            bool = true;
                        }
                    }
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
                for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                    var item_2 = _c[_b];
                    if (!item_2.classList.contains('text-muted')) {
                        console.log(typeof item_2.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        var count = 0;
                        if (_this.datesToSelect.indexOf(parseInt(item_2.innerText)) != -1) {
                            console.log("Inner text in      " + item_2.innerText);
                            _this.myrenderer.setElementClass(item_2, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
                //}
            }); });
            if (!bool) {
                this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'block');
            }
            else {
                this.myrenderer.setElementStyle(this.noavail.nativeElement, 'display', 'none');
            }
        }
    };
    __decorate([
        ViewChildren('slot'),
        __metadata("design:type", QueryList)
    ], UserBooking.prototype, "slots", void 0);
    __decorate([
        ViewChild('noavail'),
        __metadata("design:type", ElementRef)
    ], UserBooking.prototype, "noavail", void 0);
    UserBooking = __decorate([
        Component({
            selector: 'page-user-booking',
            templateUrl: 'userbooking.html',
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer, LoadingController, Storage, NavController, NavParams, AngularFireDatabase])
    ], UserBooking);
    return UserBooking;
}());
export { UserBooking };
//# sourceMappingURL=userbooking.js.map