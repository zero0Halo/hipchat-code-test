'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require('jquery');

(function () {
  var HipChatter = function () {
    function HipChatter(el) {
      var _this = this;

      _classCallCheck(this, HipChatter);

      this.el = el;
      this.input = el.querySelector('input[type=text]');
      this.button = el.querySelector('button');
      this.output = el.querySelector('.output pre');
      this.EMOTICON_LIMIT = 15;
      this.WEBTASK = 'https://wt-7abb8e587f67c0479d2721fbbd244dba-0.run.webtask.io/getTitle';
      this.results = {
        mentions: [],
        emoticons: [],
        links: []
      };

      this.button.addEventListener('click', function (e) {
        _this.textSubmit();
      });
    }

    _createClass(HipChatter, [{
      key: 'textSubmit',
      value: function textSubmit() {
        var value = this.input.value;


        if (value.length > 0) {
          this.parseValue(value);
          this.output.innerText = JSON.stringify(this.results, null, '\t');
        }
      }
    }, {
      key: 'parseValue',
      value: function parseValue(value) {
        var mentionExp = /\@([a-zA-Z0-9_-]*)/g;
        var emoticonExp = /\(([a-zA-Z0-9]*)\)/g;
        var urlExp = /(https?:\/\/[^\s]+)/g;
        var result = void 0;

        // Loop through any results that match the mentions regex
        while ((result = mentionExp.exec(value)) !== null) {
          this.results.mentions.push(result[1]);
        }

        // Loop through any results that match the emoticons regex
        while ((result = emoticonExp.exec(value)) !== null) {
          // Emoticons of only a certain length are allowed
          if (result[1].length <= this.EMOTICON_LIMIT) {
            this.results.emoticons.push(result[1]);
          }
        }

        while ((result = urlExp.exec(value)) !== null) {
          $.post({
            url: this.WEBTASK,
            data: { url: result[1] },
            success: function success(data) {
              console.log(data);
            }
          });

          console.log(result[1]);

          // this.results.links.push(result[1]);
        }
      }
    }]);

    return HipChatter;
  }();

  ;

  var chatterEl = document.querySelector('.chatter');
  var hipChatter = new HipChatter(chatterEl);
})();