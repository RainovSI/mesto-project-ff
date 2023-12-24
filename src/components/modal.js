import {getProfileValue} from './form.js';
export {openPopup, closePopup, openCardImage};

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popup = document.querySelectorAll('.popup');

function openPopup (popupType){
  return function getPopup (event) {
    if (event.target.closest('.profile__edit-button')) {
      getProfileValue();
    }
    popupType.classList.add('popup_is-opened', 'popup_is-animated');
    window.addEventListener('keydown', closePopup);
  }
}

function closePopup (event) {
  const target = event.target;
  if (target === event.currentTarget || target.closest('.popup__button') || target.closest('.popup__close') || event.code === 'Escape') {
    popup.forEach((item) => {
      item.classList.remove('popup_is-opened');
    }) 
  }
}

function openCardImage(event) {
  const cardImage = event.target.closest('.card__image');
  popupTypeImage.classList.add('popup_is-opened', 'popup_is-animated');
  window.addEventListener('keydown', closePopup);
  popupImage.src = cardImage.src;
}