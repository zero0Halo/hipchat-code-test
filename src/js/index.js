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
      this.MENTION_EXPR = /\@([a-zA-Z0-9_-]*)/g;
      this.EMOTICON_EXPR = /\(([a-zA-Z0-9]*)\)/g;
      this.URL_EXPR = /(https?:\/\/[^\s]+)/g;
      this.results = false;

      this.button.addEventListener('click', e => { this.textSubmit(); });
    }



    /**
     * [textSubmit Submits user text for value parsing and assigning results]
     */
      textSubmit(){
        var {value} = this.input;

        // Make sure there is something in the input field
        if(value.length > 0){

          // Wipes out previous results and creates the structure for new results
          this.results = this._resultConstructor();

          // Send the value to be parsed.
          // When complete, assigns the results to the output box in the UI
          this.parseValue(value).then( () =>{
            this.output.innerText = JSON.stringify(this.results, null, '  ');
          });
        }
      };



    /**
     * [parseValue Parses the submitted value against regex's for mentions, emoticons and urls]
     * @param  {[string]} value [The value from the text input]
     * @return {[promise]}       [A resolved promise]
     */
      parseValue(value){
        let promises = [];
        let result;

        // Loop through any results that match the mentions regex and push them to results
        while( (result = this.MENTION_EXPR.exec(value)) !== null ){
          this.results.mentions.push(result[1]);
        }

        // Loop through any results that match the emoticons regex and push them to results
        while( (result = this.EMOTICON_EXPR.exec(value)) !== null ){

          // Emoticons of only a certain length are allowed
          if(result[1].length <= this.EMOTICON_LIMIT){
            this.results.emoticons.push(result[1]);
          }
        }

        // Loop through any results that match the url regex and push them to the promises array
        while( (result = this.URL_EXPR.exec(value)) !== null ){

          // Calls the _getTitle helper method and passes it the result. This is a promise.
          promises.push( this._getTitle(result[1]) );
        }

        // If there are promsies, that means that the response is now asynchronous.
        // To account for if there are no promises in the promises array, this promise is immediately resolved.
        return new Promise( (resolve, reject) =>{
          if(promises.length > 0){

            // There could be multiple urls/promises, so have to wait for them to all be resolved.
            // Once done, assign the result of the promises to the results and resolve.
            Promise.all(promises).then( values => {
              this.results.links = values;
              resolve();
            });
          } else {
            resolve();
          }
        });
      };



    /**
     * [_resultConstructor Helper method. Returns an object that is the format for the results]
     * @return {[obj]} [^]
     */
      _resultConstructor() {
        return {
          mentions: [],
          emoticons: [],
          links: []
        };
      };



    /**
     * [_getTitle Helper method. Uses jquery post method to call a webtask I created to get a website's title]
     * @param  {[string]} url [A website url]
     * @return {[promise]}     [A resolved promise with the data returned from the webtask]
     */
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


  // The element to which I will apply this HipChatter class to
  let chatterEl = document.querySelector('.chatter');

  // Instantiating an instance of HipChatter with the above dom element
  let hipChatter = new HipChatter(chatterEl);

})();
