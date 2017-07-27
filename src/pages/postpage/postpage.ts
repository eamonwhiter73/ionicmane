import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PostpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-postpage',
  templateUrl: 'postpage.html',
})
export class PostpagePage {
	@ViewChild('imagey') image:ElementRef;
 	imageHolder;

  constructor(public myrenderer: Renderer, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.imageHolder = this.navParams.get("path");
    this.myrenderer.setElementAttribute(this.image.nativeElement, 'src', this.imageHolder);
    console.log(JSON.stringify(this.image));
  }

  pushPage(){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    //this.navCtrl.push(SignUpPage);
  }

}
