import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { FeedStylist } from '../pages/feedstylist/feedstylist';
import { FeedUser } from '../pages/feeduser/feeduser';
import { StylistProfile } from '../pages/stylistprofile/stylistprofile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Keyboard } from '@ionic-native/keyboard';




@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    FeedStylist,
    FeedUser,
    StylistProfile
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule
    /*CalendarModule.forRoot()*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    FeedStylist,
    FeedUser,
    StylistProfile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard
  ]
})
export class AppModule {}
