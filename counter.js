const template = document.createElement('template');
template.innerHTML = `
  <div>
    <button type="button" decrement> - </button>
    <span id="counterValue"></span>
    <button type="button" increment> + </button>
  </div>
`;

class Counter extends HTMLElement {

  value = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.counterValue = this.shadowRoot.getElementById('counterValue');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('[increment]').addEventListener('click', () => this.increment());
    this.shadowRoot.querySelector('[decrement]').addEventListener('click', () => this.decrement());

    this.value = this.value || 1;
    this.counterValue.innerText = this.value;
  }

  increment() {
    this.value++;
    this.counterValue.innerText = this.value;
  }

  decrement() {
    this.value--;
    this.counterValue.innerText = this.value;
  }


  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attribute name: " + name);
    this.value = parseInt(newValue);
    this.counterValue.innerText = this.value;
  }
}

customElements.define('demo-counter', Counter);
