var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, ViewChildren, ViewChild, ElementRef, Renderer, QueryList } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedUser } from '../feeduser/feeduser';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';
import { UserBooking } from '../userbooking/userbooking';
import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { Rate } from '../../modals/rate/rate';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from 'ionic-native';
//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var UserProfile = /** @class */ (function () {
    function UserProfile(afAuth, elRef, params, modalCtrl, storage, imageViewerCtrl, loadingController, myrenderer, af, actionSheetCtrl, camera, navCtrl, navParams, cameraService) {
        this.afAuth = afAuth;
        this.elRef = elRef;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.picURL = "";
        this.bio = "";
        this.datesToSelect = [];
        this.timesOpen = [];
        this.set = false;
        this.optionsGetMedia = {
            allowEdit: false,
            quality: 10,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.optionsGetCamera = {
            quality: 10,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        };
        this.times = [{ 'time': '8:00 AM', 'selected': false }, { 'time': '12:00 PM', 'selected': false }, { 'time': '4:00 PM', 'selected': false },
            { 'time': '8:30 AM', 'selected': false }, { 'time': '12:30 PM', 'selected': false }, { 'time': '4:30 PM', 'selected': false },
            { 'time': '9:00 AM', 'selected': false }, { 'time': '1:00 PM', 'selected': false }, { 'time': '5:00 PM', 'selected': false },
            { 'time': '9:30 AM', 'selected': false }, { 'time': '1:30 PM', 'selected': false }, { 'time': '5:30 PM', 'selected': false },
            { 'time': '10:00 AM', 'selected': false }, { 'time': '2:00 PM', 'selected': false }, { 'time': '6:00 PM', 'selected': false },
            { 'time': '10:30 AM', 'selected': false }, { 'time': '2:30 PM', 'selected': false }, { 'time': '6:30 PM', 'selected': false },
            { 'time': '11:00 AM', 'selected': false }, { 'time': '3:00 PM', 'selected': false }, { 'time': '7:00 PM', 'selected': false },
            { 'time': '11:30 AM', 'selected': false }, { 'time': '3:30 PM', 'selected': false }, { 'time': '7:30 PM', 'selected': false }
        ];
    }
    UserProfile.prototype.ngOnDestroy = function () {
        this.subscription6.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
        this.subscription4.unsubscribe();
        this.subscription.unsubscribe();
        this.subscription7.unsubscribe();
        this.subscription9.unsubscribe();
    };
    UserProfile.prototype.instagramOpen = function () {
        var url;
        this.item5 = this.af.object('/profiles/stylists/' + this.username + '/instagramURL');
        this.item5.subscribe(function (item) {
            if (item["$value"] == null) {
                //
            }
            else {
                var browser = new InAppBrowser(item['$value'], "_system");
            }
        }).unsubscribe();
    };
    UserProfile.prototype.facebookOpen = function () {
        this.item6 = this.af.object('/profiles/stylists/' + this.username + '/facebookURL');
        this.item6.subscribe(function (item) {
            if (item["$value"] == null) {
                //
            }
            else {
                var browser = new InAppBrowser(item['$value'], "_system");
            }
        }).unsubscribe();
    };
    UserProfile.prototype.followStylist = function () {
        var _this = this;
        this.item = this.af.object('/profiles/stylists/' + this.username + '/followers');
        this.subscription = this.item.subscribe(function (item) {
            if (item.$value == null) {
                var array = [];
                array.push((_a = {}, _a[_this.userusername] = _this.uuid, _a));
                _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                _this.item.update(array);
            }
            else {
                if (item.indexOf(_this.userusername) == -1) {
                    item.push((_b = {}, _b[_this.userusername] = _this.uuid, _b));
                    _this.item.update(item);
                }
                else {
                    _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                }
            }
            var _a, _b;
        });
    };
    UserProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.username = this.params.get('username');
        this.subscription7 = this.afAuth.authState.subscribe(function (data) {
            if (data.email && data.uid) {
                console.log("logged in");
                _this.uuid = data.uid;
            }
        });
        this.storage.get('username').then(function (val) {
            _this.userusername = val;
        });
        console.log(this.username + "         this is item @@#2332dfdffdfd23");
        this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
        this.item2.subscribe(function (item) {
            var bool = false;
            if (Object.keys(item)[0] == '$value') {
                bool = true;
            }
            if (!bool) {
                console.log(typeof item + " type of type of type of");
                var index = item.findIndex(function (item) { return item[_this.userusername] === _this.uuid; });
                console.log(index + "         this.userusername   8888888*&&&*&*&*&*");
                if (index !== -1) {
                    _this.followsty._elementRef.nativeElement.innerHTML = "FOLLOWING";
                }
            }
        }).unsubscribe();
        var storageRef = firebase.storage().ref().child('/settings/' + this.username + '/profilepicture.png');
        storageRef.getDownloadURL().then(function (url) {
            console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
            _this.profilePic = url;
        }).catch(function (e) {
            console.log("in caught url !!!!!!!$$$$$$$!!");
            _this.profilePic = 'assets/blankprof.png';
        });
        this.item9 = this.af.object('/profiles/stylists/' + this.username);
        this.subscription9 = this.item9.subscribe(function (item) {
            console.log(JSON.stringify(item) + "      rating number 989898222229889");
            var total = 0;
            for (var u in item.rating) {
                total += item.rating[u];
            }
            //this.facebook.nativeElement.src = item.facebookURL;
            //this.instagram.nativeElement.src = item.instagramURL;
            _this.totalRatings = total;
        });
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        this.username = this.navParams.get('username');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.timesOpen = [];
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
            var bool = false;
            _this.items2 = _this.af.list('appointments/' + _this.username + '/' + _this.selectedDate.getMonth());
            _this.subscription2 = _this.items2.subscribe(function (items) { return items.forEach(function (item) {
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
                }
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
            //loading.dismiss();
        }, 1500);
    };
    UserProfile.prototype.getProfileInfo = function () {
        var _this = this;
        this.item = this.af.object('/profiles/stylists/' + this.username);
        this.subscription6 = this.item.subscribe(function (item) { _this.picURL = item.picURL; _this.bio = item.bio; });
    };
    UserProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet();
        this.square = squarez;
    };
    UserProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
        imageViewer.present();
    };
    UserProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
    };
    UserProfile.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetCamera, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = firebase.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        _this.cameraService.getMedia(_this.optionsGetMedia, _this.square).then(function () {
                            return new Promise(function (resolve, reject) {
                                var storageRef = firebase.storage().ref().child('/profile/' + _this.username + '/profile_' + _this.username + '_' + _this.square + '.png');
                                var loading = _this.loadingController.create({ content: "Loading..." });
                                loading.present();
                                setTimeout(function () {
                                    storageRef.getDownloadURL().then(function (url) {
                                        console.log(url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3000);
                            });
                            //
                        }).catch(function (e) {
                            console.log(e + "       eeeee");
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UserProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    UserProfile.prototype.presentProfileModal = function () {
        var profileModal = this.modalCtrl.create(Rate, { "user": this.username });
        profileModal.present();
    };
    UserProfile.prototype.tappedPost = function () {
        this.navCtrl.push(PostpagePage);
    };
    UserProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(BookingPage);
    };
    UserProfile.prototype.backToFeed = function () {
        /*if(this.navParams.get('param1') == 'user') {
          this.navCtrl.push(FeedUser);
        }*/
        //else {
        this.navCtrl.push(FeedUser, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(BookingPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserProfile.prototype.swipe = function (e, when) {
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
                    this.backToCal();
                }
                else {
                    this.backToFeed();
                }
                //Do whatever you want with swipe
            }
        }
    };
    UserProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    UserProfile.prototype.swipeRight = function () {
        this.backToFeed();
    };
    UserProfile.prototype.openCal = function () {
        this.navCtrl.push(UserBooking, { username: this.username });
    };
    UserProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var _loop_1 = function (z) {
            promises_array.push(new Promise(function (resolve, reject) {
                var storageRef = firebase.storage().ref().child('/profile/' + self.username + '/profile_' + self.username + '_' + z + '.png');
                storageRef.getDownloadURL().then(function (url) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', url);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    //self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    console.log(z);
                    resolve();
                }).catch(function (error) {
                    resolve();
                    console.log(error.message);
                });
            }));
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
        return Promise.all(promises_array);
    };
    UserProfile.prototype.ionViewWillEnter = function () {
        this.loadings = this.loadingController.create({ content: "Loading..." });
        this.loadings.present();
    };
    UserProfile.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.username = this.navParams.get("username");
        this.downloadImages().then(function () {
            _this.getProfileInfo();
            _this.loadings.dismiss();
        });
    };
    UserProfile.prototype.moveCover = function () {
        if (this.set == false) {
            try {
                this.set = true;
                this.moveState = 'down';
                this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
                console.log(this.tds + "   >>>>>>> >>>>>>");
                this.myrenderer.setElementClass(this.tds, 'moveCover', true);
                var thisel = this.elRef.nativeElement.querySelector('body > ion-app > page-user-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');
                this.myrenderer.setElementClass(thisel, 'marginchange', true);
                console.log('element class list   ' + thisel.classList);
            }
            catch (e) {
                console.log(e.message);
            }
        }
        else {
            this.navCtrl.push(UserBooking, { username: this.username });
        }
    };
    UserProfile.prototype.onCurrentDateChanged = function ($event) {
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
        this.items4 = this.af.list('appointments/' + this.username + '/' + this.selectedDate.getMonth());
        this.subscription4 = this.items4.subscribe(function (items) { return items.forEach(function (item) {
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
    UserProfile.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    UserProfile.prototype.onEventSelected = function ($event) { };
    UserProfile.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0].substring(0, 3);
        this.titleYear = array[1];
    };
    UserProfile.prototype.onTimeSelected = function ($event) {
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
                _this.datesToSelect.push(da.getDate());
                console.log(da + "da");
                console.log(da.getDate() + "dagetdate");
                console.log(_this.selectedDate.getDate());
                if (_this.selectedDate.getDate() == da.getDate() && _this.selectedDate.getMonth() == da.getMonth()) {
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
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item_2 = _a[_i];
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
                //}
            }); });
        }
    };
    __decorate([
        ViewChildren('pluscontain'),
        __metadata("design:type", QueryList)
    ], UserProfile.prototype, "components", void 0);
    __decorate([
        ViewChildren('profsquare'),
        __metadata("design:type", QueryList)
    ], UserProfile.prototype, "profComponents", void 0);
    __decorate([
        ViewChild('followsty'),
        __metadata("design:type", Object)
    ], UserProfile.prototype, "followsty", void 0);
    __decorate([
        ViewChild('instagram'),
        __metadata("design:type", ElementRef)
    ], UserProfile.prototype, "instagram", void 0);
    __decorate([
        ViewChild('facebook'),
        __metadata("design:type", ElementRef)
    ], UserProfile.prototype, "facebook", void 0);
    UserProfile = __decorate([
        Component({
            selector: 'page-user-profile',
            templateUrl: 'userprofile.html',
            animations: [
                trigger('moveCover', [
                    state('down', style({})),
                    state('up', style({})),
                    transition('* => *', animate('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [AngularFireAuth, ElementRef, NavParams, ModalController, Storage, ImageViewerController, LoadingController, Renderer, AngularFireDatabase, ActionSheetController, Camera, NavController, NavParams, CameraService])
    ], UserProfile);
    return UserProfile;
}());
export { UserProfile };
//# sourceMappingURL=userprofile.js.map