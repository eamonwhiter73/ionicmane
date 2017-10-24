var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, ViewChild, ViewChildren, QueryList, Renderer, ElementRef } from '@angular/core';
import { NavController, App, Platform, Slides } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { PostpagePage } from '../postpage/postpage';
import { FeedUser } from '../feeduser/feeduser';
import { UserProfile } from '../userprofile/userprofile';
import { FollowersPage } from '../followers/followers';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { CameraServicePost } from '../../services/cameraservicepost';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var FeedStylist = /** @class */ (function () {
    function FeedStylist(datePicker, storage, platform, af, element, camera, app, cameraServicePost, actionSheetCtrl, myrenderer, loadingController, navCtrl) {
        this.datePicker = datePicker;
        this.storage = storage;
        this.platform = platform;
        this.af = af;
        this.element = element;
        this.camera = camera;
        this.app = app;
        this.cameraServicePost = cameraServicePost;
        this.actionSheetCtrl = actionSheetCtrl;
        this.myrenderer = myrenderer;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.downState = 'notDown';
        this.moveState = 'up';
        this.toolbarState = 'up';
        this.toolbarClicks = 0;
        this.items = [];
        this.totalCount = 0;
        this.lastNumRows = 0;
        this.classesListArray = [];
        this.productListArray = [];
        this.formulaListArray = [];
        this.ads = [];
        this.swiperSize = 'begin';
        this.optionsGetMedia = {
            allowEdit: false,
            quality: 2,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.optionsGetCamera = {
            quality: 2,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.PNG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        };
        this.nav = this.app.getActiveNav();
    }
    FeedStylist.prototype.modelChanged = function (newObj) {
        var _this = this;
        console.log(typeof newObj + "  nnnnnneeeeeewwww     jo boboobbooooooob");
        var date = new Date(newObj);
        console.log(date.getDate() + "     :     " + date.getDay());
        this.month = this.af.list('/appointments/' + this.username + '/' + date.getMonth());
        this.subscription7 = this.month.subscribe(function (items) { return items.forEach(function (item) {
            console.log(JSON.stringify(item) + "    got the month");
            var holderDate = new Date(item.date.day * 1000);
            console.log(date.getMinutes() + "   date : getmin   " + holderDate.getMinutes());
            console.log(date.getUTCHours() + "   date : gethours    " + holderDate.getUTCHours());
            console.log(date.getDate() + "   date : getdate    " + holderDate.getDate());
            console.log(date.getMonth() + "   date : getmonth    " + holderDate.getMonth());
            console.log(date.getFullYear() + "   date : getyear    " + holderDate.getFullYear());
            var boool = false;
            if (date.getDate() == holderDate.getDate() && date.getMonth() == holderDate.getMonth() && date.getFullYear() == holderDate.getFullYear()) {
                for (var _i = 0, _a = item.reserved.appointment; _i < _a.length; _i++) {
                    var x = _a[_i];
                    var forHold = void 0;
                    var minUnder = "";
                    var ampm = void 0;
                    console.log(date.getUTCHours() + "<number>date.getUTCHours()");
                    if (date.getUTCHours() > 12) {
                        forHold = date.getUTCHours() - 12;
                        ampm = "PM";
                    }
                    else {
                        forHold = date.getUTCHours();
                        ampm = "AM";
                    }
                    if (date.getMinutes() < 10) {
                        minUnder = "0" + date.getMinutes();
                    }
                    else {
                        minUnder = date.getMinutes().toString();
                    }
                    var time = forHold + ":" + minUnder + " " + ampm;
                    if (x.time == time) {
                        x.selected = false;
                        boool = true;
                    }
                    console.log(x.time + "     x.time");
                    console.log(time + "     time");
                    //console.log(date.getUTCHours()+":"+date.getUTCMinutes())
                    //if(x.time == date.getHours +":"+ date.getMinutes 
                }
            }
            if (boool == true) {
                _this.month.update(item.$key, { 'reserved': { 'appointment': item.reserved.appointment } });
                boool = false;
            }
        }); });
    };
    FeedStylist.prototype.sendIt = function () {
        console.log("sent sent sent setn");
    };
    FeedStylist.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    FeedStylist.prototype.getAds = function () {
        var _this = this;
        console.log("in get addddssss ******");
        this.objj = this.af.object('/adcounter/count');
        this.subscription6 = this.objj.subscribe(function (item) {
            console.log(JSON.stringify(item) + "in adddd subscribe()()()()()()");
            console.log(typeof item);
            _this.totalAdCount = item.$value;
            for (var x = 1; x < item.$value + 1; x++) {
                var storageRef = firebase.storage().ref().child('/ads/ad' + x + '.png');
                storageRef.getDownloadURL().then(function (url) {
                    console.log(url);
                    _this.ads.push(url);
                }).catch(function (e) {
                    //
                });
            }
        });
    };
    FeedStylist.prototype.goSeeProfile = function (item) {
        this.navCtrl.push(UserProfile, { username: item.username });
    };
    FeedStylist.prototype.tappedPost = function () {
        this.navCtrl.push(PostpagePage);
    };
    FeedStylist.prototype.tappedEmergency = function () {
        var _this = this;
        //this.navCtrl.push(BookingPage);
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) { console.log(date + " this is the date &&&&&&&"); _this.dateofme = date; }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    FeedStylist.prototype.indexChange = function () {
        console.log(this.swiperIndex);
        if (this.swiperSize == 'small' || 'begin') {
            if (this.totalAdCount - 4 == this.swiperIndex) {
                this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
            }
        }
        else {
            if (this.totalAdCount - 1 == this.swiperIndex) {
                this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
            }
            else if (this.swiperIndex == 0) {
                this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
            }
        }
    };
    FeedStylist.prototype.swipeLeft = function () {
        this.toProfile();
    };
    FeedStylist.prototype.swipeRight = function () {
        this.toFollowers();
    };
    FeedStylist.prototype.switchView = function () {
        this.navCtrl.push(FeedUser);
    };
    FeedStylist.prototype.toProfile = function () {
        this.navCtrl.push(StylistProfile, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    };
    FeedStylist.prototype.toFollowers = function () {
        this.navCtrl.push(FollowersPage, {}, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    };
    FeedStylist.prototype.loadPost = function () {
        this.presentActionSheet();
    };
    FeedStylist.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose source',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        //let itemArrayTwo = this.profComponents.toArray();
                        _this.cameraServicePost.getMedia(_this.optionsGetCamera).then(function (data) {
                            _this.navCtrl.push(PostpagePage, { path: data });
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
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        //let itemArrayTwo = this.profComponents.toArray();
                        _this.cameraServicePost.getMedia(_this.optionsGetMedia).then(function (data) {
                            console.log(data + "dadadaddkdkktatatat");
                            if (data) {
                                _this.navCtrl.push(PostpagePage, { path: data });
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
    FeedStylist.prototype.all = function () {
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.products = function () {
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.classes = function () {
        console.log("classeslist      " + this.classeslist.nativeElement);
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.formulasList = function () {
        console.log("classeslist      " + this.classeslist.nativeElement);
        this.myrenderer.setElementStyle(this.allFeed.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.classesF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.productsF.toArray()[0]._elementRef.nativeElement, 'color', 'gray');
        this.myrenderer.setElementStyle(this.formulasF.toArray()[0]._elementRef.nativeElement, 'color', '#e6c926');
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.formulaslist.nativeElement, 'display', 'block');
    };
    FeedStylist.prototype.whatIsIndex1 = function () {
        console.log(this.slidess2.realIndex + "    big version");
        console.log(this.slidess.realIndex + "    small version");
    };
    FeedStylist.prototype.whatIsIndex2 = function () {
        console.log(this.slidess2.realIndex + "    big version");
        console.log(this.slidess.realIndex + "    small version");
    };
    FeedStylist.prototype.toolClicked = function (event) {
        var _this = this;
        this.toolbarClicks++;
        console.log('tapped');
        if (this.toolbarClicks == 1) {
            setTimeout(function () {
                if (_this.toolbarClicks == 2) {
                    console.log('running application');
                    _this.downState = (_this.downState == 'notDown') ? 'down' : 'notDown';
                    _this.moveState = (_this.moveState == 'up') ? 'down' : 'up';
                    _this.toolbarState = (_this.toolbarState == 'up') ? 'down' : 'up';
                    if (_this.toolbarState == 'up') {
                        _this.config = {
                            direction: 'horizontal',
                            slidesPerView: '4',
                            keyboardControl: false
                        };
                        _this.swiperSize = 'small';
                        /*this.adImage.forEach(item => {
                          this.myrenderer.setElementStyle(item.nativeElement, 'height', '17vh');
                        })*/
                        //this.myrenderer.setElementStyle(this.slidess2._elementRef.nativeElement, 'display', 'none');
                        //this.myrenderer.setElementStyle(this.slidess._elementRef.nativeElement, 'display', 'block');
                        /*let index = this.slidess2.realIndex;
                        console.log(index + "REAL INDEX OF BIG ------");
                        console.log(this.slidess2.getActiveIndex() + "active index big -----");
                        console.log(this.slidess.realIndex + "real index small in conditional -----");
                        while(this.slidess.getActiveIndex() <= index) {
                          console.log("in slide next !!!!!!!!!!! small");
                           this.slidess.slideNext();
                        }*/
                    }
                    else {
                        _this.config = {
                            direction: 'horizontal',
                            slidesPerView: '1',
                            keyboardControl: false
                        };
                        //el2.style['min-height'] = '250px';
                        //el2.style['max-width'] = '77%';
                        _this.swiperSize = 'big';
                        /*this.adImage.forEach(item => {
                          this.myrenderer.setElementStyle(item.nativeElement, 'height', '35vh');
                        })*/
                        //this.myrenderer.setElementStyle(this.slidess2._elementRef.nativeElement, 'display', 'block');
                        //this.myrenderer.setElementStyle(this.slidess._elementRef.nativeElement, 'display', 'none');
                        /*let index = this.slidess.getActiveIndex();
                           
                        console.log(index + "ACTIVE INDEX OF small ------");
                        console.log(this.slidess2.getActiveIndex() + "active index big in conditional -----");
                        console.log(this.slidess2.realIndex + "real index big -----");
                        //this.slidess2.slideTo(index, 500);
                        //this.slidess2.update();
            
                        while(this.slidess2.getActiveIndex() <= index) {
                          console.log("in slide next !!!!!!!!!!! big");
                           this.slidess2.slideNext();
                        }*/
                    }
                    _this.toolbarClicks = 0;
                }
                else {
                    _this.toolbarClicks = 0;
                }
            }, 300);
        }
    };
    FeedStylist.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.listClasses().then(function () {
            _this.listProducts().then(function () {
                _this.listAll();
                _this.getAds();
            });
        });
        this.formulas = this.af.list('/formulas');
        this.subscription8 = this.formulas.subscribe(function (items) { return items.forEach(function (item) {
            var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
            storageRef.getDownloadURL().then(function (url) {
                console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                item.customMetadata.profilepic = url;
            }).catch(function (e) {
                console.log("in caught url !!!!!!!$$$$$$$!!");
                item.customMetadata.profilepic = 'assets/blankprof.png';
            });
            console.log("item item ----- " + JSON.stringify(item));
            _this.formulaListArray.push(item.customMetadata);
        }); });
        this.myrenderer.setElementStyle(this.classeslist.nativeElement, 'display', 'none');
        this.myrenderer.setElementStyle(this.contentOne.nativeElement, 'display', 'block');
        this.myrenderer.setElementStyle(this.productslist.nativeElement, 'display', 'none');
        this.storage.get('username').then(function (val) {
            _this.username = val;
        });
    };
    FeedStylist.prototype.ionViewWillLeave = function () {
        //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'none');
    };
    FeedStylist.prototype.ionViewWillEnter = function () {
        //this.myrenderer.setElementStyle(this.ionHeader.nativeElement, 'display', 'block');
    };
    FeedStylist.prototype.contractItem = function (item) {
        console.log("in contract item 8*****");
        var flexArray = this.flexComponents.toArray();
        var feedArray = this.feedComponents.toArray();
        var feedArray2 = this.feedTopTwoComponents.toArray();
        var itemArray = this.components.toArray();
        var imageComps = this.imageComponents.toArray();
        var captionComps = this.captionComponents.toArray();
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
    };
    FeedStylist.prototype.contractItem2 = function (item) {
        var flexArray = this.flexComponents2.toArray();
        var feedArray = this.feedComponents2.toArray();
        var feedArray2 = this.feedTop22Components.toArray();
        var itemArray = this.components2.toArray();
        var imageComps = this.imageComponents2.toArray();
        var captionComps = this.captionComponents2.toArray();
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
    };
    FeedStylist.prototype.contractItem3 = function (item) {
        var flexArray = this.flexComponents3.toArray();
        var feedArray = this.feedComponents3.toArray();
        var feedArray2 = this.feedTop32Components.toArray();
        var itemArray = this.components3.toArray();
        var imageComps = this.imageComponents3.toArray();
        var captionComps = this.captionComponents3.toArray();
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
    };
    FeedStylist.prototype.contractItem4 = function (item) {
        var flexArray = this.flexComponents4.toArray();
        var feedArray = this.feedComponents4.toArray();
        var feedArray2 = this.feedTop42Components.toArray();
        var itemArray = this.components4.toArray();
        var imageComps = this.imageComponents4.toArray();
        var captionComps = this.captionComponents4.toArray();
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
    };
    FeedStylist.prototype.expandItem = function (item) {
        var flexArray = this.flexComponents.toArray();
        var feedArray = this.feedComponents.toArray();
        var feedArray2 = this.feedTopTwoComponents.toArray();
        var itemArray = this.components.toArray();
        var imageComps = this.imageComponents.toArray();
        var captionComps = this.captionComponents.toArray();
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
    };
    FeedStylist.prototype.expandItem2 = function (item) {
        var flexArray = this.flexComponents2.toArray();
        var feedArray = this.feedComponents2.toArray();
        var feedArray2 = this.feedTop22Components.toArray();
        var itemArray = this.components2.toArray();
        var imageComps = this.imageComponents2.toArray();
        var captionComps = this.captionComponents2.toArray();
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
    };
    FeedStylist.prototype.expandItem3 = function (item) {
        var flexArray = this.flexComponents3.toArray();
        var feedArray = this.feedComponents3.toArray();
        var feedArray2 = this.feedTop32Components.toArray();
        var itemArray = this.components3.toArray();
        var imageComps = this.imageComponents3.toArray();
        var captionComps = this.captionComponents3.toArray();
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
    };
    FeedStylist.prototype.expandItem4 = function (item) {
        var flexArray = this.flexComponents4.toArray();
        var feedArray = this.feedComponents4.toArray();
        var feedArray2 = this.feedTop42Components.toArray();
        var itemArray = this.components4.toArray();
        var imageComps = this.imageComponents4.toArray();
        var captionComps = this.captionComponents4.toArray();
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
    };
    FeedStylist.prototype.listClasses = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.list = _this.af.list('/classes');
            _this.subscription4 = _this.list.subscribe(function (items) {
                items.forEach(function (item) {
                    console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.profilepic = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.profilepic = 'assets/blankprof.png';
                    });
                    //this.startAtKey = item.$key;
                    _this.classesListArray.push(item.customMetadata);
                });
                console.log(JSON.stringify(_this.classesListArray) + " ***** CLASSESL IST ARRAY");
                _this.classesListArray.reverse();
                resolve();
            });
        });
    };
    FeedStylist.prototype.listProducts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.list = _this.af.list('/products');
            _this.subscription5 = _this.list.subscribe(function (items) {
                items.forEach(function (item) {
                    console.log(JSON.stringify(item.customMetadata) + ":   this is the customdata (((()()()()()");
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.profilepic = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.profilepic = 'assets/blankprof.png';
                    });
                    //this.startAtKey = item.$key;
                    _this.productListArray.push(item.customMetadata);
                });
                console.log(JSON.stringify(_this.classesListArray) + " ***** CLASSESL IST ARRAY");
                _this.productListArray.reverse();
                resolve();
            });
        });
    };
    FeedStylist.prototype.listAll = function () {
        this.items.push.apply(this.items, this.productListArray);
        this.items.push.apply(this.items, this.classesListArray);
        this.items.sort(function (a, b) {
            return b.postdate - a.postdate;
        });
    };
    FeedStylist.prototype.ngOnDestroy = function () {
        //this.subscription.unsubscribe();
        //this.subscription2.unsubscribe();
        this.subscription4.unsubscribe();
        this.subscription5.unsubscribe();
        this.subscription6.unsubscribe();
        this.subscription7.unsubscribe();
    };
    FeedStylist.prototype.doInfinite = function () {
        console.log('Begin async operation');
        return new Promise(function (resolve) {
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
        });
    };
    FeedStylist.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(function () {
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
    };
    __decorate([
        ViewChildren('feedstyle'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components", void 0);
    __decorate([
        ViewChildren('flex'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents", void 0);
    __decorate([
        ViewChildren('feedtop'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents", void 0);
    __decorate([
        ViewChildren('imagepost'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents", void 0);
    __decorate([
        ViewChildren('caption'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents", void 0);
    __decorate([
        ViewChildren('allF'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "allFeed", void 0);
    __decorate([
        ViewChildren('productsFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "productsF", void 0);
    __decorate([
        ViewChildren('classesFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "classesF", void 0);
    __decorate([
        ViewChildren('formulasFeed'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "formulasF", void 0);
    __decorate([
        ViewChild('contentone'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "contentOne", void 0);
    __decorate([
        ViewChild('classeslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "classeslist", void 0);
    __decorate([
        ViewChild('formulaslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "formulaslist", void 0);
    __decorate([
        ViewChild('swiper'),
        __metadata("design:type", Object)
    ], FeedStylist.prototype, "swiperEl", void 0);
    __decorate([
        ViewChild('productslist'),
        __metadata("design:type", ElementRef)
    ], FeedStylist.prototype, "productslist", void 0);
    __decorate([
        ViewChildren('adimage'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "adImage", void 0);
    __decorate([
        ViewChild('slides'),
        __metadata("design:type", Slides)
    ], FeedStylist.prototype, "slidess", void 0);
    __decorate([
        ViewChild('slides2'),
        __metadata("design:type", Slides)
    ], FeedStylist.prototype, "slidess2", void 0);
    __decorate([
        ViewChildren('feedtoptwo'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTopTwoComponents", void 0);
    __decorate([
        ViewChildren('feedstyle2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components2", void 0);
    __decorate([
        ViewChildren('flex2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents2", void 0);
    __decorate([
        ViewChildren('feedtop2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents2", void 0);
    __decorate([
        ViewChildren('feedtop2two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop22Components", void 0);
    __decorate([
        ViewChildren('imagepost2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents2", void 0);
    __decorate([
        ViewChildren('caption2'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents2", void 0);
    __decorate([
        ViewChildren('feedstyle3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components3", void 0);
    __decorate([
        ViewChildren('flex3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents3", void 0);
    __decorate([
        ViewChildren('feedtop3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents3", void 0);
    __decorate([
        ViewChildren('feedtop3two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop32Components", void 0);
    __decorate([
        ViewChildren('imagepost3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents3", void 0);
    __decorate([
        ViewChildren('caption3'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents3", void 0);
    __decorate([
        ViewChildren('feedstyle4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "components4", void 0);
    __decorate([
        ViewChildren('flex4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "flexComponents4", void 0);
    __decorate([
        ViewChildren('feedtop4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedComponents4", void 0);
    __decorate([
        ViewChildren('feedtop4two'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "feedTop42Components", void 0);
    __decorate([
        ViewChildren('imagepost4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "imageComponents4", void 0);
    __decorate([
        ViewChildren('caption4'),
        __metadata("design:type", QueryList)
    ], FeedStylist.prototype, "captionComponents4", void 0);
    FeedStylist = __decorate([
        Component({
            selector: 'page-feed-stylist',
            templateUrl: 'feedstylist.html',
            animations: [
                trigger('slideDown', [
                    state('down', style({
                        height: '250px',
                    })),
                    state('notDown', style({
                        height: '88px',
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
                        top: '205px'
                    })),
                    state('notDown', style({
                        top: '50px'
                    })),
                    transition('* => *', animate('400ms ease-in')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [DatePicker, Storage, Platform, AngularFireDatabase, ElementRef, Camera, App, CameraServicePost, ActionSheetController, Renderer, LoadingController, NavController])
    ], FeedStylist);
    return FeedStylist;
}());
export { FeedStylist };
//# sourceMappingURL=feedstylist.js.map