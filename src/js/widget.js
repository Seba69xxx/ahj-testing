import { checkLuhn, getCardSystem } from './validators';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  bindToDOM() {
    this.parentEl.innerHTML = `
      <div class="card-validator">
        <ul class="cards">
          <li class="card visa">Visa</li>
          <li class="card master">Master</li>
          <li class="card amex">Amex</li>
          <li class="card discover">Discover</li>
          <li class="card mir">Mir</li>
        </ul>
        <form class="card-form-widget">
          <input type="text" class="input" placeholder="Credit Card Number">
          <button class="submit">Click to Validate</button>
        </form>
      </div>
    `;

    this.element = this.parentEl.querySelector('.card-validator');
    this.input = this.element.querySelector('.input');
    this.cards = this.element.querySelectorAll('.card');

    this.element.querySelector('.card-form-widget').addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }

  onInput(e) {
    const value = e.target.value;
    const system = getCardSystem(value);
    
    this.cards.forEach(card => {
      card.style.opacity = '1'; 
      card.classList.remove('active');
    });

    if (system) {
      const activeCard = this.element.querySelector(`.${system}`);
      if (activeCard) {
        this.cards.forEach(card => card.style.opacity = '0.3');
        activeCard.style.opacity = '1';
        activeCard.classList.add('active');
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    
    if (checkLuhn(value)) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
    }
  }
}