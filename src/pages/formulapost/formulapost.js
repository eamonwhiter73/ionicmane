var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FormulapostPage = /** @class */ (function () {
    function FormulapostPage(af, viewCtrl, storage, keyboard, datePicker, myrenderer, navCtrl, navParams) {
        this.af = af;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.keyboard = keyboard;
        this.datePicker = datePicker;
        this.myrenderer = myrenderer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = { 'date': null, 'title': '', 'price': '', 'caption': '', 'typeofselect': 'formula', 'description': '' };
    }
    FormulapostPage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    };
    FormulapostPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.square = this.navParams.get("square");
        this.imageHolder = this.navParams.get("path");
        this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);
        this.subscription = this.keyboard.onKeyboardShow().subscribe(function () {
            _this.myrenderer.setElementStyle(_this.share.getNativeElement(), 'bottom', '-150px');
        });
        this.subscription2 = this.keyboard.onKeyboardHide().subscribe(function () {
            console.log("keyboard being hid **&^&^&^&^&^&");
            console.log(_this.share.getNativeElement() + " * f8d fd8 f8df8 fd8 f8d 8f fd8 8 fd");
            _this.myrenderer.setElementStyle(_this.share.getNativeElement(), 'bottom', '0');
        });
        this.storage.get('username').then(function (val) { _this.username = val; console.log(val + "        getting username"); });
    };
    FormulapostPage.prototype.goToProfile = function () {
        this.navCtrl.push(StylistProfile, { square: this.square }, { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    };
    FormulapostPage.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('-');
    };
    FormulapostPage.prototype.isFormula = function () {
        var metadata = {
            customMetadata: {
                'title': this.item.title,
                'formula': this.item.caption,
                'description': this.item.description,
                'price': this.item.price,
                'username': this.username,
                'url': this.imageHolder,
                'postdate': Date.now(),
            }
        };
        this.list = this.af.list('/formulas');
        this.list.push(metadata);
    };
    FormulapostPage.prototype.shareItem = function () {
        console.log(this.item.title);
        console.log(this.item.caption);
        console.log(this.item.price);
        console.log(this.item.date);
        console.log(this.imageHolder + "                    **************************** src ****************");
        console.log("****&*&&*&*&*&*&*          " + this.item.typeofselect);
        if (this.item.title == '' || this.item.caption == '' || this.item.price == '' || this.imageHolder == null) {
            alert("You need to fill in all of the information");
        }
        else {
            this.isFormula();
            this.navCtrl.pop();
        }
        /*var dataURL = data;
    
        let image       : string  = 'profile_' + this.username + '_' + square + '.png',
          storageRef  : any,
          parseUpload : any;
    
        return new Promise((resolve, reject) => {
          storageRef       = firebase.storage().ref('/profile/' + this.username + '/' + image);
          parseUpload      = storageRef.putString(dataURL, 'data_url');
    
          parseUpload.on('state_changed', (_snapshot) => {
              // We could log the progress here IF necessary
              console.log('snapshot progess ' + _snapshot);
            },
            (_err) => {
               reject(_err);
               console.log(_err.messsage);
            },
            (success) => {
               resolve(parseUpload.snapshot);
            })
          }).then(value => {
            //this.af.list('/profile/' + self.username).push({ pic: image });
          }).catch(function(error) {
            console.log(error.message);
          });*/
    };
    FormulapostPage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        //this.navCtrl.push(SignUpPage);
    };
    __decorate([
        ViewChild('imagey'),
        __metadata("design:type", ElementRef)
    ], FormulapostPage.prototype, "image", void 0);
    __decorate([
        ViewChild('sharer'),
        __metadata("design:type", Object)
    ], FormulapostPage.prototype, "share", void 0);
    FormulapostPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-formulapost',
            templateUrl: 'formulapost.html'
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, ViewController, Storage, Keyboard, DatePicker, Renderer, NavController, NavParams])
    ], FormulapostPage);
    return FormulapostPage;
}());
export { FormulapostPage };
//# sourceMappingURL=formulapost.js.map