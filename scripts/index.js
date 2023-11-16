const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(title, image, callback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__description").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = title;
  cardImage.src = image;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", callback);

  return cardElement;
}

const deleteCard = (event) => {
  const cardListItem = event.target.closest(".card");
  cardListItem.remove();
};

function addCard(item) {
  cardList.append(item);
}

initialCards.forEach((item) => {
  const cardData = createCard(item.name, item.link, deleteCard);
  addCard(cardData);
});
