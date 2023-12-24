import { closePopup, openCardImage } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';
export { getProfileValue, handleFormSubmit, handleAddCardSubmit };

const submitButton = document.querySelector('.popup__button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardList = document.querySelector('.places__list');
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');

function getProfileValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

function handleAddCardSubmit(event) {
  event.preventDefault();

  const title = placeNameInput.value;
  const image = linkInput.value;
  const cardData = createCard(
    title,
    image,
    deleteCard,
    likeCard,
    openCardImage
  );

  cardList.prepend(cardData);
  formElementNewPlace.reset();
  submitButton.addEventListener('click', closePopup);
}
