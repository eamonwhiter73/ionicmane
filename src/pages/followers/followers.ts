import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { ISubscription } from "rxjs/Subscription";
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
@IonicPage()
@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage implements OnDestroy{
  follow: FirebaseListObservable<any>;
  followlist: FirebaseObjectObservable<any>;
  getActualFollow: FirebaseObjectObservable<any>;
  subscription: ISubscription;
  subscription2: ISubscription;
  subscription3: ISubscription;
  followers = [];
  followersList = [];
  sendBio;
  userPhone;


  constructor(private callNumber: CallNumber, public geolocation: Geolocation, public storage: Storage, public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidUnload() {
    //this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersPage');
    this.storage.get('username').then((val) => {
    	console.log('in storage');
    	this.follow = this.af.list('/profiles/stylists/' + val + "/followers");
	    this.subscription = this.follow.subscribe(items => items.forEach(item => {
	    	console.log(JSON.stringify(item) + "    type followers");
	    	this.followlist = this.af.object('/profiles/users/'+Object.keys(item)[0]);

	        this.subscription2 = this.followlist.subscribe(item1 => {
            this.sendBio = item1.bio;

	        	console.log('inside subscribe   ' + JSON.stringify(item1));
	        	if(item1.picURL == null) {
	        		item1.picURL = 'assets/blankprof.png'
	        	}
	        	
	        	this.geolocation.getCurrentPosition().then((resp) => { 
	        		if(item1.location != null) {
	        			let rr = this.round(this.distance(item1.location.latitude, item1.location.longitude, resp.coords.latitude, resp.coords.longitude, "M"), 1);
	        			item1.distanceFrom = rr;
	        		}
	        	});

	        	this.followers.push(item1);
		    });
	    }));
    })

  }

  distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  round(number, precision) {
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  ngOnDestroy() {
  	if(this.subscription != null) {
  		this.subscription.unsubscribe();
  	}
  	if(this.subscription2 != null) {
  		this.subscription2.unsubscribe();
  	}
  }

  swipeLeft() {
    this.navCtrl.popToRoot({animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  makePhoneCall(userPhone) {
    this.userPhone = userPhone;
  	this.callNumber.callNumber(userPhone, true)
	  .then(() => console.log('Launched dialer!'))
	  .catch(() => console.log('Error launching dialer'));
  }

  goToProfile(username) {
  	this.navCtrl.push(UserviewuserprofilePage, {'username':username, 'bio':this.sendBio, 'phone':this.userPhone});
  }

}
