var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Appointment } from '../../models/appointment';
import { FeedStylist } from '../../pages/feedstylist/feedstylist';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { LoadingController } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BookingPage = /** @class */ (function () {
    function BookingPage(elRef, myrenderer, loadingController, storage, navCtrl, navParams, af) {
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
    }
    BookingPage.prototype.ionViewDidLoad = function () {
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '8:30 AM', 'selected': false }, { 'time': '9:00 AM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '10:00 AM', 'selected': false }, { 'time': '10:30 AM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '11:30 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false },
            { 'time': '12:30 PM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '1:30 PM', 'selected': false },
            { 'time': '2:00 PM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '3:00 PM', 'selected': false },
            { 'time': '3:30 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '5:00 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '6:30 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    };
    BookingPage.prototype.selectArrowRight = function () {
        console.log("month view component   *******  ******8    " + JSON.stringify(NgCalendarModule));
    };
    BookingPage.prototype.emergency = function (i) {
        console.log(this.slots);
        var slotsarray = this.slots.toArray();
        this.myrenderer.setElementStyle(slotsarray[i]._elementRef.nativeElement, 'background-color', 'red');
        this.times[i].selected = true;
        alert("Mane Emergency text sent to followers.");
    };
    BookingPage.prototype.swipe = function (e, when) {
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
    BookingPage.prototype.swipeLeft = function () {
        this.goToFeed();
    };
    BookingPage.prototype.swipeRight = function () {
        this.goToProfile();
    };
    BookingPage.prototype.logForm = function () {
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
            var boool = false;
            if (mon == _this.selectedDate.getMonth() && dy == _this.selectedDate.getDate()) {
                console.log("             inside update");
                foundit = true;
                _this.items.update(item.$key, { 'reserved': { 'appointment': _this.times } });
                for (var _i = 0, _a = _this.times; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (!boool) {
                    _this.datesToSelect.splice(_this.datesToSelect.indexOf(_this.selectedDate.getDate()), 1);
                    for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                        var item_1 = _c[_b];
                        //if(!item.classList.contains('text-muted')) {
                        console.log(item_1.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_1.innerText)) != -1) {
                            _this.myrenderer.setElementClass(item_1, "greencircle", true);
                        }
                        else {
                            _this.myrenderer.setElementClass(item_1, "greencircle", false);
                        }
                    }
                }
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
            else {
            }
        }
        alert("Availability Saved");
    };
    BookingPage.prototype.checkboxCheck = function (z) {
    };
    BookingPage.prototype.arraysEqual = function (a, b) {
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
    BookingPage.prototype.getData = function (val) {
        this.username = val;
    };
    BookingPage.prototype.goToFeed = function () {
        this.navCtrl.push(FeedStylist, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    };
    BookingPage.prototype.goToProfile = function () {
        //this.loading = this.loadingController.create({content : "Loading..."});
        //this.loading.present();
        this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    };
    BookingPage.prototype.ionViewWillLeave = function () {
        //this.loading.dismiss()
    };
    BookingPage.prototype.ionViewDidLeave = function () {
        //this.loading.dismiss();
    };
    //ionViewDidLoad() {
    /*this.isSomething = true;

    this.storage.get('username').then((val) => {
      this.getData(val);
    });*/
    //}
    BookingPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
        this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.storage.get('username').then(function (val) {
            _this.username = val;
            //this.getData(val);
            console.log(_this.viewDate + " view date ");
            _this.selectedDate = _this.viewDate;
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) { return items.forEach(function (item) {
                var boool = false;
                var da = new Date(item.date.day * 1000);
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (boool) {
                    _this.datesToSelect.push(da.getDate());
                }
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                    console.log("selected = item");
                    //for(let m = 0; m < item.reserved.length; m++) {
                    //for(let r of item.reserved) {
                    //console.log(JSON.stringify(r));
                    _this.times = item.reserved.appointment.slice(0);
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
                for (var _b = 0, _c = _this.tds; _b < _c.length; _b++) {
                    var item_2 = _c[_b];
                    if (!item_2.classList.contains('text-muted')) {
                        console.log(typeof item_2.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_2.innerText)) != -1) {
                            console.log("Inner text in      " + item_2.innerText);
                            _this.myrenderer.setElementClass(item_2, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
            }); });
        });
    };
    BookingPage.prototype.toTimeStamp = function (dateString) {
        return new Date(dateString.split('-').reverse().join('/')).getTime();
    };
    BookingPage.prototype.onCurrentDateChanged = function ($event) {
        var _this = this;
        //console.log(typeof $event);
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var x = _a[_i];
            x.selected = false;
        }
        console.log(typeof $event + "event event event *******");
        this.selectedDate = new Date($event);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        //console.log($event);
        this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
            //console.log(JSON.stringify(item));
            //console.log(item.date.day);
            console.log("dafirst    " + item.date.day);
            var da = new Date(item.date.day * 1000);
            _this.datesToSelect = [];
            var boool = false;
            for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                var r = _a[_i];
                if (r.selected == true) {
                    boool = true;
                }
            }
            if (boool) {
                _this.datesToSelect.push(da.getDate());
            }
            console.log(da + "da");
            console.log(da.getDate() + "dagetdate");
            console.log(_this.selectedDate.getDate());
            if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
                console.log("selected = item");
                console.log(JSON.stringify(item.reserved) + "         item resesrved");
                //for(let r of item.reserved.appointment) {
                //console.log(JSON.stringify(r));
                _this.times = item.reserved.appointment.slice(0);
                console.log('hit appointment');
                console.log(JSON.stringify(_this.times));
                /*for(let x of this.times) {
                  if(x.time == r) {
                    console.log('change selected');
                    x.selected = true;
                  }
                }*/
                //}
            }
        }); });
    };
    BookingPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
    };
    BookingPage.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    BookingPage.prototype.onEventSelected = function ($event) { };
    BookingPage.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0];
        this.titleYear = array[1];
    };
    BookingPage.prototype.onTimeSelected = function ($event) {
        var _this = this;
        console.log(JSON.stringify($event) + "      THI SIIS EVENT @(@(@(@(@(");
        this.selectedDate = new Date($event.selectedTime);
        console.log(this.selectedDate + " thi si the selected date ((())))))");
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        if ($event.dontRunCode) {
            //console.log($event);
            this.items3 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
            this.subscription3 = this.items3.subscribe(function (items) { return items.forEach(function (item) {
                //console.log(JSON.stringify(item));
                //console.log(item.date.day);
                console.log("dafirst    " + item.date.day);
                var da = new Date(item.date.day * 1000);
                _this.datesToSelect = [];
                var boool = false;
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.selected == true) {
                        boool = true;
                    }
                }
                if (boool) {
                    _this.datesToSelect.push(da.getDate());
                }
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
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                    console.log(JSON.stringify(_this.times));
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
                    var item_3 = _c[_b];
                    if (!item_3.classList.contains('text-muted')) {
                        console.log(typeof item_3.innerText + "         innertext" + typeof _this.datesToSelect[0]);
                        if (_this.datesToSelect.indexOf(parseInt(item_3.innerText)) != -1) {
                            console.log("Inner text in      " + item_3.innerText);
                            _this.myrenderer.setElementClass(item_3, "greencircle", true);
                        }
                        else {
                            //this.myrenderer.setElementClass(item,"monthview-selected",false);
                        }
                    }
                }
                //}
            }); });
        }
    };
    __decorate([
        ViewChildren('slot'),
        __metadata("design:type", QueryList)
    ], BookingPage.prototype, "slots", void 0);
    BookingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-booking',
            templateUrl: 'booking.html',
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer, LoadingController, Storage, NavController, NavParams, AngularFireDatabase])
    ], BookingPage);
    return BookingPage;
}());
export { BookingPage };
//# sourceMappingURL=booking.js.map