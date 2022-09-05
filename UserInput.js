const template = document.createElement('template');
template.innerHTML = `
  <span id="label">Input : </span>
  <input id="input" value="" />
  <button id="btn">Click</button>
`;

class UserInput extends HTMLElement {
  $label;
  $input;
  $btn;

  static get observedAttributes() {
    return ['prop', 'ival'];
  }

  get prop() {
    return this.getAttribute('prop');
  }

  set prop(val) {
    if (val) {
      this.setAttribute('prop', val);
    } else {
      this.removeAttribute('prop');
    }
  }

  get ival() {
    return this.getAttribute('ival');
  }

  set ival(val) {
    if (val) {
      this.setAttribute('ival', val);
    } else {
      this.removeAttribute('ival');
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$label = this.shadowRoot.querySelector('#label');
    this.$input = this.shadowRoot.querySelector('#input');
    this.$btn = this.shadowRoot.querySelector('#btn');
  }

  connectedCallback() {
    const prop = this.getAttribute('prop');

    this.$input.addEventListener('keyup', this._change.bind(this));
    this.$btn.addEventListener('click', this._click.bind(this));
  }

  // render() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.value = newValue;
    console.log(`${name} : ${oldValue} => ${newValue}`);
  }

  adoptedCallback() {
    console.log('I am adopted!');
  }

  _change({ target }) {
    const val = target.value;
    this.ival = val;
    // console.log(this.$input.value);
    // console.log(this.ival);
  }

  _click() {
    const nowContent = this.ival;
    alert(nowContent);
  }
}

customElements.define('user-input', UserInput);