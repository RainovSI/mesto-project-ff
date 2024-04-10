import './pages/index.css'
import {
	createCard,
	handleDeleteClick,
	handleLikeClick,
} from './components/card.js'
import {
	openPopup,
	closePopup,
	setCloseModalOnClickListeners,
} from './components/modal.js'
import {
	enableValidation,
	clearValidation,
	validationConfig,
} from './components/validation.js'
import {
	getCardsData,
	getUserData,
	updateUserData,
	sendNewCardData,
	updateAvatarData,
} from './components/api.js'

const cardsContainer = document.querySelector('.places__list')
const buttonOpenEditProfilePopup = document.querySelector(
	'.profile__edit-button'
)
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button')
const buttonOpenEditAvatarPopup = document.querySelector(
	'.profile__avatar-button'
)
const popups = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit')
const popupAdd = document.querySelector('.popup_type_new-card')
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupTypeImage = document.querySelector('.popup_type_image')
const buttonSaveEditProfile = popupEdit.querySelector('.popup__button')
const buttonSaveEditAvatar = popupAvatar.querySelector('.popup__button')
const buttonSaveAddCard = popupAdd.querySelector('.popup__button')
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')
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

Promise.all([getUserData(), getCardsData()]).then(([profile, cards]) => {
	profileTitle.textContent = profile.name
	profileDescription.textContent = profile.about
	avatar.style.backgroundImage = `url(${profile.avatar})`
	const userId = profile._id
	cards.forEach(card => {
		const cardElement = createCard(
			card,
			handleDeleteClick,
			handleLikeClick,
			openCardImage,
			userId
		)
		addCard(cardElement)
	})
})

function addCard(cardElement) {
	cardsContainer.append(cardElement)
}

function openCardImage(cardData) {
	openPopup(popupTypeImage)
	popupImage.src = cardData.link
	popupImage.alt = cardData.name
	popupCaption.textContent = cardData.name
}

function handleEditProfileClick() {
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	clearValidation(popupEdit, validationConfig)
	openPopup(popupEdit)
}

function handleAddCardClick() {
	openPopup(popupAdd)
}

function handleEditAvatarClick() {
	formElementAvatar.reset()
	clearValidation(popupAvatar, validationConfig)
	openPopup(popupAvatar)
}

document.addEventListener(
	'DOMContentLoaded',
	setCloseModalOnClickListeners(popups)
)
buttonOpenEditProfilePopup.addEventListener('click', handleEditProfileClick)
buttonOpenAddCardPopup.addEventListener('click', handleAddCardClick)
buttonOpenEditAvatarPopup.addEventListener('click', handleEditAvatarClick)
formElementNewPlace.addEventListener('submit', handleAddCardFormSubmit)
formElementProfile.addEventListener('submit', handleEditProfileFormSubmit)
formElementAvatar.addEventListener('submit', handleEditAvatarFormSubmit)

function handleEditProfileFormSubmit(event) {
	event.preventDefault()
	buttonSaveEditProfile.textContent = 'Сохранение...'
	const userData = {
		name: nameInput.value,
		about: jobInput.value,
	}
	updateUserData(userData)
		.then(newUserData => {
			profileTitle.textContent = newUserData.name
			profileDescription.textContent = newUserData.about
			closePopup(popupEdit)
		})
		.catch(error => {
			console.error('Ошибка при обновлении профиля:', error)
		})
		.finally(() => {
			buttonSaveEditProfile.textContent = 'Сохранить'
		})
}

function handleEditAvatarFormSubmit(event) {
	event.preventDefault()
	buttonSaveEditAvatar.textContent = 'Сохранение...'
	const avatarData = {
		avatar: avatarLinkInput.value,
	}
	updateAvatarData(avatarData)
		.then(newAvatarData => {
			console.log(newAvatarData)
			avatar.style.backgroundImage = `url(${newAvatarData.avatar})`
			closePopup(popupAvatar)
		})
		.catch(error => {
			console.error('Ошибка при обновлении аватара:', error)
		})
		.finally(() => {
			buttonSaveEditAvatar.textContent = 'Сохранить'
		})
}

function handleAddCardFormSubmit(event) {
	event.preventDefault()
	buttonSaveAddCard.textContent = 'Сохранение...'
	const cardData = {
		name: placeNameInput.value,
		link: linkInput.value,
	}
	sendNewCardData(cardData)
		.then(newCard => {
			closePopup(popupAdd)
			const userId = newCard.owner._id
			const cardData = createCard(
				newCard,
				handleDeleteClick,
				handleLikeClick,
				openCardImage,
				userId
			)
			cardsContainer.prepend(cardData)
			formElementNewPlace.reset()
			clearValidation(popupAdd, validationConfig)
		})
		.catch(error => {
			console.error('Ошибка при добавлении карточки:', error)
		})
		.finally(() => {
			buttonSaveAddCard.textContent = 'Сохранить'
		})
}

enableValidation(validationConfig)
