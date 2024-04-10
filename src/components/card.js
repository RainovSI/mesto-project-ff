export { createCard, handleDeleteClick, handleLikeClick }
import { deleteCard, changeLikeStatus } from './api.js'

const cardTemplate = document.querySelector('#card-template').content

function createCard(
	cardData,
	deleteCallback,
	likeCallback,
	openImageCallback,
	userId
) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const likeButton = cardElement.querySelector('.card__like-button')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const cardImage = cardElement.querySelector('.card__image')
	const cardLikeCounter = cardElement.querySelector(
		'.card__like-button-counter'
	)
	const isLikedByUser = cardData.likes.some(like => like._id === userId)

	cardElement.querySelector('.card__title').textContent = cardData.name
	cardImage.alt = cardData.name
	cardImage.src = cardData.link
	cardLikeCounter.textContent = cardData.likes.length

	if (cardData.owner._id === userId) {
		deleteButton.addEventListener('click', () =>
			deleteCallback(cardData._id, cardElement)
		)
	} else {
		deleteButton.style.display = 'none'
	}

	if (isLikedByUser) {
		likeButton.classList.add('card__like-button_is-active')
	}

	likeButton.addEventListener('click', () => {
		likeCallback(cardData._id, likeButton, cardLikeCounter)
	})
	cardImage.addEventListener('click', () => openImageCallback(cardData))

	return cardElement
}

function handleDeleteClick(cardId, cardElement) {
	deleteCard(cardId)
		.then(() => {
			cardElement.remove()
		})
		.catch(err => {
			console.error('Ошибка при удалении карточки:', err)
		})
}

function handleLikeClick(cardId, likeButton, likeCounter) {
	const isLiked = likeButton.classList.contains('card__like-button_is-active')
	changeLikeStatus(cardId, isLiked)
		.then(data => {
			likeButton.classList.toggle('card__like-button_is-active')
			likeCounter.textContent = data.likes.length
		})
		.catch(err => {
			console.error('Ошибка при изменении статуса лайка:', err)
		})
}
