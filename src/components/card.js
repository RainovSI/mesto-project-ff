export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(title, image, deleteCallback, likeCallback, openImageCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = title;
  cardImage.alt = title;
  cardImage.src = image;

  deleteButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', likeCallback);
  cardImage.addEventListener('click', openImageCallback);

  return cardElement;
}

function deleteCard(event) {
  const cardListItem = event.target.closest('.card');
  cardListItem.remove();
}

function likeCard(event) {
  const cardItemButton = event.target.closest('.card__like-button');
  cardItemButton.classList.toggle('card__like-button_is-active');
}
