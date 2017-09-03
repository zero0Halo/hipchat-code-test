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
      this.WEBTASK = 'https://wt-7abb8e587f67c0479d2721fbbd244dba-0.run.webtask.io/_getTitle';
      this.results = false;

      this.button.addEventListener('click', function (e) {
        _this.textSubmit();
      });
    }

    _createClass(HipChatter, [{
      key: 'textSubmit',
      value: function textSubmit() {
        var _this2 = this;

        var value = this.input.value;


        if (value.length > 0) {
          this.results = this._resultConstructor();

          this.parseValue(value).then(function () {
            _this2.output.innerText = JSON.stringify(_this2.results, null, '  ');
          });
        }
      }
    }, {
      key: 'parseValue',
      value: function parseValue(value) {
        var _this3 = this;

        var mentionExp = /\@([a-zA-Z0-9_-]*)/g;
        var emoticonExp = /\(([a-zA-Z0-9]*)\)/g;
        var urlExp = /(https?:\/\/[^\s]+)/g;
        var promises = [];
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
          promises.push(this._getTitle(result[1]));
        }

        return new Promise(function (resolve, reject) {

          if (promises.length > 0) {
            Promise.all(promises).then(function (values) {
              _this3.results.links = values;
              console.log(_this3.results, values);
              resolve();
            });
          } else {
            resolve();
          }
        });
      }
    }, {
      key: '_resultConstructor',
      value: function _resultConstructor() {
        return {
          mentions: [],
          emoticons: [],
          links: []
        };
      }
    }, {
      key: '_getTitle',
      value: function _getTitle(url) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          $.post({
            url: _this4.WEBTASK,
            data: { url: url }
          }).then(function (data) {
            resolve(data);
          });
        });
      }
    }]);

    return HipChatter;
  }();

  ;

  var chatterEl = document.querySelector('.chatter');
  var hipChatter = new HipChatter(chatterEl);
})();