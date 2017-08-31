import { NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, ViewChild, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";




@Component({
	selector: 'rate-popup',
  templateUrl: 'rate.html'
})
export class Rate implements OnDestroy{
  @ViewChild('star1') star1: ElementRef;
  @ViewChild('star2') star2: ElementRef;
  @ViewChild('star3') star3: ElementRef;
  @ViewChild('star4') star4: ElementRef;
  @ViewChild('star5') star5: ElementRef;
  @ViewChild('star1full') starfull1: ElementRef;
  @ViewChild('star2full') starfull2: ElementRef;
  @ViewChild('star3full') starfull3: ElementRef;
  @ViewChild('star4full') starfull4: ElementRef;
  @ViewChild('star5full') starfull5: ElementRef;
  selected = 0;
  items: FirebaseListObservable<any>;
    item: FirebaseObjectObservable<any>;

  username: string;
  subscription: ISubscription;





 constructor(public af: AngularFireDatabase, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {


 }

 ionViewDidLoad() {
 	this.username = this.params.get('user');
 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 star(number) {
   console.log("STAR WENT OFF");
   this.selected = number;
   if(number == 1) {
     console.log('changed element');
     if(this.star1.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
     }
     if(this.starfull1.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
     }
   }
   if(number == 2) {
     if(this.star2.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
     }
     if(this.starfull2.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
     }
   }
   if(number == 3) {
     if(this.star3.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
     }
     if(this.starfull3.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
     }
   }
   if(number == 4) {
     if(this.star4.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
     }
     if(this.starfull4.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');
     }
   }
   if(number == 5) {
     if(this.starfull5.nativeElement.style.display = 'block') {
       this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'block');
     }
     else {
       /*this.renderer.setElementStyle(this.star1.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull1.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star2.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull2.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star3.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull3.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star4.nativeElement, 'display', 'none');
       this.renderer.setElementStyle(this.starfull4.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.star5.nativeElement, 'display', 'block');
       this.renderer.setElementStyle(this.starfull5.nativeElement, 'display', 'none');*/
     }
   }
 }

 ngOnDestroy() {
   //this.subscription.unsubscribe();  
 }

 rate() {
   let added;
   let ratingObject;

     console.log(this.username + "       :::::IJOSDF:IJ:IJ:J I:IJ :::::           " + this.selected);
     this.item = this.af.object('/profiles/stylists/'+this.username);
      this.item.subscribe(snapshot => {
        console.log(JSON.stringify(snapshot));
        let object = snapshot;
        
        if(this.selected == 1) {
          added = object.rating.one;
          added++;
          ratingObject = {'rating': {"one": added, "two":snapshot.rating.two, "three":snapshot.rating.three,
                                        "four":snapshot.rating.four, "five":snapshot.rating.five}};
          
        }
        if(this.selected == 2) {
          added = object.rating.two;
          added++;
          ratingObject = {'rating': {"one": snapshot.rating.one, "two":added, "three":snapshot.rating.three,
                                        "four":snapshot.rating.four, "five":snapshot.rating.five}}
        }
        if(this.selected == 3) {
          added = object.rating.three;
          added++;
          ratingObject = {'rating': {"three": added, "two":snapshot.rating.two, "one":snapshot.rating.one,
                                        "four":snapshot.rating.four, "five":snapshot.rating.five}};
         
        }
        if(this.selected == 4) {
          added = object.rating.four;
          added++;
          ratingObject = {'rating': {"three": snapshot.rating.three, "two":snapshot.rating.two, "one":snapshot.rating.one,
                                        "four":added, "five":snapshot.rating.five}};
        }
        if(this.selected == 5) {
          added = object.rating.five;
          added++;
          ratingObject = {'rating': {"five": added, "two":snapshot.rating.two, "one":snapshot.rating.one,
                                        "four":snapshot.rating.four, "three":snapshot.rating.three}};
          
        }
        //console.log(object.rating[select] +    "          obhjec;ijoa rating   ");
        //added = object.rating.select++;

      
    });
    
    this.item.update(ratingObject);
    this.dismiss();
    

   /*let object = {'username': this.items.username, 'password': this.items.password, 'email': this.items.email,
                 'address': this.items.address, 'bio': this.items.bio, 'price': this.items.price, 'picURL': this.items.picURL,
                 'rating': this.selected}
   this.items.update(this.username, object);*/
 }

}