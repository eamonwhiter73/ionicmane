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
import { PostpagePage } from '../pages/postpage/postpage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StylistProfile } from '../pages/stylistprofile/stylistprofile';
import { BookingPage } from '../pages/booking/booking';
import { SettingsPage } from '../pages/settings/settings';
import { UserProfile } from '../pages/userprofile/userprofile';
import { UserBooking } from '../pages/userbooking/userbooking';



import { NgCalendarModule } from 'ionic2-calendar';

import { Keyboard } from '@ionic-native/keyboard';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { CameraService } from '../services/cameraservice';
import { CameraServicePost } from '../services/cameraservicepost';
import { CameraServiceProfile } from '../services/cameraserviceprofile';


import { HttpModule } from '@angular/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImageViewerController } from 'ionic-img-viewer';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'

import { PopUp } from '../modals/popup/popup';
import { Rate } from '../modals/rate/rate'
import { IonicImageLoader } from 'ionic-image-loader';
import { DatePicker } from '@ionic-native/date-picker';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Auth } from '@ionic/cloud-angular';








import * as firebase from 'firebase';



//import { Ng2ImgMaxModule } from 'ng2-img-max'; // <-- import the module





export const firebaseConfig = {
  apiKey: "AIzaSyC1pFZzY3w0zT7hB2hcc6zhLwYgaK0MhvQ",
  authDomain: "mane-4152c.firebaseapp.com",
  databaseURL: "https://mane-4152c.firebaseio.com",
  projectId: "mane-4152c",
  storageBucket: "mane-4152c.appspot.com",
  messagingSenderId: "446057524325"
}

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    FeedStylist,
    FeedUser,
    StylistProfile,
    PostpagePage,
    BookingPage,
    UserBooking,
    PopUp,
    SettingsPage,
    UserProfile,
    Rate
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgCalendarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader
    //Ng2ImgMaxModule
    /*CalendarModule.forRoot()*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    SignUpPage,
    FeedStylist,
    FeedUser,
    StylistProfile,
    PostpagePage,
    BookingPage,
    PopUp,
    Rate,
    SettingsPage,
    UserProfile,
    UserBooking
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard,
    Camera,
    CameraService,
    CameraServicePost,
    CameraServiceProfile,
    Transfer,
    Crop,
    File,
    ImageViewerController,
    Facebook,
    GooglePlus,
    DatePicker,
    NativeGeocoder,
    Geolocation,
    Diagnostic,
    LocationAccuracy,
  ]
})
export class AppModule {}
