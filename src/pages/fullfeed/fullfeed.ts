import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StylistProfile } from '../stylistprofile/stylistprofile';
import { FeedUser } from '../feeduser/feeduser';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';



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
  show;
  list: FirebaseListObservable<any>;
  list2: FirebaseListObservable<any>;
  @ViewChild(Content  ) content: Content;
  subscription4: ISubscription;

  constructor(public af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  swipeLeft() {
    this.navCtrl.push(FeedUser,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  ionViewDidLoad() {
    
    this.list2 = this.af.list('/promos', {
    query: {
      limitToLast: 10
    }});

    let x = 0;
    this.subscription4 = this.list2.subscribe(items => { 
      items.forEach(item => {


        let storageRef = firebase.storage().ref().child('/settings/' + item.customMetadata.username + '/profilepicture.png');
                   
        storageRef.getDownloadURL().then(url => {
          console.log(url + "in download url !!!!!!!!!!!!!!!!!!!!!!!!");
          item.customMetadata.picURL = url;
        }).catch((e) => {
          console.log("in caught url !!!!!!!$$$$$$$!!");
          item.customMetadata.picURL = 'assets/blankprof.png';
        });

        this.items.push(item.customMetadata);



        if(x == 0) {
          this.startAtKey = item.$key;
          this.lastKey = this.startAtKey;
        }
        x++;
      })

      
      this.items.reverse();          
    })
  }

  gotoProfile() {
    this.navCtrl.push(StylistProfile);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    console.log(this.content.directionY + "        upupupupupupu********");
    if(this.content.directionY == 'up') {
      this.show = false
    }
    else {
      this.show = true;
    }


    //return new Promise((resolve, reject) => {
    setTimeout(() => {


      console.log(this.startAtKey + "     before %%^&^&^% start at");
      this.list = this.af.list('/promos', {
      query: {
        orderByKey: true,
        endAt: this.startAtKey,
        limitToLast: 11
      }});

      this.list.subscribe(items => { 
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
