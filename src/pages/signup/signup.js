var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { FeedUser } from '../feeduser/feeduser';
import { FeedStylist } from '../feedstylist/feedstylist';
import { SettingsPage } from '../settings/settings';
import { Keyboard } from '@ionic-native/keyboard';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
var SignUpPage = /** @class */ (function () {
    function SignUpPage(loadingController, googlePlus, facebook, storage, afAuth, navCtrl, keyboard, af) {
        this.loadingController = loadingController;
        this.googlePlus = googlePlus;
        this.facebook = facebook;
        this.storage = storage;
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.keyboard = keyboard;
        this.af = af;
        this.user1 = {};
        this.isLoggedIn = false;
        this.bool = false;
        this.boool = false;
    }
    SignUpPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loading_1, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.bool) return [3 /*break*/, 1];
                        loading_1 = this.loadingController.create({ content: "Loading..." });
                        loading_1.present();
                        try {
                            //if(this.stylist) {
                            this.items = this.af.object('/profiles/stylists/' + this.user1.username);
                            this.subscription = this.items.subscribe(function (item) {
                                console.log(JSON.stringify(item) + "        this is the null");
                                console.log(JSON.stringify(_this.user1) + "        this is the user");
                                if (item.username == _this.user1.username) {
                                    //
                                }
                                else {
                                    _this.boool = true;
                                    console.log("turning thisbool true");
                                }
                            });
                            //}
                            //else if(this.users) {
                            this.items3 = this.af.object('/profiles/users/' + this.user1.username);
                            this.subscription3 = this.items3.subscribe(function (item) {
                                console.log(JSON.stringify(item) + "        this is the null");
                                if (item.username == _this.user1.username) {
                                    //
                                }
                                else {
                                    console.log("turning thisbool true");
                                    _this.boool = true;
                                }
                            });
                            //}
                            setTimeout(function () {
                                if (_this.boool) {
                                    if (_this.user1.email && _this.user1.password && _this.user1.username && (_this.stylist || _this.users)) {
                                        console.log('createuserwithemail above 999999');
                                        _this.afAuth.auth.createUserWithEmailAndPassword(_this.user1.email, _this.user1.password).then(function () {
                                            setTimeout(function () {
                                                console.log('createuserwithemail 88888');
                                                loading_1.dismiss();
                                                _this.setUserStylist(_this.user1);
                                            }, 1500);
                                        }).catch(function (e) {
                                            alert(e.message);
                                        });
                                    }
                                    else {
                                        loading_1.dismiss();
                                        alert("You need to fill in all the information");
                                    }
                                }
                                else {
                                    loading_1.dismiss();
                                    alert("This username is taken");
                                }
                            }, 1000);
                        }
                        catch (e) {
                            loading_1.dismiss();
                            alert(e.message);
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(this.email && this.password && (this.stylist || this.users))) return [3 /*break*/, 4];
                        if (!!this.isLoggedIn) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        //console.log(result);
                        if (this.user1.username == null) {
                            this.user1.username = this.username;
                        }
                        this.user1.email = this.email;
                        this.user1.password = this.password;
                        this.setUserStylist(this.user1);
                        return [3 /*break*/, 5];
                    case 4:
                        alert("You need to fill in all the information");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        alert(e_1.message);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SignUpPage.prototype.ngOnDestroy = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        if (this.subscription3 != null) {
            this.subscription3.unsubscribe();
        }
    };
    SignUpPage.prototype.setUserStylist = function (usery) {
        console.log(usery + "           in setuserstylist");
        var profile = { 'username': usery.username, 'password': usery.password,
            'email': usery.email, 'bio': "", 'address': "", 'type': "", 'rating': { 'one': '0', 'two': '0', 'three': '0', 'four': '0', 'five': '0' } };
        if (this.type == 'user' && this.users) {
            alert("You already have a user account");
        }
        else if (this.type == 'stylist' && this.stylist) {
            alert("You already have a stylist account");
        }
        else if (this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
            alert("You already have a user account and a stylist account");
        }
        else {
            if (this.users) {
                profile.type = "user";
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                this.items2 = this.af.object('/profiles/users/' + this.user1.username);
                this.items2.update(profile);
                if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
                    this.storage.set('type', 'user/stylist/user');
                    this.navCtrl.push(SettingsPage, { type: 'user/stylist/user' });
                }
                else {
                    this.storage.set('type', 'user');
                    this.navCtrl.push(SettingsPage, { type: 'user' });
                }
                //TEST SAME USERNAME USER AND STYLIST!!S
            }
            else if (this.stylist) {
                profile.type = "stylist";
                console.log(JSON.stringify(usery) + "     : usery 55555555");
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                console.log("in this.stylist choice");
                this.items2 = this.af.object('/profiles/stylists/' + this.user1.username);
                this.items2.update(profile);
                if (this.type == 'user' || this.type == 'user/stylist/user') {
                    this.storage.set('type', 'user/stylist/stylist');
                    this.navCtrl.push(SettingsPage, { type: 'user/stylist/stylist' });
                }
                else {
                    this.storage.set('type', 'stylist');
                    this.navCtrl.push(SettingsPage, { type: 'stylist' });
                }
            }
            else {
                alert("You need to select User or Stylist.");
            }
        }
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
    };
    SignUpPage.prototype.setUserStylistG = function (usery, email) {
        console.log(email + "           in setuserstylist email");
        var profile = { 'username': usery.username, 'password': usery.password,
            'email': email, 'bio': "", 'address': "", 'type': "", 'rating': { 'one': '0', 'two': '0', 'three': '0', 'four': '0', 'five': '0' } };
        if (this.type == 'user' && this.users) {
            alert("You already have a user account");
        }
        else if (this.type == 'stylist' && this.stylist) {
            alert("You already have a stylist account");
        }
        else if (this.type == 'user/stylist/user' || this.type == 'user/stylist/stylist') {
            alert("You already have a user account and a stylist account");
        }
        else {
            if (this.users) {
                profile.type = "user";
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', email);
                this.items.set(profile);
                if (this.type == 'stylist' || this.type == 'user/stylist/stylist') {
                    this.storage.set('type', 'user/stylist/user');
                    this.navCtrl.push(SettingsPage, { type: 'user/stylist/user' });
                }
                else {
                    this.storage.set('type', 'user');
                    this.navCtrl.push(SettingsPage, { type: 'user' });
                }
            }
            else if (this.stylist) {
                profile.type = "stylist";
                console.log(JSON.stringify(usery) + "     : usery 55555555");
                this.storage.set('username', usery.username);
                this.storage.set('password', usery.password);
                this.storage.set('email', usery.email);
                console.log("in this.stylist choice");
                this.items.set(profile);
                if (this.type == 'user' || this.type == 'user/stylist/user') {
                    this.storage.set('type', 'user/stylist/stylist');
                    this.navCtrl.push(SettingsPage, { type: 'user/stylist/stylist' });
                }
                else {
                    this.storage.set('type', 'stylist');
                    this.navCtrl.push(SettingsPage, { type: 'stylist' });
                }
            }
            else {
                alert("You need to select User or Stylist.");
            }
        }
    };
    SignUpPage.prototype.fbLogin = function (userx) {
        var _this = this;
        if (userx.username == null || userx.password == null) {
            alert("Please enter a username and password");
        }
        else {
            if (this.users || this.stylist) {
                return this.facebook.login(["email"])
                    .then(function (response) {
                    var facebookCredential = firebase.auth.FacebookAuthProvider
                        .credential(response.authResponse.accessToken);
                    firebase.auth().signInWithCredential(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase success: " + JSON.stringify(success));
                        _this.setUserStylistG(userx, success.email);
                    }).catch(function (error) {
                        alert(error.message);
                    });
                }).catch(function (error) { console.log(error); });
            }
            else {
                alert("You need to select user or stylist");
            }
        }
    };
    SignUpPage.prototype.gLogin = function (userx) {
        var _this = this;
        var bool = false;
        var email;
        if (userx.username == null || userx.password == null) {
            alert("Please enter a username and password");
        }
        else {
            this.googlePlus.login({})
                .then(function (res) {
                firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                    .then(function (success) {
                    console.log("Firebase success: " + JSON.stringify(success));
                    bool = true;
                    email = success.email;
                }).catch(function (error) { return console.log("Firebase failure: " + JSON.stringify(error)); });
            }).catch(function (err) { return alert(err.message); });
            setTimeout(function () {
                if (bool) {
                    _this.setUserStylistG(userx, email);
                }
            }, 3000);
        }
    };
    SignUpPage.prototype.ionViewDidLoad = function () {
        //TAKE OUT!!!!!!!!
        //this.storage.set('email', '');
        //this.storage.set('type', '');
        //this.storage.set('password', '');
        var _this = this;
        this.subscription = this.afAuth.authState.subscribe(function (data) {
            if (data != null) {
                if (data.email && data.uid) {
                    console.log("logged in");
                    _this.isLoggedIn = true;
                }
            }
        });
        this.storage.get('type').then(function (val) {
            if (val == null) {
                _this.bool = true;
            }
            else {
                _this.type = val;
            }
        });
        this.storage.get('email').then(function (val) {
            _this.email = val;
        });
        this.storage.get('password').then(function (val) {
            _this.password = val;
        });
        this.storage.get('username').then(function (val) {
            _this.username = val;
        });
    };
    SignUpPage.prototype.pushPage = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        this.navCtrl.push(SignInPage);
    };
    SignUpPage.prototype.goButton = function (code) {
        console.log(code);
        if (code == 13) {
            this.keyboard.close();
        }
    };
    SignUpPage.prototype.selectOneStylist = function () {
        if (this.users) {
            this.users = false;
        }
    };
    SignUpPage.prototype.selectOneUser = function () {
        if (this.stylist) {
            this.stylist = false;
        }
    };
    SignUpPage.prototype.loadNext = function () {
        // push another page on to the navigation stack
        // causing the nav controller to transition to the new page
        // optional data can also be passed to the pushed page.
        if (this.users) {
            this.navCtrl.push(FeedUser);
        }
        if (this.stylist) {
            this.navCtrl.push(FeedStylist);
        }
    };
    SignUpPage = __decorate([
        Component({
            selector: 'page-sign-up',
            templateUrl: 'signup.html'
        }),
        __metadata("design:paramtypes", [LoadingController, GooglePlus, Facebook, Storage, AngularFireAuth, NavController, Keyboard, AngularFireDatabase])
    ], SignUpPage);
    return SignUpPage;
}());
export { SignUpPage };
//# sourceMappingURL=signup.js.map