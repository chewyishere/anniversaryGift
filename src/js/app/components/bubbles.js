import Config from '../../data/config';
import anime from 'animejs';
import DomUI from '../managers/domUI';

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

        this.bubbleAnime = anime.timeline({
            autoplay: false,
            begin: () => { 
                this.animStarted = true,
                this.dialogCompleted = false
                this.textContainer.empty();
            },
            complete: () => {
                this.animStarted = false;
                this.addText();
            }
        });

        this.bubbleAnime
            .add({
                targets: '#chat-bubble-wrapper',
                opacity: 1,
                duration: 300,
                autoplay: false,
            })
            .add({
                targets: '#chat-bubble',
                opacity: 1,
                duration: 300,
                offset: 1
                
            })
            .add({
                targets: '#bubble',
                width: [0, 400],
                duration: 1000,
                offset: 1
            })
            .add({
                targets: '#bubble-text-wrapper',
                opacity: 1,
                duration: 400,
                autoplay: false
            })
    }

    showText() {
     if(!this.animeStarted){
            console.log("start talking");
            this.bubbleAnime.restart();
        }
    };

    bubbleComplete(){
        this.textContainer.fadeOut(400);
        this.bubbleAnime.play();
        this.bubbleAnime.reverse();

    }

    forceStop(){

     if(this.bubbleAnime.currentTime == 0){
        this.animeStarted = true;
        }else{
            this.bubbleComplete();
        }

    }

    reset(){
        this.animeStarted = false;
        this.dialogCompleted = true;
        this.hasfirstPage = false;
        this.onPage = 0;

    }

    addText() {
        console.log("add text");
        this.textContainer.empty();
        this.textContainer.fadeIn(400);

        this.hasfirstPage = (this.textLines.length > 5 && this.onPage == 0) ? true : false;
        var lines;

        if(this.onPage == 0){
            lines = this.textLines.slice((0),(5));

        }
        if (this.onPage == 1){
            lines = this.textLines.slice((5),(9));
        }
            

        lines.forEach((el) => {
            this.textContainer.append("<span>" + el + "</span>");
        });

        this.textAnime = anime.timeline({
            autoplay: false,
            complete: () => {
                 var _this = this;

                if(this.hasfirstPage && !this.dialogCompleted){
                    this.onPage = 1;
                    this.hasfirstPage = false;
                    _this.textContainer.delay(400).fadeOut(400);
                    setTimeout(this.addText.bind(_this),1000);

                } else {
                    this.domUI.showArrow();
                    this.dialogCompleted = true;
                }
            }
        });



       this.textAnime.add({
           targets: "#bubble-text-wrapper span",
           opacity: 1,
           duration: 600,
           easing: 'linear',
           delay: function (el, i, l) {
               return i * 1000;
           }
       })

       this.textAnime.play();
    
    };

}