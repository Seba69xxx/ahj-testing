import './css/style.css';
import CardWidget from './js/widget';

document.addEventListener('DOMContentLoaded', () => {
  const widget = new CardWidget(document.querySelector('body'));
  widget.bindToDOM();
});