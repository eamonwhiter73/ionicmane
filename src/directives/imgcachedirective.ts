import { Directive,
         ElementRef,
         EventEmitter,
         Input,
         Output,
         OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ImgcacheService } from '../services/imgcacheservice';
/**
 * This directive is charge of cache the images and emit a loaded event
 */
@Directive({
  selector: '[lazy-load]'
})
export class LazyLoadDirective implements OnInit, OnDestroy {
@Input('inputSrc') src ='';
@Output() loaded = new EventEmitter();
public loadEvent: any;
public errorEvent: any;
constructor(public el: ElementRef,
              public imgCacheService: ImgcacheService,
              public renderer: Renderer2) {}
ngOnInit() {
    // get img element
    setTimeout(() => {
      const nativeElement = this.el.nativeElement;
      console.log("in init of lazy load ***&&&&&   " + this.el.nativeElement.getAttribute("src"));
      if(nativeElement.src == "") {
        console.log("inside if it equals nothing %%%%%%%%%");
      }
      else {
        const render = this.renderer;
        // add load listener
        this.loadEvent = render.listen(nativeElement, 'load', () => {
          render.addClass(nativeElement, 'loaded');
          this.loaded.emit();
        });
        this.errorEvent = render.listen(nativeElement, 'error', () => {
          nativeElement.remove();
        });
        // cache img and set the src to the img
        this.imgCacheService.cacheImg(nativeElement.getAttribute("src")).then((value) => {
          console.log('inside promise for cacheImg *&*^T&^&^&%^%^%^&');
          render.setAttribute(nativeElement, 'src', value);
        });
      }
    }, 4000)
  }

ngOnDestroy() {
    // remove listeners
    this.loadEvent();
    this.errorEvent();
  }
}