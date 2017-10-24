var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, ViewChildren, ViewChild, Renderer, ElementRef, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedUser } from '../feeduser/feeduser';
import { BookingPage } from '../booking/booking';
import { PostpagePage } from '../postpage/postpage';
import { SettingsPage } from '../settings/settings';
import { CameraService } from '../../services/cameraservice';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { Storage } from '@ionic/storage';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
//import { IonicApp, IonicModule } from 'ionic-angular';
//import { MyApp } from './app/app.component';
var UserViewProfile = /** @class */ (function () {
    function UserViewProfile(nativeGeocoder, geolocation, elRef, storage, imageViewerCtrl, loadingController, /*public firebase: FirebaseApp, */ myrenderer, af, actionSheetCtrl, camera, navCtrl, cameraService) {
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
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
    UserViewProfile.prototype.ionViewDidEnter = function () {
        //let loading = this.loadingController.create({content : "Loading..."});
        //loading.present();
    };
    UserViewProfile.prototype.getFollowers = function () {
    };
    UserViewProfile.prototype.setLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            var location = resp;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log("I AM IN THE GEOCODING ***&&*&*&*&*");
                //console.log(JSON.stringify(address.street + "      " + address.city + "    add street city9999"));
                var newResult = JSON.parse(JSON.stringify(result));
                _this.thoroughfare = newResult.thoroughfare;
                _this.locality = newResult.locality;
                console.log(JSON.stringify(_this.locationListed) + "     thisislocaitonlistedste    3223i32ip 3ij223");
                _this.myrenderer.setElementStyle(_this.locationListed.nativeElement, 'display', 'block');
                _this.item1 = _this.af.object('/profiles/users/' + _this.username);
                _this.item1.update({ 'location': { 'latitude': resp.coords.latitude, 'longitude': resp.coords.longitude } }).then(function () {
                    alert("Your location has been updated");
                    _this.storage.set('location', false);
                }).catch(function (e) { alert("Something went wrong with setting your location, please try again."); });
            }).catch(function (e) {
                console.log(e.message + " caught this error");
            });
        });
    };
    UserViewProfile.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('bio').then(function (val) {
            _this.bio = val;
        });
        this.storage.get('location').then(function (val) {
            if (val == true) {
                _this.myrenderer.setElementStyle(_this.locationListed.nativeElement, 'display', 'none');
            }
            ;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
            console.log(val);
            _this.downloadImages();
            /*this.item2 = this.af.object('/profiles/stylists/' + this.username + '/followers');
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
              
            });*/
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
    UserViewProfile.prototype.ngOnDestroy = function () {
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
        if (this.subscription4 != null) {
            this.subscription4.unsubscribe();
        }
        if (this.subscription5 != null) {
            this.subscription5.unsubscribe();
        }
        if (this.subscription9 != null) {
            this.subscription9.unsubscribe();
        }
    };
    UserViewProfile.prototype.openCamera = function (squarez) {
        this.presentActionSheet();
        this.square = squarez;
    };
    UserViewProfile.prototype.removePic = function (squarez) {
        console.log("in remove pic 333333333          " + squarez);
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        console.log(JSON.stringify(itemArray) + " item array");
        this.myrenderer.setElementStyle(itemArray[squarez - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArrayTwo[squarez - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArraythree[squarez - 1].nativeElement, 'display', 'none');
        this.storage.set("profile" + squarez, null);
    };
    UserViewProfile.prototype.presentImage = function (squarez) {
        this.square = squarez;
        var itemArrayTwo = this.profComponents.toArray();
        console.log(JSON.stringify(itemArrayTwo[this.square - 1]));
        var imageViewer = this.imageViewerCtrl.create(itemArrayTwo[this.square - 1].nativeElement);
        imageViewer.present();
    };
    UserViewProfile.prototype.showSquare = function () {
        var itemArray = this.components.toArray();
        var itemArrayTwo = this.profComponents.toArray();
        var itemArraythree = this.xclass.toArray();
        this.myrenderer.setElementStyle(itemArray[this.square - 1].nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(itemArrayTwo[this.square - 1].nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(itemArraythree[this.square - 1].nativeElement, 'display', 'block');
    };
    UserViewProfile.prototype.presentActionSheet = function () {
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
    UserViewProfile.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    UserViewProfile.prototype.tappedPost = function () {
        this.navCtrl.push(PostpagePage);
    };
    UserViewProfile.prototype.tappedEmergency = function () {
        this.navCtrl.push(BookingPage);
    };
    UserViewProfile.prototype.goToSettings = function () {
        this.navCtrl.push(SettingsPage);
    };
    UserViewProfile.prototype.backToFeed = function () {
        /*if(this.navParams.get('param1') == 'user') {
          this.navCtrl.push(FeedUser);
        }*/
        //else {
        this.navCtrl.push(FeedUser, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserViewProfile.prototype.backToCal = function () {
        //if(this.navParams.get('param1') == 'user') {
        this.navCtrl.push(BookingPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
        //this.navCtrl.push(BookingPage);
        //}
        //else {
        //this.navCtrl.push(FeedStylist);
        //}
    };
    UserViewProfile.prototype.swipe = function (e, when) {
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
    UserViewProfile.prototype.swipeLeft = function () {
        this.backToCal();
    };
    UserViewProfile.prototype.swipeRight = function () {
        this.backToFeed();
    };
    UserViewProfile.prototype.downloadImages = function () {
        var self = this;
        var promises_array = [];
        var itemArrayTwo = this.profComponents.toArray();
        var itemArray = this.components.toArray();
        var itemArraythree = this.xclass.toArray();
        var _loop_1 = function (z) {
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
        };
        for (var z = 1; z < 10; z++) {
            _loop_1(z);
        }
    };
    __decorate([
        ViewChildren('pluscontain'),
        __metadata("design:type", QueryList)
    ], UserViewProfile.prototype, "components", void 0);
    __decorate([
        ViewChildren('profsquare'),
        __metadata("design:type", QueryList)
    ], UserViewProfile.prototype, "profComponents", void 0);
    __decorate([
        ViewChildren('xclass'),
        __metadata("design:type", QueryList)
    ], UserViewProfile.prototype, "xclass", void 0);
    __decorate([
        ViewChild('locationlisted'),
        __metadata("design:type", Object)
    ], UserViewProfile.prototype, "locationListed", void 0);
    UserViewProfile = __decorate([
        Component({
            selector: 'user-view-profile',
            templateUrl: 'userviewprofile.html',
            animations: [
                trigger('moveCover', [
                    state('down', style({
                        height: '100%',
                    })),
                    state('up', style({
                        height: '75px',
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [NativeGeocoder, Geolocation, ElementRef, Storage, ImageViewerController, LoadingController, Renderer, AngularFireDatabase, ActionSheetController, Camera, NavController, CameraService])
    ], UserViewProfile);
    return UserViewProfile;
}());
export { UserViewProfile };
//# sourceMappingURL=userviewprofile.js.map