import './pages/index.css'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js'
import {
	enableValidation,
	clearValidation,
	validationConfig,
} from './components/validation.js'
import {
	config,
	getCardsData,
	getUserData,
	updateUserData,
	sendNewCardData,
	updateAvatarData,
} from './components/api.js'

const cardList = document.querySelector('.places__list')
const buttonOpenEditProfilePopup = document.querySelector(
	'.profile__edit-button'
)
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
const buttonOpenEditAvatarPopup = document.querySelector(
	'.profile__avatar-button'
)
const popupEdit = document.querySelector('.popup_type_edit')
const popupAdd = document.querySelector('.popup_type_new-card')
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const formElementNewPlace = document.querySelector(
	'.popup__form[name="new-place"]'
)
const formElementProfile = document.querySelector(
	'.popup__form[name="edit-profile"]'
)
const formElementAvatar = document.querySelector(
	'.popup__form[name="edit-avatar"]'
)
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const placeNameInput = document.querySelector('.popup__input_type_card-name')
const linkInput = document.querySelector('.popup__input_type_url')
const avatarLinkInput = document.querySelector('.popup__input_type_avatar_url')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const avatar = document.querySelector('.profile__image')
const profileImage = document.querySelector('.profile__image-box')

Promise.all([getUserData(config), getCardsData(config)]).then(data => {
	profileTitle.textContent = data[0].name
	profileDescription.textContent = data[0].about
	avatar.style.backgroundImage = `url(${data[0].avatar})`
	const userId = data[0]._id
	data[1].forEach(item => {
		const isLikedByUser = item.likes.some(user => user._id === userId)
		const cardData = createCard(
			item.name,
			item.link,
			deleteCard,
			likeCard,
			item.likes.length,
			isLikedByUser,
			openCardImage,
			userId,
			item.owner._id,
			item._id
		)
		addCard(cardData)
	})
})

function addCard(item) {
	cardList.append(item)
}

function openCardImage(event) {
	const cardImage = event.target.closest('.card__image')
	openPopup(popupTypeImage)
	popupImage.src = cardImage.src
	popupImage.alt = cardImage.alt
}

buttonOpenEditProfilePopup.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	clearValidation(popupEdit, validationConfig)
	openPopup(popupEdit)
})
buttonOpenAddCardPopup.addEventListener('click', function () {
	placeNameInput.value = ''
	linkInput.value = ''
	clearValidation(popupAdd, validationConfig)
	openPopup(popupAdd)
})
buttonOpenEditAvatarPopup.addEventListener('click', function () {
	avatarLinkInput.value = ''
	clearValidation(popupAvatar, validationConfig)
	openPopup(popupAvatar)
})
formElementNewPlace.addEventListener('submit', submitAddCardForm)
formElementProfile.addEventListener('submit', submitEditProfileForm)
formElementAvatar.addEventListener('submit', submitEditAvatarForm)

function submitEditProfileForm(event) {
	event.preventDefault()
	const buttonSave = popupEdit.querySelector('.popup__button')
	buttonSave.textContent = 'Сохранение...'
	const userData = {
		name: nameInput.value,
		about: jobInput.value,
	}
	updateUserData(config, userData)
		.then(newUserData => {
			profileTitle.textContent = newUserData.name
			profileDescription.textContent = newUserData.about
			closePopup(popupEdit)
		})
		.catch(error => {
			console.error('Ошибка при обновлении профиля:', error)
		})
		.finally(() => {
			buttonSave.textContent = 'Сохранить'
		})
}

function submitEditAvatarForm(event) {
	event.preventDefault()
	const buttonSave = popupAvatar.querySelector('.popup__button')
	buttonSave.textContent = 'Сохранение...'
	const avatarData = {
		avatar: avatarLinkInput.value,
	}
	updateAvatarData(config, avatarData)
		.then(newAvatarData => {
			console.log(newAvatarData)
			avatar.style.backgroundImage = `url(${newAvatarData.avatar})`
			closePopup(popupAvatar)
		})
		.catch(error => {
			console.error('Ошибка при обновлении аватара:', error)
		})
		.finally(() => {
			buttonSave.textContent = 'Сохранить'
		})
}

function submitAddCardForm(event) {
	event.preventDefault()
	const buttonSave = popupAdd.querySelector('.popup__button')
	buttonSave.textContent = 'Сохранение...'
	const cardData = {
		name: placeNameInput.value,
		link: linkInput.value,
	}
	sendNewCardData(config, cardData)
		.then(newCard => {
			formElementNewPlace.reset()
			clearValidation(formElementNewPlace, validationConfig)
			closePopup(popupAdd)
			const userId = newCard.owner._id
			const isLikedByUser = newCard.likes.some(user => user._id === userId)
			const cardData = createCard(
				newCard.name,
				newCard.link,
				deleteCard,
				likeCard,
				newCard.likes.length,
				isLikedByUser,
				openCardImage,
				userId,
				newCard.owner._id,
				newCard._id
			)
			console.log(cardData)
			cardList.prepend(cardData)
		})
		.catch(error => {
			console.error('Ошибка при добавлении карточки:', error)
		})
		.finally(() => {
			buttonSave.textContent = 'Сохранить'
		})
}

profileImage.addEventListener('mouseover', function () {
	buttonOpenEditAvatarPopup.style.display = 'block'
	avatar.style.opacity = '0.2'
})

profileImage.addEventListener('mouseout', function () {
	buttonOpenEditAvatarPopup.style.display = 'none'
	avatar.style.opacity = '1'
})

enableValidation(validationConfig)
