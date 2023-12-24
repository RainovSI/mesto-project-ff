import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { handleFormSubmit, handleAddCardSubmit } from './components/form.js';
import { openPopup, closePopup, openCardImage } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popup = document.querySelectorAll('.popup');
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');

function addCard(item) {
  cardList.append(item);
}

initialCards.forEach((item) => {
  const cardData = createCard(
    item.name,
    item.link,
    deleteCard,
    likeCard,
    openCardImage
  );
  addCard(cardData);
});

popup.forEach((item) => {
  item.addEventListener('click', closePopup);
});

editButton.addEventListener('click', openPopup(popupEdit));
addButton.addEventListener('click', openPopup(popupAdd));
formElementNewPlace.addEventListener('submit', handleAddCardSubmit);
formElementProfile.addEventListener('submit', handleFormSubmit);
