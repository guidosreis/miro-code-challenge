(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EmailsInput = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * @param {Element|HTMLDocument|Window} element
   * @param {Object|undefined} options
   * @returns {Object|undefined}
   */

  var EmailsInput = function EmailsInput(element, options) {
    if (element.tagName !== 'DIV') {
      return;
    }

    var defaults = {
      placeholder: 'add...'
    };
    var plugin = {
      wrapperClassname: 'emails-block',
      inputClassname: 'emails-input',
      emailBlockClassname: 'email-block',
      emailBlockTextClassname: 'email-block__text',
      emailBlockButtonClassname: 'email-block__remove-button'
    };

    function init() {
      plugin.element = element;
      plugin.settings = _objectSpread2(_objectSpread2({}, defaults), options);
      plugin.element.insertAdjacentHTML('beforeend', getPluginTemplate());
      plugin.emails = [];
      addEventListeners();
    }

    function addEventListeners() {
      on('focusout', delegate(".".concat(plugin.inputClassname), handleInputBlur), plugin.element);
      on('keypress', delegate(".".concat(plugin.inputClassname), handleInputKeyPress), plugin.element);
      on('keyup', delegate(".".concat(plugin.inputClassname), handleInputKeyUp), plugin.element);
      on('click', delegate(".".concat(plugin.emailBlockButtonClassname), handleRemoveEmail), plugin.element);
    }
    /**
     * @param {Object} data
     */


    function handleInputBlur(_ref) {
      var target = _ref.target;
      var value = target.value;

      if (!value) {
        return;
      }

      addEmailBlock(value);
      target.value = '';
    }
    /**
     * @param {Object} event
     */


    function handleInputKeyPress(event) {
      if (event.which === 13) {
        event.preventDefault();
      }
    }
    /**
     * @param {Object} event
     */


    function handleInputKeyUp(event) {
      var target = event.target,
          which = event.which;
      var value = target.value;
      var matches = value.split(',');

      if (value === ',') {
        target.value = '';
        return;
      }

      if (which === 13 && value) {
        addEmailBlock(value);
        target.value = '';
        return;
      }

      if (matches.length < 2) {
        return;
      }

      matches.forEach(function (match) {
        if (match) {
          addEmailBlock(match.trim());
        }
      });
      target.value = '';
    }
    /**
     * @param {Object} data
     */


    function handleRemoveEmail(_ref2) {
      var target = _ref2.target;
      var emailBlockEl = target.closest(".".concat(plugin.emailBlockClassname));
      var email = emailBlockEl.querySelector(".".concat(plugin.emailBlockTextClassname)).innerText;
      var index = plugin.emails.indexOf(email);
      emailBlockEl.parentNode.removeChild(emailBlockEl);

      if (index >= 0) {
        plugin.emails.splice(index, 1);
      }
    }
    /**
     * @param {string} email
     * @returns {boolean}
     */


    function addEmailBlock(email) {
      if (plugin.emails.indexOf(email) >= 0) {
        return false;
      }

      var template = getEmailBlockTemplate(email);
      plugin.emails.push(email);
      document.querySelector(".".concat(plugin.inputClassname)).insertAdjacentHTML('beforebegin', template);
      return true;
    }

    function add() {
      var email = getRandomEmail();

      if (!addEmailBlock(email)) {
        add();
      }
    }

    function getCount() {
      var count = plugin.emails.reduce(function (acc, email) {
        return validateEmail(email) ? acc + 1 : acc;
      }, 0);
      window.alert("Valid emails count: ".concat(count));
    }
    /**
     * @returns {string}
     */


    function getRandomEmail() {
      var names = ['liam', 'noah', 'oliver', 'william', 'lucas', 'olivia', 'emma', 'sophia', 'isabella', 'charlotte'];
      var lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones'];
      var name = names[getRandomInt(0, names.length)];
      var lastName = lastNames[getRandomInt(0, lastNames.length)];
      return "".concat(name, ".").concat(lastName, "@miro.com");
    }
    /**
     * @param {number} min
     * @param {number} max
     * @return {number}
     */


    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * @param {string} email
     * @returns {boolean}
     */


    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    /**
     * @param {string} type
     * @param {Function} listener
     * @param {Element|HTMLDocument|Window} element
     */


    function on(type, listener) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
      element.addEventListener(type, listener);
    }
    /**
     * @param {string} selector
     * @param {Function} listener
     * @returns {Function}
     */


    function delegate(selector, listener) {
      return function (event) {
        var delegatedTarget = event.target.closest(selector);

        if (!delegatedTarget || !event.target.matches(selector)) {
          return;
        }

        listener(event);
      };
    }
    /**
     * @returns {string}
     */


    function getPluginTemplate() {
      return "\n      <div class=\"".concat(plugin.wrapperClassname, "\">\n        <input class=\"").concat(plugin.inputClassname, "\" placeholder=\"").concat(plugin.settings.placeholder, "\" />\n      </div>\n    ");
    }
    /**
     * @param {string} email
     * @returns {string}
     */


    function getEmailBlockTemplate(email) {
      var modifierClass = validateEmail(email) ? "".concat(plugin.emailBlockClassname, "--valid") : "".concat(plugin.emailBlockClassname, "--invalid");
      return "\n      <div class=\"".concat(plugin.emailBlockClassname, " ").concat(modifierClass, "\">\n        <span class=\"").concat(plugin.emailBlockTextClassname, "\">").concat(email, "</span>\n        <button type=\"button\" class=\"").concat(plugin.emailBlockButtonClassname, "\">&times</button>\n      </div>\n    ");
    }

    init();
    return _objectSpread2(_objectSpread2({}, plugin), {}, {
      add: add,
      getCount: getCount
    });
  };

  return EmailsInput;

})));
