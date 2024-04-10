export {
	config,
	getUserData,
	getCardsData,
	updateUserData,
	sendNewCardData,
	checkResponse,
	updateAvatarData,
	changeLikeStatus,
	deleteCard,
}

const config = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
	headers: {
		authorization: '5c4a1287-ba18-47d9-9e75-5664a8e55432',
		'Content-Type': 'application/json',
	},
}

function checkResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return res.json().then(error => {
		throw new Error(`${error.message} (Статус ошибки: ${res.status})`)
	})
}

function getUserData() {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(res => checkResponse(res))
}

function getCardsData() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(res => checkResponse(res))
}

function updateUserData(userData) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(userData),
	}).then(res => checkResponse(res))
}

function updateAvatarData(avatarData) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(avatarData),
	}).then(res => checkResponse(res))
}

function sendNewCardData(cardData) {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify(cardData),
	}).then(res => checkResponse(res))
}

function changeLikeStatus(cardId, like) {
	const method = like ? 'DELETE' : 'PUT'
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: method,
		headers: config.headers,
	}).then(res => checkResponse(res))
}

function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(res => checkResponse(res))
}
