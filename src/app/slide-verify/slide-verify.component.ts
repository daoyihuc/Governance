import {Component, OnInit, ElementRef, AfterViewInit, Input, OnDestroy, HostListener} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'com-slide-verify',
  templateUrl: './slide-verify.component.html',
  styleUrls: ['./slide-verify.component.less']
})
export class SlideVerifyComponent implements OnInit, AfterViewInit, OnDestroy {

  private slideFinishState: boolean = false;

  @Input() initText: string;
  @Input() sucessText: string;

  private $documentMousemove: Subscription = null;
  private $documentMouseup: Subscription = null;
  private $documentMouseupIn: Subscription = null;
  private $slideBtnMousedown: Subscription = null;
  private $slideBtnTouchstart: Subscription = null;
  private $slideBtnTouchmove: Subscription = null;
  private $slideBtnTouchend: Subscription = null;

  private touchX: number = 0;

  private animateDuration: number = 500;
  private isAnimate: boolean = false;

  slideBtnStyle = {
    left: "0",
  }
  slideProStyle = {
    width: "0",
  }
  slideSuccessMessageStyle = {
    display: "none",
  }

  eleID: string = "verify-wrap-" + new Date().getTime();
  slideBtnID: string = "drag-btn-" + new Date().getTime();
  slideProEleID: string = "drag-progress-" + new Date().getTime();
  slideFixTipsEleID: string = "fix-tips-" + new Date().getTime();
  slideSucMsgEleID: string = "verify-msg-" + new Date().getTime();
  private ele: HTMLDivElement;
  private slideBtn: HTMLDivElement;
  private slideProEle: HTMLDivElement;
  private slideFixTipsEle: HTMLDivElement;
  private slideSucMsgEle: HTMLDivElement;

  constructor(
    private element: ElementRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initEle();
    this.mousedown();
    this.mouseup();
    this.touchstart();
    this.touchmove();
    this.touchend();
  }

  ngOnDestroy(): void {
    this.removeAlllistener();
  }

  private initEle(): void {
    this.ele = this.element.nativeElement.querySelector(`#${this.eleID}`);
    this.slideBtn = this.element.nativeElement.querySelector(`#${this.slideBtnID}`);
    this.slideProEle = this.element.nativeElement.querySelector(`#${this.slideProEleID}`);
    this.slideFixTipsEle = this.element.nativeElement.querySelector(`#${this.slideFixTipsEleID}`);
    this.slideSucMsgEle = this.element.nativeElement.querySelector(`#${this.slideSucMsgEleID}`);
  }

  private getDragBtnWidth(): number {
    return this.slideBtn.offsetWidth;
  }

  private getDragWrapWidth(): number {
    return this.ele.offsetWidth;
  }

  private calSlideWidth(): number {
    return this.getDragWrapWidth() - this.getDragBtnWidth()
  }

  private getDragBtnLeft(): number {
    return this.slideBtn.offsetLeft;
  }

  private getSlideProWidth(): number {
    return this.slideProEle.offsetLeft;
  }

  private ifSlideRight(): boolean {
    if (this.getDragBtnLeft() == this.calSlideWidth()) {
      return true;
    } else {
      return false;
    }
  }

  private setDragBtnLeftStyle(left: string): void {
    this.slideBtnStyle.left = left;
  }

  private setDragProWidthStyle(width: string): void {
    this.slideProStyle.width = width;
  }

  private successStyle(): void {
    this.slideSuccessMessageStyle.display = "block";
    this.slideBtn.classList.add("suc-drag-btn");
  }

  private cancelMouseMove(): void {
    if (this.$documentMousemove) {
      this.$documentMousemove.unsubscribe();
    }
  }

  private cancelTouchmove(): void {
    if (this.$slideBtnTouchmove) {
      this.$slideBtnTouchmove.unsubscribe();
    }
  }

  private removeAlllistener(): void {
    this.$documentMousemove && this.$documentMousemove.unsubscribe();
    this.$documentMouseup && this.$documentMouseup.unsubscribe();
    this.$documentMouseupIn && this.$documentMouseupIn.unsubscribe();
    this.$slideBtnMousedown && this.$slideBtnMousedown.unsubscribe();
    this.$slideBtnTouchstart && this.$slideBtnTouchstart.unsubscribe();
    this.$slideBtnTouchmove && this.$slideBtnTouchmove.unsubscribe();
    this.$slideBtnTouchend && this.$slideBtnTouchend.unsubscribe();
  }

