import Config from '../../data/config';
import $ from "jquery";

// Manages all dat.GUI interactions
export default class domUI {
  constructor() {
    this.next = $("#nav-arrow-right");
    this.back = $("#nav-arrow-left");
    this.loginField = $(".inputArea");
    this.start = $("#btn-start");
    this.firstpage = $("#firstpage");
    this.year = $("#cal-year");
    this.month = $("#cal-month");
    this.bubbleText = $("#bubble-text");
    this.textContainer= $("#bubble-text-wrapper");
    this.appContainer = $("#appContainer");
    }

    showArrow(){
      this.next.removeClass("hidden");
      this.back.removeClass("hidden");
    }

    showDebug(){
      this.appContainer.toggleClass("front");
    }

    removeFirstPage(){
      this.firstpage.fadeOut(400).delay(200).remove();
    }

}
    