var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
var Rate = /** @class */ (function () {
    function Rate(af, navCtrl, params, viewCtrl, renderer) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.selected = 0;
    }
    Rate.prototype.ionViewDidLoad = function () {
        this.username = this.params.get('user');
        //this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
        //this.renderer.setText(this.time.nativeElement, this.params.get('time'));
    };
    Rate.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Rate.prototype.star = function (number) {
        console.log("STAR WENT OFF");
        this.selected = number;
        if (number == 1) {
            console.log('changed element');
            if (this.star1.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
            }
            if (this.starfull1.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 2) {
            if (this.star2.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
            }
            if (this.starfull2.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 3) {
            if (this.star3.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
            }
            if (this.starfull3.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 4) {
            if (this.star4.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
            }
            if (this.starfull4.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
            }
        }
        if (number == 5) {
            if (this.starfull5.nativeElement.style.display = 'block') {
                this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'block');
            }
            else {
                /*this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
                this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
                this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');*/
            }
        }
    };
    Rate.prototype.ngOnDestroy = function () {
        //this.subscription.unsubscribe();  
    };
    Rate.prototype.rate = function () {
        var _this = this;
        var added;
        var ratingObject;
        console.log(this.username + "       :::::IJOSDF:IJ:IJ:J I:IJ :::::           " + this.selected);
        this.item = this.af.object('/profiles/stylists/' + this.username);
        this.item.subscribe(function (snapshot) {
            console.log(JSON.stringify(snapshot));
            var object = snapshot;
            if (_this.selected == 1) {
                added = object.rating.one;
                added++;
                ratingObject = { 'rating': { "one": added, "two": snapshot.rating.two, "three": snapshot.rating.three,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 2) {
                added = object.rating.two;
                added++;
                ratingObject = { 'rating': { "one": snapshot.rating.one, "two": added, "three": snapshot.rating.three,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 3) {
                added = object.rating.three;
                added++;
                ratingObject = { 'rating': { "three": added, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": snapshot.rating.four, "five": snapshot.rating.five } };
            }
            if (_this.selected == 4) {
                added = object.rating.four;
                added++;
                ratingObject = { 'rating': { "three": snapshot.rating.three, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": added, "five": snapshot.rating.five } };
            }
            if (_this.selected == 5) {
                added = object.rating.five;
                added++;
                ratingObject = { 'rating': { "five": added, "two": snapshot.rating.two, "one": snapshot.rating.one,
                        "four": snapshot.rating.four, "three": snapshot.rating.three } };
            }
            //console.log(object.rating[select] +    "          obhjec;ijoa rating   ");
            //added = object.rating.select++;
        });
        this.item.update(ratingObject);
        this.dismiss();
        /*let object = {'username': this.items.username, 'password': this.items.password, 'email': this.items.email,
                      'address': this.items.address, 'bio': this.items.bio, 'price': this.items.price, 'picURL': this.items.picURL,
                      'rating': this.selected}
        this.items.update(this.username, object);*/
    };
    __decorate([
        ViewChild('star1'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "star1", void 0);
    __decorate([
        ViewChild('star2'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "star2", void 0);
    __decorate([
        ViewChild('star3'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "star3", void 0);
    __decorate([
        ViewChild('star4'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "star4", void 0);
    __decorate([
        ViewChild('star5'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "star5", void 0);
    __decorate([
        ViewChild('star1full'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "starfull1", void 0);
    __decorate([
        ViewChild('star2full'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "starfull2", void 0);
    __decorate([
        ViewChild('star3full'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "starfull3", void 0);
    __decorate([
        ViewChild('star4full'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "starfull4", void 0);
    __decorate([
        ViewChild('star5full'),
        __metadata("design:type", ElementRef)
    ], Rate.prototype, "starfull5", void 0);
    Rate = __decorate([
        Component({
            selector: 'rate-popup',
            templateUrl: 'rate.html'
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, NavController, NavParams, ViewController, Renderer])
    ], Rate);
    return Rate;
}());
export { Rate };
//# sourceMappingURL=rate.js.map