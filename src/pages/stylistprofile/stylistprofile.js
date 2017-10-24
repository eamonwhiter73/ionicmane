var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, ViewChildren, Renderer, Renderer2, ElementRef, QueryList } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedStylist } from '../feedstylist/feedstylist';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';
import { FormulapostPage } from '../formulapost/formulapost';
import { SettingsPage } from '../settings/settings';
import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { Storage } from '@ionic/storage';
//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var StylistProfile = /** @class */ (function () {
    function StylistProfile(myrenderer2, navParams, elRef, storage, imageViewerCtrl, loadingController, /*public firebase: FirebaseApp, */ myrenderer, af, actionSheetCtrl, camera, navCtrl, cameraService) {
        this.myrenderer2 = myrenderer2;
        this.navParams = navParams;
        this.elRef = elRef;
        this.storage = storage;
        this.imageViewerCtrl = imageViewerCtrl;
        this.loadingController = loadingController;
        this.myrenderer = myrenderer;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.cameraService = cameraService;
        this.viewDate = new Date();
        this.events = [];
        this.calendar = { 'mode': 'month', 'currentDate': this.viewDate };
        this.moveState = 'up';
        this.picURLS = [];
        this.square = 0;
        this.datesToSelect = [];
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
    StylistProfile.prototype.ionViewDidEnter = function () {
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
    };
    StylistProfile.prototype.getFollowers = function () {
    };
    StylistProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArray = this.components.toArray();
        var itemArraythree = this.xclass.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        var _loop_1 = function (z) {
            //promises_array.push(new Promise(function(resolve,reject) {
            //let storageRef = firebase.storage().ref().child('/profile/'+ self.username + '/profile_' + self.username + '_' + z + '.png');
            //storageRef.getDownloadURL().then(url => {
            self.storage.get("profile" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
                    console.log(z);
                }
                //resolve();
            });
            self.storage.get("formula" + z).then(function (val) {
                if (val != null) {
                    self.myrenderer.setElementAttribute(itemArrayTwo[z - 1].nativeElement, 'src', val);
                    self.myrenderer2.addClass(itemArrayTwo[z - 1].nativeElement, 'formula');
                    self.myrenderer.setElementStyle(itemArrayTwo[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArray[z - 1].nativeElement, 'display', 'none');
                    self.myrenderer.setElementStyle(itemArraythree[z - 1].nativeElement, 'display', 'block');
                    self.myrenderer.setElementStyle(itemArrayfour[z - 1].nativeElement, 'display', 'flex');
                    console.log(z);
                }
                //resolve();
            });
            /*}).catch(error => {
              console.log(error.message);
              resolve();*/
            //}));
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
        //return Promise.all(promises_array);
    };
    StylistProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.square2 = this.navParams.get("square");
        if (this.square2 != null) {
            this.removePicFormula(this.square2);
        }
        this.storage.get('bio').then(function (val) {
            _this.bio = val;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
            console.log(val);
            _this.downloadImages();
            _this.item2 = _this.af.object('/profiles/stylists/' + _this.username + '/followers');
            _this.subscription5 = _this.item2.subscribe(function (item) {
                console.log(JSON.stringify(item) + "      followers number 98989899889");
                if (Object.keys(item)[0] == '$value') {
                    _this.followers = 0;
                }
                else {
                    _this.followers = item.length;
                }
            });
            _this.item9 = _this.af.object('/profiles/stylists/' + _this.username);
            _this.subscription9 = _this.item9.subscribe(function (item) {
                console.log(JSON.stringify(item) + "      rating number 989898222229889");
                var total = 0;
                for (var u in item.rating) {
                    total += item.rating[u];
                }
                _this.totalRatings = total;
                var totalPotential = item.rating.one * 5 + item.rating.two * 5 + item.rating.three * 5 + item.rating.four * 5 + item.rating.five * 5;
                var ratings = item.rating.one + item.rating.two * 2 + item.rating.three * 3 + item.rating.four * 4 + item.rating.five * 5;
                console.log(ratings + "   ratings          total potential:    " + totalPotential);
                if (ratings == 0 && totalPotential == 0) {
                    _this.stars = '\u2606\u2606\u2606\u2606\u2606';
                }
                var i = (ratings / totalPotential) * 100;
                if (Math.round(i) <= 20) {
                    _this.stars = '\u2605\u2606\u2606\u2606\u2606';
                }
                if (Math.round(i) > 20 && Math.round(i) <= 40) {
                    _this.stars = '\u2605\u2605\u2606\u2606\u2606';
                }
                if (Math.round(i) > 40 && Math.round(i) <= 60) {
                    _this.stars = '\u2605\u2605\u2605\u2606\u2606';
                }
                if (Math.round(i) > 60 && Math.round(i) <= 80) {
                    _this.stars = '\u2605\u2605\u2605\u2605\u2606';
                }
                if (Math.round(i) > 80) {
                    _this.stars = '\u2605\u2605\u2605\u2605\u2605';
                }
            });
        });
        this.storage.get('picURL').then(function (val) {
            _this.profilePic = val;
            if (_this.profilePic == null) {
                _this.profilePic = 'assets/blankprof.png';
            }
        });
        //this.isSomething = true;
        this.tds = this.elRef.nativeElement.querySelectorAll('td[tappable]');
        console.log(this.viewDate + " view date ");
        setTimeout(function () {
            _this.selectedDate = _this.viewDate;
            console.log(_this.username + "this.username");
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
                    _this.times = item.reserved.appointment.slice(0);
                    console.log('hit appointment');
                }
                for (var _i = 0, _a = _this.tds; _i < _a.length; _i++) {
                    var item_1 = _a[_i];
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
    StylistProfile.prototype.ngOnDestroy = function () {
        this.subscription2.unsubscribe();
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        this.subscription4.unsubscribe();
        this.subscription5.unsubscribe();
        this.subscription9.unsubscribe();
    };
    StylistProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet2();
        this.square = squarez;
    };
    StylistProfile.prototype.removePic = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        var itemArrayfour = this.formulaBars.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayfour[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("profile" + squarez, null);
        this.storage.set("formula" + squarez, null);
    };
    StylistProfile.prototype.removePicFormula = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("formula" + squarez, null);
    };
    StylistProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        if (itemArrayTwo[this.square - 1].nativeElement.classList.contains('formula')) {
            //
        }
        else {
            var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
            imageViewer.present();
        }
    };
    StylistProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArraythree[this.square - 1].nativeElement, 'display', 'block');
    };
    StylistProfile.prototype.presentActionSheet = function () {
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
                                        _this.storage.set("profile" + _this.square, url);
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
                                        _this.storage.set("profile" + _this.square, url);
                                        _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                                        _this.showSquare();
                                        resolve();
                                    });
                                    loading.dismiss();
                                }, 3500);
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
    StylistProfile.prototype.presentActionSheet2 = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose type',
            buttons: [
                {
                    text: 'Formula',
                    handler: function () {
                        _this.presentActionSheet3();
                    }
                }, {
                    text: 'Picture',
                    handler: function () {
                        _this.presentActionSheet();
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
    ////////////********************************************** SAVING FORMULAS TO SERVER
    StylistProfile.prototype.presentActionSheet3 = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        var itemArrayFour = _this.formulaBars.toArray();
                        _this.cameraService.getMediaFormulas(_this.optionsGetMedia, _this.square).then(function (url) {
                            console.log(url + " url url url url");
                            actionSheet.dismiss();
                            _this.storage.set("formula" + _this.square, url);
                            _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                            _this.myrenderer.setElementStyle(itemArrayFour[_this.square - 1].nativeElement, 'display', 'flex');
                            _this.myrenderer2.addClass(itemArrayTwo[_this.square - 1].nativeElement, 'formula');
                            _this.showSquare();
                            _this.navCtrl.push(FormulapostPage, { path: url, square: _this.square });
                        });
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('camera clicked');
                        //actionSheet.dismiss();
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        var itemArrayTwo = _this.profComponents.toArray();
                        var itemArrayFour = _this.formulaBars.toArray();
                        _this.cameraService.getMediaFormulas(_this.optionsGetMedia, _this.square).then(function (url) {
                            console.log(url + " url url url url");
                            actionSheet.dismiss();
                            _this.storage.set("formula" + _this.square, url);
                            _this.myrenderer.setElementAttribute(itemArrayTwo[_this.square - 1].nativeElement, 'src', url);
                            _this.myrenderer.setElementStyle(itemArrayFour[_this.square - 1].nativeElement, 'display', 'flex');
                            _this.myrenderer2.addClass(itemArrayTwo[_this.square - 1].nativeElement, 'formula');
                            _this.showSquare();
                            _this.navCtrl.push(FormulapostPage, { path: url, square: _this.square });
                        }); //pass in square choice
                        //this.myrenderer.setElementAttribute(this.itemArrayTwo[this.square - 1].nativeElement, 'src', 'block');
                        console.log('photo clicked');
                        //actionSheet.dismiss();
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
    StylistProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    StylistProfile.prototype.tappedPost = function () {
        this.navCtrl.push(PostpagePage);
    };
    StylistProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(BookingPage);
    };
    StylistProfile.prototype.goToSettings = function () {
        this.navCtrl.push(SettingsPage);
    };
    StylistProfile.prototype.backToFeed = function () {
        /*if(this.navParams.get('param1') == 'user') {
          this.navCtrl.push(FeedUser);
        }*/
        //else {
        this.navCtrl.push(FeedStylist, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
        //this.navCtrl.push(FeedStylist);
        //}
    };
    StylistProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(BookingPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    StylistProfile.prototype.swipe = function (e, when) {
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
    StylistProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    StylistProfile.prototype.openCal = function () {
        this.backToCal();
    };
    StylistProfile.prototype.swipeRight = function () {
        this.backToFeed();
    };
    //changed this***
    StylistProfile.prototype.moveCover = function () {
        this.moveState = (this.moveState == 'up') ? 'down' : 'up';
        this.tds = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides');
        this.myrenderer.setElementClass(this.tds, 'moveCover', true);
        var thisel = this.elRef.nativeElement.querySelector('body > ion-app > ng-component > ion-nav > page-stylist-profile > ion-content > div.scroll-content > div > ion-item > div.item-inner > div > ion-label > calendar > div > monthview > div:nth-child(3) > ion-slides > div > div.swiper-wrapper > ion-slide.swiper-slide.swiper-slide-active > div > table');
        this.myrenderer.setElementClass(thisel, 'marginchange', true);
        console.log('element class list   ' + thisel.classList);
    };
    StylistProfile.prototype.onCurrentDateChanged = function ($event) {
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
    StylistProfile.prototype.reloadSource = function (startTime, endTime) {
        console.log(startTime + " : starttime           endtime: " + endTime);
    };
    StylistProfile.prototype.onEventSelected = function ($event) { };
    StylistProfile.prototype.onViewTitleChanged = function (title) {
        var array = title.split(" ");
        //array[1];
        this.viewTitle = array[0].substring(0, 3);
        this.titleYear = array[1];
    };
    StylistProfile.prototype.onTimeSelected = function ($event) {
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
    ], StylistProfile.prototype, "components", void 0);
    __decorate([
        ViewChildren('profsquare'),
        __metadata("design:type", QueryList)
    ], StylistProfile.prototype, "profComponents", void 0);
    __decorate([
        ViewChildren('xclass'),
        __metadata("design:type", QueryList)
    ], StylistProfile.prototype, "xclass", void 0);
    __decorate([
        ViewChildren('formulabar'),
        __metadata("design:type", QueryList)
    ], StylistProfile.prototype, "formulaBars", void 0);
    StylistProfile = __decorate([
        Component({
            selector: 'page-stylist-profile',
            templateUrl: 'stylistprofile.html',
            animations: [
                trigger('moveCover', [
                    state('down', style({})),
                    state('up', style({})),
                    transition('* => *', animate('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [Renderer2, NavParams, ElementRef, Storage, ImageViewerController, LoadingController, Renderer, AngularFireDatabase, ActionSheetController, Camera, NavController, CameraService])
    ], StylistProfile);
    return StylistProfile;
}());
export { StylistProfile };
//# sourceMappingURL=stylistprofile.js.map