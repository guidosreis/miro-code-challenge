/**
 * @param {Element|HTMLDocument|Window} element
 * @param {Object|undefined} options
 * @returns {Object|undefined}
 */
const EmailsInput = (element, options) => {
  if (element.tagName !== 'DIV') {
    return;
  }

  const defaults = {
    placeholder: 'add...',
  };
  const plugin = {
    wrapperClassname: 'emails-block',
    inputClassname: 'emails-input',
    emailBlockClassname: 'email-block',
    emailBlockTextClassname: 'email-block__text',
    emailBlockButtonClassname: 'email-block__remove-button'
  };

  function init() {
    plugin.element = element;
    plugin.settings = { ...defaults, ...options };
    plugin.element.insertAdjacentHTML('beforeend', getPluginTemplate());
    plugin.emails = [];

    addEventListeners();
  }

  function addEventListeners() {
    on('focusout', delegate(`.${plugin.inputClassname}`, handleInputBlur), plugin.element);
    on('keypress', delegate(`.${plugin.inputClassname}`, handleInputKeyPress), plugin.element);
    on('keyup', delegate(`.${plugin.inputClassname}`, handleInputKeyUp), plugin.element);
    on('click', delegate(`.${plugin.emailBlockButtonClassname}`, handleRemoveEmail), plugin.element);
  }

  /**
   * @param {Object} data
   */
  function handleInputBlur({ target }) {
    const { value } = target;

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
    const { target, which } = event;
    const { value } = target;
    const matches = value.split(',');

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

    matches.forEach(match => {
      if (match) {
        addEmailBlock(match.trim());
      }
    });

    target.value = '';
  }

  /**
   * @param {Object} data
   */
  function handleRemoveEmail({ target }) {
    const emailBlockEl = target.closest(`.${plugin.emailBlockClassname}`);
    const email = emailBlockEl.querySelector(`.${plugin.emailBlockTextClassname}`).innerText;
    const index = plugin.emails.indexOf(email);

    emailBlockEl.parent.removeChild(emailBlockEl);

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

    const template = getEmailBlockTemplate(email);

    plugin.emails.push(email);
    document.querySelector(`.${plugin.wrapperClassname}`).insertAdjacentHTML('beforeend', template);
    return true;
  }

  function add() {
    const email = getRandomEmail();

    if (!addEmailBlock(email)) {
      add();
    }
  }

  function getCount() {
    const count = plugin.emails.reduce((acc, email) => {
      return validateEmail(email) ? acc + 1 : acc;
    }, 0);

    window.alert(`Valid emails count: ${count}`);
  }

  /**
   * @returns {string}
   */
  function getRandomEmail() {
    const names = [
      'liam',
      'noah',
      'oliver',
      'william',
      'lucas',
      'olivia',
      'emma',
      'sophia',
      'isabella',
      'charlotte'
    ];

    const lastNames = [
      'smith',
      'johnson',
      'williams',
      'brown',
      'jones'
    ];

    const name = names[getRandomInt(0, names.length)];
    const lastName = lastNames[getRandomInt(0, lastNames.length)];

    return `${name}.${lastName}@miro.com`;
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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @param {Element|HTMLDocument|Window} element
   */
  function on(type, listener, element = document) {
    element.addEventListener(type, listener);
  }

  /**
   * @param {string} selector
   * @param {Function} listener
   * @returns {Function}
   */
  function delegate(selector, listener) {
    return event => {
      const delegatedTarget = event.target.closest(selector);

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
    return `
      <div class="${plugin.wrapperClassname}"></div>
      <input class="${plugin.inputClassname}" placeholder="${plugin.settings.placeholder}" />
    `;
  }

  /**
   * @param {string} email
   * @returns {string}
   */
  function getEmailBlockTemplate(email) {
    const modifierClass = validateEmail(email)
      ? `${plugin.emailBlockClassname}--valid`
      : `${plugin.emailBlockClassname}--invalid`;

    return `
      <div class="${plugin.emailBlockClassname} ${modifierClass}">
        <span class="${plugin.emailBlockTextClassname}">${email}</span>
        <button class="${plugin.emailBlockButtonClassname}">x</button>
      </div>
    `;
  }

  init();

  return {
    ...plugin,
    add,
    getCount
  };
};

export default EmailsInput;
