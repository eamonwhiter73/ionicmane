var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer } from '@angular/core';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
var PopUpOther = /** @class */ (function () {
    function PopUpOther(sms, callNumber, af, appCtrl, navCtrl, params, viewCtrl, renderer) {
        this.sms = sms;
        this.callNumber = callNumber;
        this.af = af;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        //@ViewChild('salon') salon: ElementRef;
        //@ViewChild('time') time: ElementRef;
        this.info = { 'salon': '', 'time': '' };
    }
    PopUpOther.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.info.salon = this.params.get('salon');
        this.info.time = this.params.get('time');
        this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
        this.subscription = this.userdata.subscribe(function (item) {
            console.log(JSON.stringify(item) + "in modal thing");
            _this.phone = item.phone;
        });
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    PopUpOther.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PopUpOther.prototype.smsFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.sms.send("1" + this.phone, 'Hi, I would like to talk about making an appointment!]');
        }
        else {
            this.sms.send(this.phone.toString(), 'Hi, I would like to talk about making an appointment!');
        }
    };
    PopUpOther.prototype.callFromPopup = function () {
        if (this.phone.toString().length < 11) {
            this.callNumber.callNumber("1" + this.phone, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
        else {
            this.callNumber.callNumber(this.phone.toString(), true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    PopUpOther.prototype.viewProfile = function () {
        this.dismiss();
        this.appCtrl.getRootNav().push(UserProfile, {
            username: this.info.salon
        });
    };
    PopUpOther.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2 != null) {
            this.subscription2.unsubscribe();
        }
    };
    PopUpOther = __decorate([
        Component({
            selector: 'pop-up-other',
            templateUrl: 'popupother.html'
        }),
        __metadata("design:paramtypes", [SMS, CallNumber, AngularFireDatabase, App, NavController, NavParams, ViewController, Renderer])
    ], PopUpOther);
    return PopUpOther;
}());
export { PopUpOther };
//# sourceMappingURL=popupother.js.map