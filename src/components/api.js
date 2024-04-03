export {
	config,
	getUserData,
	getCardsData,
	updateUserData,
	sendNewCardData,
	checkRequest,
	updateAvatarData,
}

const config = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
	headers: {
		authorization: '5c4a1287-ba18-47d9-9e75-5664a8e55432',
		'Content-Type': 'application/json',
	},
}

function checkRequest(res) {
	if (res.ok) {
		return res.json()
	}
	return res.json().then(error => {
		throw new Error(`${error.message} (Статус ошибки: ${res.status})`)
	})
}

function getUserData(config) {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(res => checkRequest(res))
}

function getCardsData(config) {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(res => checkRequest(res))
}

function updateUserData(config, userData) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(userData),
	}).then(res => checkRequest(res))
}

function updateAvatarData(config, avatarData) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(avatarData),
	}).then(res => checkRequest(res))
}

function sendNewCardData(config, cardData) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify(cardData),
	}).then(res => checkRequest(res))
}