  private failAnimate(): void {
    if (this.getDragBtnLeft() == 0 && this.getSlideProWidth() == 0) {
      return;
    }
    this.slideBtn.animate([
      {left: this.getDragBtnLeft() + "px"}, {left: "0"}
    ], {
      duration: this.animateDuration, easing: 'ease'
    });
    this.slideProEle.animate([
      {width: this.slideProStyle.width}, {width: "0"}
    ], {
      duration: this.animateDuration, easing: "ease"
    });
    this.slideBtnStyle.left = 0 + "px";
    this.slideProStyle.width = 0 + "px";
    this.isAnimate = true;
    setTimeout(() => {
      this.isAnimate = false;
    }, this.animateDuration);
  }

  public isVerified(): boolean {
    return this.slideFinishState;
  }

  public resetVerify(): void {
    this.slideSuccessMessageStyle.display = "none";
    this.slideBtn.classList.remove("suc-drag-btn");
    this.slideFinishState = false;
    this.slideProStyle.width = "0";
    this.slideBtnStyle.left = "0";
    this.touchmove();
  }

  private mousedown() {
    this.$slideBtnMousedown = fromEvent(this.slideBtn, 'mousedown').subscribe((e: any) => {
      let distenceX = e.pageX;
      e.preventDefault();
      if (this.ifSlideRight() || this.isAnimate) {
        return;
      }
      this.$documentMousemove = fromEvent(window, 'mousemove').subscribe((e: any) => {
        let curX = e.pageX - distenceX;
        let maxSlideWid = this.calSlideWidth();
        if (curX >= maxSlideWid) {
          this.setDragBtnLeftStyle(maxSlideWid + "px");
          this.setDragProWidthStyle(maxSlideWid + "px");
          this.cancelMouseMove();
          this.slideFinishState = true;
          this.successStyle();
        } else if (curX <= 0) {
          this.setDragBtnLeftStyle('0');
          this.setDragProWidthStyle('0');
        } else {
          this.setDragBtnLeftStyle(curX + "px");
          this.setDragProWidthStyle(curX + "px");
        }
      });
      this.$documentMouseupIn = fromEvent(document, 'mouseup').subscribe((e: any) => {
        this.cancelMouseMove();
        this.$documentMouseupIn.unsubscribe();
      });
    });
  }

  private mouseup() {
    this.$documentMouseup = fromEvent(document, 'mouseup').subscribe((e: any) => {
      if (this.ifSlideRight()) {
        this.cancelMouseMove();
        return;
      } else {
        this.failAnimate();
      }
    })
  }

  private touchstart() {
    this.$slideBtnTouchstart = fromEvent(this.slideBtn, 'touchstart').subscribe((e: any) => {
      this.touchX = e.targetTouches[0].pageX;
      if (this.ifSlideRight() || this.isAnimate) {
        // this.cancelTouchmove();
        return;
      }
    });
  }

  private touchmove() {
    this.$slideBtnTouchmove = fromEvent(this.slideBtn, 'touchmove').subscribe((e: any) => {
      e.preventDefault();
      let curX = e.targetTouches[0].pageX - this.touchX;
      let maxSlideWid = this.calSlideWidth();
      if (curX >= maxSlideWid) {
        this.setDragBtnLeftStyle(maxSlideWid + "px");
        this.setDragProWidthStyle(maxSlideWid + "px");
        this.cancelTouchmove();
        this.successStyle();
        this.slideFinishState = true;
      } else if (curX <= 0) {
        this.setDragBtnLeftStyle('0');
        this.setDragProWidthStyle('0');
      } else {
        this.setDragBtnLeftStyle(curX + "px");
        this.setDragProWidthStyle(curX + "px");
      }
    });
  }

  private touchend() {
    this.$slideBtnTouchend = fromEvent(this.slideBtn, 'touchend').subscribe((e: any) => {
      if (this.ifSlideRight()) {
        this.cancelTouchmove();
        return false;
      } else {
        this.failAnimate();
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  private sliderAutoSizeListener() {
    if (this.slideFinishState) {
      this.setDragProWidthStyle(this.calSlideWidth() + "px");
      this.setDragBtnLeftStyle(this.calSlideWidth() + "px");
    }
  }

}
