# Web Component Example

This sample projects shows a simple web component with some basic features. It allows to add a counter to a page and to increment and decrement the counter by buttons.

A live demo is can be accessed at https://thomaspr.github.io/web-components-demo/

The projects shows three main web component features:

- [Web Component itself](#web-component-itself)
- [Using Attributes](#using-attributes)
- [Shadow DOM](#shadow-dom)


## Web Component itself

The Web Component itself is defined in `counter.js`. By adding the element `<demo-counter></demo-counter>` to any HTML document the web component will be added.

A web components needs to contain the following three important parts:

1. It has to define a class that inherits from HTMLElement

```javascript
class Counter extends HTMLElement { }
```

2. It has to implement the `connectCallback` function which is exected whenever the web component is added to a page.

```javascript
  connectedCallback() { }
```

3. It has to be registered as a new custom html element

```javascript
customElements.define('demo-counter', Counter);
```



## Using Attributes

A user (developer) of the web component would need to change the currently selected value. To support such features, a web component can listen for attributes and update itself depending on the values of these attributes. This behavior is a clean way to pass values into a web component.

As an example we set the counter to the value 10.

```html
<demo-counter value="10"></demo-counter>
```

In addition to setting an initial value, it is supported to change the value during runtime. In our demo project we add a button to the `index.html` to reset the counter every time a user clicks the button:

```html
<button id="resetCounter">Reset Counter</button>
```

```javascript
document.getElementById('resetCounter').addEventListener('click', () => {
  document.querySelector('demo-counter').setAttribute('value', 1);
});
```

The counter web component needs to be notified every time the value of an attribute changes. Therefore the component needs to implement a function that will be executed by the browser on every change:

```javascript
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute name: " + name);
    this.value = parseInt(newValue);
    this.counterValue.innerText = this.value;
  }
```

In addition, the component needs to tell the browser on which attributes it want to get notified:

```javascript
  static get observedAttributes() {
    return ['value'];
  }
```


## Shadow Dom

The `index.html` sets a CSS rule to show all buttons with a red background. Without using a Shadown DOM, also the increment and decrement buttons would be colored in red. Because of creating a Shadow DOM inside of the counter web component, no CSS rules from the root page will take any effect of the content within the web component and therefore the increment and decrement buttons will keep their default styling.

The Shadow DOM itself is created in the constructor of the Counter web component (`counter.js`)

```javascript
this.attachShadow({ mode: 'open' });
```
