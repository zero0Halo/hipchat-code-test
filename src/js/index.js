let $ = require('jquery');

(()=>{

  class HipChatter {
    constructor(el){
      this.el = el;
      this.input = el.querySelector('input[type=text]');
      this.button = el.querySelector('button');
      this.output = el.querySelector('.output pre');
      this.EMOTICON_LIMIT = 15;
      this.WEBTASK = 'https://wt-7abb8e587f67c0479d2721fbbd244dba-0.run.webtask.io/getTitle';
      this.results = false;

      this.button.addEventListener('click', e => { this.textSubmit(); });
    }




    textSubmit(){
      var {value} = this.input;

      if(value.length > 0){
        this.results = this._resultConstructor();

        this.parseValue(value).then( () =>{
          this.output.innerText = JSON.stringify(this.results, null, '  ');
        });
      }
    };


    parseValue(value){
      let mentionExp = /\@([a-zA-Z0-9_-]*)/g;
      let emoticonExp = /\(([a-zA-Z0-9]*)\)/g;
      let urlExp = /(https?:\/\/[^\s]+)/g;
      let promises = [];
      let result;

      // Loop through any results that match the mentions regex
      while( (result = mentionExp.exec(value)) !== null ){
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
        promises.push( this._getTitle(result[1]) );
      }

      return new Promise( (resolve, reject) =>{

        if(promises.length > 0){
          Promise.all(promises).then( values => {
            this.results.links = values;
            console.log(this.results, values);
            resolve();
          });
        } else {
          resolve();
        }
      });

    };


    _resultConstructor() {
      return {
        mentions: [],
        emoticons: [],
        links: []
      };
    };


    _getTitle(url) {
      return new Promise( (resolve, reject) => {
        $.post({
          url: this.WEBTASK,
          data: { url },
        }).then( data => {
          resolve(data);
        });
      });
    };


  };


  let chatterEl = document.querySelector('.chatter');
  let hipChatter = new HipChatter(chatterEl);

})();
