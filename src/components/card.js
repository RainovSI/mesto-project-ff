export { createCard, deleteCard, likeCard }
import { config, checkRequest } from './api.js'

const cardTemplate = document.querySelector('#card-template').content

function createCard(
	title,
	image,
	deleteCallback,
	likeCallback,
	likeCounter,
	isLikedByUser,
	openImageCallback,
	userId,
	ownerId,
	cardId
) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const likeButton = cardElement.querySelector('.card__like-button')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const cardImage = cardElement.querySelector('.card__image')
	const cardLikeCounter = cardElement.querySelector(
		'.card__like-button-counter'
	)

	cardElement.querySelector('.card__title').textContent = title
	cardImage.alt = title
	cardImage.src = image
	cardLikeCounter.textContent = likeCounter
	cardElement.setAttribute('data-card-id', cardId)

	if (ownerId === userId) {
		deleteButton.addEventListener('click', () => deleteCallback(cardId))
	} else {
		deleteButton.style.display = 'none'
	}

	if (isLikedByUser) {
		likeButton.classList.add('card__like-button_is-active')
	}

	likeButton.addEventListener('click', () => {
		likeCallback(cardId).then(data => {
			likeButton.classList.toggle('card__like-button_is-active')
			cardLikeCounter.textContent = data.likes.length
		})
	})

	cardImage.addEventListener('click', openImageCallback)

	return cardElement
}

function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
		.then(res => checkRequest(res))
		.then(() => {
			const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)
			cardElement.remove()
		})
		.catch(err => {
			console.error('Ошибка при удалении карточки:', err)
		})
}

function likeCard(cardId) {
	const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)
	const cardItemButton = cardElement.querySelector('.card__like-button')
	const isLiked = cardItemButton.classList.contains(
		'card__like-button_is-active'
	)

	const method = isLiked ? 'DELETE' : 'PUT'
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: method,
		headers: config.headers,
	})
		.then(res => checkRequest(res))
		.then(data => {
			return data
		})
}
