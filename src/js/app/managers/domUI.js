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
    this.currentScene = 0;
    }

    showArrow(){
      this.next.removeClass("hidden");
      this.back.removeClass("hidden");
    }

    showCal(){
      this.appContainer.removeClass("front");
    }

    updateCal(){
      this.year[0].innerHTML = Config.date[this.currentScene].year;
      this.month[0].innerHTML = Config.date[this.currentScene].month;
    }

    removeFirstPage(){
      this.firstpage.fadeOut(400).delay(200).remove();
    }

    updateBg(){
      console.log("update bg" + this.currentScene);
      switch (this.currentScene) {
        case (2):
        this.season.removeClass('season-start').addClass('winter');
            break;
        case (5):
        this.season.removeClass('winter').addClass('spring');
            break;
        case (8):
        this.season.removeClass('spring').addClass('summer');
            break;
        case (10):
        this.season.removeClass('summer').addClass('autumn');
            break;
        case (12):
        this.season.removeClass('autumn').addClass('season-end');
            break;
        default: 
          return;
      }

    }
}
    