export { openPopup, closePopup, setCloseModalOnClickListeners }

function openPopup(popup) {
	popup.classList.add('popup_is-opened', 'popup_is-animated')
	document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
	popup.classList.remove('popup_is-opened', 'popup_is-animated')
	document.removeEventListener('keydown', closeByEsc)
}

function closeByEsc(event) {
	if (event.key === 'Escape') {
		const popup = document.querySelector('.popup_is-opened')
		closePopup(popup)
	}
}

function setCloseModalOnClickListeners(popupList) {
	popupList.forEach(popup => {
		const closeButton = popup.querySelector('.popup__close')
		closeButton.addEventListener('click', () => closePopup(popup))
		popup.addEventListener('click', event => {
			if (event.target === event.currentTarget) closePopup(popup)
		})
	})
}
