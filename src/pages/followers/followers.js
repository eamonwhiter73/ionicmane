var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { UserviewuserprofilePage } from '../userviewuserprofile/userviewuserprofile';
import { FeedStylist } from '../feedstylist/feedstylist';
/**
 * Generated class for the FollowersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FollowersPage = /** @class */ (function () {
    function FollowersPage(callNumber, geolocation, storage, af, navCtrl, navParams) {
        this.callNumber = callNumber;
        this.geolocation = geolocation;
        this.storage = storage;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.followers = [];
        this.followersList = [];
    }
    FollowersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FollowersPage');
        this.storage.get('username').then(function (val) {
            console.log('in storage');
            _this.follow = _this.af.list('/profiles/stylists/' + val + "/followers");
            _this.subscription = _this.follow.subscribe(function (items) { return items.forEach(function (item) {
                console.log(JSON.stringify(item) + "    type followers");
                _this.followlist = _this.af.object('/profiles/users/' + Object.keys(item)[0]);
                _this.subscription2 = _this.followlist.subscribe(function (item1) {
                    _this.sendBio = item1.bio;
                    console.log('inside subscribe   ' + JSON.stringify(item1));
                    if (item1.picURL == null) {
                        item1.picURL = 'assets/blankprof.png';
                    }
                    _this.geolocation.getCurrentPosition().then(function (resp) {
                        if (item1.location != null) {
                            var rr = _this.round(_this.distance(item1.location.latitude, item1.location.longitude, resp.coords.latitude, resp.coords.longitude, "M"), 1);
                            item1.distanceFrom = rr;
                        }
                    });
                    _this.followers.push(item1);
                });
            }); });
        });
    };
    FollowersPage.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    };
    FollowersPage.prototype.round = function (number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    ;
    FollowersPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    FollowersPage.prototype.swipeLeft = function () {
        this.navCtrl.push(FeedStylist, {}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    };
    FollowersPage.prototype.makePhoneCall = function (userPhone) {
        this.userPhone = userPhone;
        this.callNumber.callNumber(userPhone, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    FollowersPage.prototype.goToProfile = function (username) {
        this.navCtrl.push(UserviewuserprofilePage, { 'username': username, 'bio': this.sendBio, 'phone': this.userPhone });
    };
    FollowersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-followers',
            templateUrl: 'followers.html',
        }),
        __metadata("design:paramtypes", [CallNumber, Geolocation, Storage, AngularFireDatabase, NavController, NavParams])
    ], FollowersPage);
    return FollowersPage;
}());
export { FollowersPage };
//# sourceMappingURL=followers.js.map