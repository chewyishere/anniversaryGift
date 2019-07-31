import Config from "../../data/config";
import anime from "animejs";
import DomUI from "../managers/domUI";

// Manages all input interactions
export default class Bubbles {
  constructor() {
    this.domUI = new DomUI();
    this.textContainer = this.domUI.textContainer;
    this.animStarted = false;
    this.dialogCompleted = true;
    this.textLines = Config.chat[0];
    this.hasfirstPage = false;
    this.onPage = 0;
    this.currentScene = 0;

    this.bubbleAnime = anime.timeline({
      autoplay: false,
      begin: () => {
        (this.animStarted = true), (this.dialogCompleted = false);
        this.textContainer.empty();
      },
      complete: () => {
        this.animStarted = false;
        this.addText();
      }
    });

    this.bubbleAnime
      .add({
        targets: "#chat-bubble-wrapper",
        opacity: 1,
        duration: 200,
        autoplay: false
      })
      .add({
        targets: "#chat-bubble",
        opacity: 1,
        duration: 200,
        offset: 1
      })
      .add({
        targets: "#bubble",
        width: [0, 430],
        duration: 500,
        offset: 1
      })
      .add({
        targets: "#bubble-text-wrapper",
        opacity: 1,
        duration: 150,
        autoplay: false
      });
  }

  showText() {
    if (!this.animStarted) {
      this.bubbleAnime.restart();
    }
  }

  bubbleComplete() {
    this.textContainer.fadeOut(300);
    this.bubbleAnime.play();
    this.bubbleAnime.reverse();
  }

  forceStop() {
    if (this.bubbleAnime.currentTime > 0) {
      this.bubbleComplete();
      this.reset();
    }
  }

  reset() {
    if (this.currentScene !== 0) {
      this.animStarted = false;
    }
    this.dialogCompleted = true;
    this.hasfirstPage = false;
    this.onPage = 0;
    this.textContainer.empty();
  }

  addText() {
    this.textContainer.empty();
    this.textContainer.fadeIn(200);
    this.textLines = Config.chat[this.currentScene];

    this.hasfirstPage =
      this.textLines.length > 6 && this.onPage == 0 ? true : false;
    var lines;

    if (this.onPage == 0) {
      lines = this.textLines.slice(0, 6);
    }
    if (this.onPage == 1) {
      lines = this.textLines.slice(6, 12);
    }

    lines.forEach(el => {
      this.textContainer.append("<span>" + el + "</span>");
    });

    this.textAnime = anime.timeline({
      autoplay: false,
      complete: () => {
        var _this = this;

        if (this.hasfirstPage && !this.dialogCompleted) {
          this.onPage = 1;
          this.hasfirstPage = false;
          _this.textContainer.delay(1000).fadeOut(300);
          setTimeout(this.addText.bind(_this), 1500);
        } else {
          this.dialogCompleted = true;
          if (this.currentScene === 0) {
            this.domUI.showArrow();
          }
        }
      }
    });

    this.textAnime.add({
      targets: "#bubble-text-wrapper span",
      opacity: 1,
      duration: 400,
      easing: "linear",
      delay: function(el, i, l) {
        return i * 1000;
      }
    });

    this.textAnime.play();
  }
}
