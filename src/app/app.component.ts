import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { FeedStylist } from '../pages/feedstylist/feedstylist';
import { FeedUser } from '../pages/feeduser/feeduser';
import { StylistProfile } from '../pages/stylistprofile/stylistprofile';
import { PostpagePage } from '../pages/postpage/postpage';
import { BookingPage } from '../pages/booking/booking';
import { UserBooking } from '../pages/userbooking/userbooking';
import { UserProfile } from '../pages/userprofile/userprofile';
import { UserViewProfile } from '../pages/userviewprofile/userviewprofile';
import { FollowersPage } from '../pages/followers/followers';
import { SettingsPage } from '../pages/settings/settings';
import { FullfeedPage } from '../pages/fullfeed/fullfeed';
import { FormulapostPage } from '../pages/formulapost/formulapost';
import { CacheService } from "ionic-cache";

import { MapPage } from '../pages/map/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FeedUser;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, private screenOrientation: ScreenOrientation) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.styleBlackOpaque();
      statusBar.backgroundColorByName('black');
      statusBar.overlaysWebView(false);
      statusBar.isVisible;
      splashScreen.hide();
      cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour
    });
  }
}