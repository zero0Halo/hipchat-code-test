'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require('jquery');
require("babel-polyfill");

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
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
          var _this2 = this;

          var mentionExp, emoticonExp, urlExp, result, getTitle;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  mentionExp = /\@([a-zA-Z0-9_-]*)/g;
                  emoticonExp = /\(([a-zA-Z0-9]*)\)/g;
                  urlExp = /(https?:\/\/[^\s]+)/g;
                  result = void 0;

                  getTitle = function getTitle(url) {
                    return $.post({
                      url: _this2.WEBTASK,
                      data: { url: result[1] }
                    }).then(function (data) {
                      return data;
                    });
                  };

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

                case 7:
                  if (!((result = urlExp.exec(value)) !== null)) {
                    _context.next = 15;
                    break;
                  }

                  _context.t0 = console;
                  _context.next = 11;
                  return getTitle(result[1]);

                case 11:
                  _context.t1 = _context.sent;

                  _context.t0.log.call(_context.t0, _context.t1);

                  _context.next = 7;
                  break;

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function parseValue(_x) {
          return _ref.apply(this, arguments);
        }

        return parseValue;
      }()
    }]);

    return HipChatter;
  }();

  ;

  var chatterEl = document.querySelector('.chatter');
  var hipChatter = new HipChatter(chatterEl);
})();