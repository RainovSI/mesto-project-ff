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
	formElement,
	inputElement,
	errorMessage,
	{ inputErrorClass, errorClass }
) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(errorClass)
}

function hideInputError(
	formElement,
	inputElement,
	{ inputErrorClass, errorClass }
) {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(inputErrorClass)
	errorElement.textContent = ''
	errorElement.classList.remove(errorClass)
}

function isValid(formElement, inputElement, validationConfig) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		)
	} else {
		hideInputError(formElement, inputElement, validationConfig)
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

function setEventListeners(formElement, validationConfig) {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', function () {
			isValid(formElement, inputElement, validationConfig)
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
