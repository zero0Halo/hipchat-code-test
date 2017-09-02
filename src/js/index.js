(()=>{

  class HipChatter {
    constructor(el){
      this.el = el;
      this.input = el.querySelector('input[type=text]');
      this.button = el.querySelector('button');
      this.output = el.querySelector('.output pre');
      this.EMOTICON_LIMIT = 15;
      this.results = {
        mentions: [],
        emoticons: [],
        links: []
      };

      this.button.addEventListener('click', e => { this.textSubmit(); });
    }


    textSubmit(){
      var {value} = this.input;

      if(value.length > 0){
        this.parseValue(value);
      }

      this.output.innerText = JSON.stringify(this.results, null, '\t');
    };


    parseValue(value){
      let mentionExp = /\@([a-zA-Z0-9_-]*)/g;
      let emoticonExp = /\(([a-zA-Z0-9]*)\)/g;
      let urlExp = /(https?:\/\/[^\s]+)/g;
      let result;

      // Loop through any results that match the mentions regex
      while( (result = mentionExp.exec(value)) !== null ){ console.log(result);
        this.results.mentions.push(result[1]);
      }

      // Loop through any results that match the emoticons regex
      while( (result = emoticonExp.exec(value)) !== null ){
        // Emoticons of only a certain length are allowed
        if(result[1].length <= this.EMOTICON_LIMIT){
          this.results.emoticons.push(result[1]);
        }
      }

      while( (result = urlExp.exec(value)) !== null ){
        console.log('result', result);
        this.results.links.push(result[1]);
      }

    };


  };

  let chatterEl = document.querySelector('.chatter');
  let hipChatter = new HipChatter(chatterEl);

})();
