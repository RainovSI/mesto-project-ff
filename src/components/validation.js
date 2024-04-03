export { enableValidation, clearValidation, validationConfig }

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

function showInputError(
	formSelector,
	inputSelector,
	errorMessage,
	validationConfig
) {
	const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
	inputSelector.classList.add(validationConfig.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(validationConfig.errorClass)
}

function hideInputError(formSelector, inputSelector, validationConfig) {
	const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
	inputSelector.classList.remove(validationConfig.inputErrorClass)
	errorElement.textContent = ''
	errorElement.classList.remove(validationConfig.errorClass)
}

function isValid(formSelector, inputSelector) {
	if (inputSelector.validity.patternMismatch) {
		inputSelector.setCustomValidity(inputSelector.dataset.errorMessage)
	} else {
		inputSelector.setCustomValidity('')
	}

	if (!inputSelector.validity.valid) {
		showInputError(
			formSelector,
			inputSelector,
			inputSelector.validationMessage,
			validationConfig
		)
	} else {
		hideInputError(formSelector, inputSelector, validationConfig)
	}
}

function hasInvalidInput(inputList) {
	return inputList.some(inputSelector => !inputSelector.validity.valid)
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(inactiveButtonClass)
		buttonElement.disabled = true
	} else {
		buttonElement.classList.remove(inactiveButtonClass)
		buttonElement.disabled = false
	}
}

function setEventListeners(formSelector, validationConfig) {
	const inputList = Array.from(
		formSelector.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formSelector.querySelector(
		validationConfig.submitButtonSelector
	)
	inputList.forEach(inputSelector => {
		inputSelector.addEventListener('input', function () {
			isValid(formSelector, inputSelector, validationConfig)
			toggleButtonState(inputList, buttonElement, validationConfig)
		})
	})
}

function enableValidation(validationConfig) {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)
	formList.forEach(formSelector => {
		formSelector.addEventListener('submit', function (evt) {
			evt.preventDefault()
		})
		setEventListeners(formSelector, validationConfig)
	})
}

function clearValidation(formSelector, validationConfig) {
	const inputList = Array.from(
		formSelector.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formSelector.querySelector(
		validationConfig.submitButtonSelector
	)
	inputList.forEach(inputSelector => {
		hideInputError(formSelector, inputSelector, validationConfig)
	})
	toggleButtonState(inputList, buttonElement, validationConfig)
}
