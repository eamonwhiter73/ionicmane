import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedUser } from '../feeduser/feeduser';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import { CacheService } from 'ionic-cache';



/**
 * Generated class for the FullfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-fullfeed',
  templateUrl: 'fullfeed.html',
})
export class FullfeedPage {
  items = [];
  startAtKey;
  lastKey;
  show = true;
  list: FirebaseListObservable<any>;
  list2: FirebaseListObservable<any>;
  @ViewChild(Content  ) content: Content;
  subscription4: ISubscription;
  subscription3: ISubscription;

  constructor(private cache: CacheService, public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  swipeLeft() {
    this.navCtrl.push(FeedUser,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  ionViewDidLoad() {
    let cacheKey = 'promos';
    let promises_array:Array<any> = [];
    let mapped;
    this.cache.removeItem(cacheKey);

    this.cache.getItem(cacheKey).catch(() => {
      let store = [];
    
      this.list2 = this.af.list('/promos', {
      query: {
        limitToLast: 10
      }});

      this.subscription4 = this.list2.subscribe(items => {
        mapped = items.map((item) => {
          return new Promise((resolve,reject) => {
            let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                       
            storageRef.getDownloadURL().then(url => {
              console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
              item.customMetadata.picURL = url;
              store.push(item.customMetadata);
              resolve();
            }).catch((e) => {
              console.log("in caught url !!!!!!!$$$$$$$!!");
              item.customMetadata.picURL = 'assets/blankprof.png';
              store.push(item.customMetadata);
              resolve();
            });

            
          })
        })

        console.log(JSON.stringify(mapped) + "    mappped things");

        

        this.startAtKey = items[0].$key;
        this.lastKey = this.startAtKey;

        let results = Promise.all(mapped);
        results.then(() => {
        //setTimeout(() => {

          this.items = store.reverse();
          //this.classesListArray.reverse();   
          console.log(JSON.stringify(this.items) + " value value vlaue items");
          return this.cache.saveItem(cacheKey, this.items);
        //}, 3000);
      
        })
      })
    }).then(data => {
      this.items = data;
    })
  }

  gotoProfile() {
    this.navCtrl.push(StylistProfile);
  }

  doInfinite(infiniteScroll) {
    //return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Begin async operation');
      console.log(this.content.directionY + "        upupupupupupu********");
      if(this.content.directionY == 'up') {
        this.show = false
      }
      else {
        this.show = true;
      }

      console.log(this.startAtKey + "     before %%^&^&^% start at");
      this.list = this.af.list('/promos', {
      query: {
        orderByKey: true,
        endAt: this.startAtKey,
        limitToLast: 11
      }});

      this.subscription3 = this.list.subscribe(items => { 
          let x = 0;
          this.lastKey = this.startAtKey;
          items.forEach(item => {


            let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                       
            storageRef.getDownloadURL().then(url => {
              console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
              item.customMetadata.picURL = url;
            }).catch((e) => {
              console.log("in caught url !!!!!!!$$$$$$$!!");
              item.customMetadata.picURL = 'assets/blankprof.png';
            });
            
            if(this.startAtKey !== item.$key && this.lastKey !== item.$key) {
              console.log(this.startAtKey + "   :startatkey before 4444444        item key:     " + item.$key);
              this.items.push(item.customMetadata);
            }

            if(x == 0) {
              this.startAtKey = item.$key;
            }

            x++;
          });          
          
      })

      infiniteScroll.complete(); 
        
      }, 500);

  }

}
