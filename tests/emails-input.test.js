const EmailsInput = require('../src/emails-input');

describe('EmailsInput', () => {
  const elementId = 'emails-input';

  describe('plugin', () => {
    describe('When I bind the plugin to an element', () => {
      it('should do nothing if the element is not a DIV', () => {
        // arrange
        document.body.innerHTML = getInvalidHTML(elementId);
        const element = document.getElementById(elementId);

        // act
        const emailsInput = EmailsInput(element);

        // assert
        expect(emailsInput).toBeUndefined();
      });

      it('should create the plugin component if the element is a DIV', () => {
        // arrange
        document.body.innerHTML = getValidHTML(elementId);
        const element = document.getElementById(elementId);

        // act
        const emailsInput = EmailsInput(element);

        // assert
        expect(element.querySelectorAll(`.${emailsInput.settings.inputClassName}`)).toHaveLength(1);
      });
    });

    describe('When I interact the input', () => {
      const cases = [
        [
          'And I press Enter',
          new KeyboardEvent('keyup', { bubbles: true, cancelable: true, which: 13 }),
          'john@miro.com'
        ],
        [
          'And I remove focus from the input',
          new Event('focusout', { bubbles: true, cancelable: true }),
          'john@miro.com'
        ],
        [
          'And I type a comma',
          new KeyboardEvent('keyup', { bubbles: true, cancelable: true }),
          'john@miro.com,'
        ]
      ];
      let element;
      let emailsInput;
      let input;
      let emailsBlockWrapper;

      beforeEach(() => {
        document.body.innerHTML = getValidHTML(elementId);
        element = document.getElementById(elementId);
        emailsInput = EmailsInput(element);
        input = element.querySelector(`.${emailsInput.settings.inputClassName}`);
        emailsBlockWrapper = element.querySelector(`.${emailsInput.settings.wrapperClassName}`);
      });

      describe.each(cases)('%s', (title, event, validInputValue) => {
        it('should do nothing when the input is empty', () => {
          // arrange
          input.value = '';

          // act
          input.dispatchEvent(event);

          // assert
          expect(emailsBlockWrapper.querySelectorAll(`.${emailsInput.settings.emailBlockClassName}`)).toHaveLength(0);
        });

        it('should create an email block and clear the input when the input is filled', () => {
          // arrange
          input.value = validInputValue;

          // act
          input.dispatchEvent(event);

          // assert
          expect(emailsBlockWrapper.querySelectorAll(`.${emailsInput.settings.emailBlockClassName}`)).toHaveLength(1);
          expect(input.value).toEqual('');
        });
      });

      describe('And I paste a value', () => {
        it('should create an email block for each value split by comma', () => {
          const event = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });

          // arrange
          input.value = 'john@miro.com, invalid.email, mike@miro.com, alexander@miro.com';

          // act
          input.dispatchEvent(event);

          // assert
          expect(emailsBlockWrapper.querySelectorAll(`.${emailsInput.settings.emailBlockClassName}`)).toHaveLength(4);
          expect(input.value).toEqual('');
        });
      });
    });
  });

  describe('public API', () => {
    let element;
    let emailsInput;

    window.alert = jest.fn();

    beforeEach(() => {
      document.body.innerHTML = getValidHTML(elementId);
      element = document.getElementById(elementId);
      emailsInput = EmailsInput(element);
    });

    describe('When getCount is called', () => {
      it('should show an alert with valid emails count', () => {
        const input = element.querySelector(`.${emailsInput.settings.inputClassName}`);
        const event = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });

        // arrange
        input.value = 'john@miro.com, invalid.email, mike@miro.com, alexander@miro.com';
        input.dispatchEvent(event);

        // act
        emailsInput.getCount();

        // assert
        expect(window.alert).toHaveBeenCalledWith('Valid emails count: 3');
      });
    });

    describe('When add is called', () => {
      it('should add a new email block', () => {
        const emailsBlockWrapper = element.querySelector(`.${emailsInput.settings.wrapperClassName}`);

        // act
        emailsInput.add();

        // assert
        expect(emailsBlockWrapper.querySelectorAll(`.${emailsInput.settings.emailBlockClassName}`)).toHaveLength(1);
      });
    });
  });
});

const getValidHTML = (elementId) => {
  return `<div id="${elementId}"></div>`;
};

const getInvalidHTML = (elementId) => {
  return `<span id="${elementId}"></span>`;
};
