import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";





@Component({
	selector: 'formula-buy',
  templateUrl: 'formulabuy.html'
})
export class FormulaBuy implements OnDestroy {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;



 constructor(public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
   
 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 ngOnDestroy() {
   
 }

}