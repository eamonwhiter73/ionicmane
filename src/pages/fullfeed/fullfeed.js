var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedUser } from '../feeduser/feeduser';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the FullfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FullfeedPage = /** @class */ (function () {
    function FullfeedPage(af, navCtrl, navParams) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
    }
    FullfeedPage.prototype.swipeLeft = function () {
        this.navCtrl.push(FeedUser, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    };
    FullfeedPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.list2 = this.af.list('/promos', {
            query: {
                limitToLast: 10
            }
        });
        var x = 0;
        this.subscription4 = this.list2.subscribe(function (items) {
            items.forEach(function (item) {
                var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                storageRef.getDownloadURL().then(function (url) {
                    console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                    item.customMetadata.picURL = url;
                }).catch(function (e) {
                    console.log("in caught url !!!!!!!$$$$$$$!!");
                    item.customMetadata.picURL = 'assets/blankprof.png';
                });
                _this.items.push(item.customMetadata);
                if (x == 0) {
                    _this.startAtKey = item.$key;
                    _this.lastKey = _this.startAtKey;
                }
                x++;
            });
            _this.items.reverse();
        });
    };
    FullfeedPage.prototype.gotoProfile = function () {
        this.navCtrl.push(StylistProfile);
    };
    FullfeedPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        console.log(this.content.directionY + "        upupupupupupu********");
        if (this.content.directionY == 'up') {
            this.show = false;
        }
        else {
            this.show = true;
        }
        //return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log(_this.startAtKey + "     before %%^&^&^% start at");
            _this.list = _this.af.list('/promos', {
                query: {
                    orderByKey: true,
                    endAt: _this.startAtKey,
                    limitToLast: 11
                }
            });
            _this.list.subscribe(function (items) {
                var x = 0;
                _this.lastKey = _this.startAtKey;
                items.forEach(function (item) {
                    var storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
                        item.customMetadata.picURL = url;
                    }).catch(function (e) {
                        console.log("in caught url !!!!!!!$$$$$$$!!");
                        item.customMetadata.picURL = 'assets/blankprof.png';
                    });
                    if (_this.startAtKey !== item.$key && _this.lastKey !== item.$key) {
                        console.log(_this.startAtKey + "   :startatkey before 4444444        item key:     " + item.$key);
                        _this.items.push(item.customMetadata);
                    }
                    if (x == 0) {
                        _this.startAtKey = item.$key;
                    }
                    x++;
                });
            });
            infiniteScroll.complete();
        }, 500);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], FullfeedPage.prototype, "content", void 0);
    FullfeedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fullfeed',
            templateUrl: 'fullfeed.html',
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, NavController, NavParams])
    ], FullfeedPage);
    return FullfeedPage;
}());
export { FullfeedPage };
//# sourceMappingURL=fullfeed.js.map