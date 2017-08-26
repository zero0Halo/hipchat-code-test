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
      this.output = el.querySelector('.output');

      this.attachEvents();
    }

    _createClass(HipChatter, [{
      key: 'attachEvents',
      value: function attachEvents() {
        var _this = this;

        this.button.addEventListener('click', function (e) {

          console.log(_this.input.value);
        });
      }
    }, {
      key: 'parseValue',
      value: function parseValue() {
        var mentionExp = / /;
        var emoticonExp = / /;
        var urlExp = / /;
      }
    }]);

    return HipChatter;
  }();

  ;

  var chatterEl = document.querySelector('.chatter');
  var hipChatter = new HipChatter(chatterEl);
})();