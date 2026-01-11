import { checkLuhn, getCardSystem } from './validators';
import visa from '../img/visa.svg';
import master from '../img/master.svg';
import amex from '../img/amex.svg';
import discover from '../img/discover.svg';
import jcb from '../img/jcb.svg';
import diners from '../img/diners.svg';
import mir from '../img/mir.svg';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    
    this.cardTypes = [
      { id: 'visa', title: 'Visa', img: visa },
      { id: 'master', title: 'Mastercard', img: master },
      { id: 'amex', title: 'American Express', img: amex },
      { id: 'discover', title: 'Discover', img: discover },
      { id: 'jcb', title: 'JCB', img: jcb },
      { id: 'diners', title: 'Diners Club', img: diners },
      { id: 'mir', title: 'Mir', img: mir },
    ];
  }

  bindToDOM() {
    this.parentEl.innerHTML = `
      <div class="card-validator">
        <div class="cards-container"></div>
        <form class="card-form-widget">
          <input type="text" class="input" placeholder="Credit Card Number">
          <button class="submit">Click to Validate</button>
        </form>
      </div>
    `;

    this.element = this.parentEl.querySelector('.card-validator');
    this.cardsContainer = this.element.querySelector('.cards-container');
    this.input = this.element.querySelector('.input');

    this.renderCards();

    this.element.querySelector('.card-form-widget').addEventListener('submit', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }

  renderCards() {
    this.cardTypes.forEach(card => {
      const img = document.createElement('img');
      img.src = card.img;
      img.alt = card.title;
      img.classList.add('card');
      img.classList.add(card.id);
      img.title = card.title;
      this.cardsContainer.appendChild(img);
    });
    this.cardElements = this.element.querySelectorAll('.card');
  }

  onInput(e) {
    const value = e.target.value;
    const system = getCardSystem(value);
    
    this.cardElements.forEach(card => {
      card.classList.remove('active');
    });

    if (system) {
      const activeCard = this.element.querySelector(`.${system}`);
      if (activeCard) {
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
}ы