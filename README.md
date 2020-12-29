# Miro Code Challenge

[ Demo ➞](https://guidosreis.github.io/miro-code-challenge/demo)

This repository contains the code challenge for a Frontend Engineer position at Miro.

---

Running
------------

Install the dependencies

~~~
npm install
~~~

Build the project

~~~
npm run build
~~~

Start the server

~~~
npm start
~~~

Testing
------------

~~~
npm run test
~~~

How to use
------------

### Initialization

~~~ javascript
<script type="text/javascript" src="dist/emails-input.js"></script>
<script type="text/javascript">
  EmailsInput(document.querySelector('#element'));
</script>
~~~

### Customization

~~~ javascript
EmailsInput(document.querySelector('#element'), {
  /**
   * @param {string} the text that you want to show as placeholder 
   */
   placeholder: 'add new item...'
});
~~~

### API

`add()`

Adds a random email to the list of emails

~~~ javascript
var emailsInput = EmailsInput(document.querySelector('#element'));
const button = document.querySelector('.button');

button.addEventListener('click', emailsInput.add());
~~~

`getCount()`

Shows an alert with the valid emails count

~~~ javascript
var emailsInput = EmailsInput(document.querySelector('#element'));
const button = document.querySelector('.button');

button.addEventListener('click', emailsInput.getCount());
~~~
