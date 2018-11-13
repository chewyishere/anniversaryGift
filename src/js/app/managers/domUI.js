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
    this.bubblePos = $('#page-bubbles');
    this.season = $('.snow');
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

    updateBubblePos(Pos){
      this.bubblePos.css({top: Pos.x, left: Pos.y});
    }

    updateBg(num){
      console.log("updating bg");
      console.log(num);
      if (num === 2) {
        this.season.removeClass('season-start').addClass('winter');
      }

      if (num === 5) {
        this.season.removeClass('winter').addClass('spring');
      }

      if (num === 8){
        this.season.removeClass('spring').addClass('summer');
      }

      if(num === 10){
        this.season.removeClass('summer').addClass('autumn');
      }

      if(num === 12){
        this.season.removeClass('autumn').addClass('season-end');
  
      }
      else {
        return;
      }

    }
}
    