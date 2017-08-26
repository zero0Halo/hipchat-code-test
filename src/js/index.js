(()=>{

  class HipChatter {
    constructor(el){
      this.el = el;
      this.input = el.querySelector('input[type=text]');
      this.button = el.querySelector('button');
      this.output = el.querySelector('.output');

      this.attachEvents();
    }


    attachEvents(){
      this.button.addEventListener('click', e => {

        console.log(this.input.value);
      });
    };


    parseValue(){
      let mentionExp = / /;
      let emoticonExp = / /;
      let urlExp = / /;
    };


  };

  let chatterEl = document.querySelector('.chatter');
  let hipChatter = new HipChatter(chatterEl);

})();

