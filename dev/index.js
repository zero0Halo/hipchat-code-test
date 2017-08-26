'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var HipChatter = function () {
    function HipChatter(el) {
      _classCallCheck(this, HipChatter);

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

      this.attachEvents();
    }

    _createClass(HipChatter, [{
      key: 'attachEvents',
      value: function attachEvents() {
        var _this = this;

        this.button.addEventListener('click', function (e) {
          var value = _this.input.value;


          if (value.length > 0) {
            _this.parseValue(value);
          }

          _this.output.innerText = JSON.stringify(_this.results, null, '\t');
        });
      }
    }, {
      key: 'parseValue',
      value: function parseValue(value) {
        var mentionExp = /\@([a-zA-Z0-9_-]*)\W/g;
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
          console.log('result', result);
          this.results.links.push(result[1]);
        }
      }
    }]);

    return HipChatter;
  }();

  ;

  var chatterEl = document.querySelector('.chatter');
  var hipChatter = new HipChatter(chatterEl);
})();