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
    this.loader = $("#loader");
    this.bubblePos = $('#page-bubbles');
    this.season = $('.snow');
    this.instruction = $('#instruction');
    this.currentScene = null;
    }

    showArrow(){
      if (this.currentScene !== 13){
        this.next.removeClass("fadeOut");
      }
      if  (this.currentScene !== 0){
        this.back.removeClass("fadeOut");
      }
    }

    hideArrow(){
      this.next.addClass("fadeOut");
      this.back.addClass("fadeOut");
    }

    startScene(){
      this.firstpage.fadeOut(400).delay(200).remove();
      this.appContainer.removeClass("front");
      this.instruction.removeClass("fadeOut");
    }

    updateCal(){
      this.year[0].innerHTML = Config.date[this.currentScene].year;
      this.month[0].innerHTML = Config.date[this.currentScene].month;
    }

    doneLoading(){
      this.loader.delay(100).fadeOut(400);
      this.loginField.delay(800).removeClass("fadeOut");
    }

    updateBg(){
      console.log("update bg" + this.currentScene);
      switch (this.currentScene) {
        case (1):
        this.season.removeClass('winter').addClass('season-start');
            break
        case (2):
        this.season.removeClass('season-start').addClass('winter');
            break;
        case (4):
        this.season.removeClass('spring').addClass('winter');
                break;
        case (5):
        this.season.removeClass('winter').addClass('spring');
            break;
        case (7):
        this.season.removeClass('summer').addClass('spring');
                break;
        case (8):
        this.season.removeClass('spring').addClass('summer');
            break;
        case (9):
        this.season.removeClass('autumn').addClass('summer');
         break;
        case (10):
        this.season.removeClass('summer').addClass('autumn');
            break;
        case (11):
        this.season.removeClass('season-end').addClass('autumn');
            break;
        case (12):
        this.season.removeClass('ending').removeClass('autumn').addClass('season-end');
        break;
        case (13):
        this.season.removeClass('seadson-end').addClass('ending');
        break;
        

        default: 
          return;
      }

    }
}
    