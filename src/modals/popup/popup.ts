import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer } from '@angular/core';
import { UserProfile } from '../../pages/userprofile/userprofile';


@Component({
	selector: 'pop-up',
  templateUrl: 'popup.html'
})
export class PopUp {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;
  info = {'salon':'','time':''};


 constructor(public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   console.log('salon', this.params.get('salon'));
   console.log('time', this.params.get('time'));

  this.info.salon = this.params.get('salon');
 	this.info.time = this.params.get('time');

 }

 ionViewDidLoad() {
 	
 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 viewProfile() {

  this.dismiss();
  this.appCtrl.getRootNav().push(UserProfile, {
      username: this.info.salon
  })
 	
 }

}