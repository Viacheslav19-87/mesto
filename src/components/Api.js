export default class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }
 
    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
 
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }
  
    getUserData() {
        return fetch(`${this._url}/users/me`, {
                headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }

    setUserData(data) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }
 
    editProfileAvatar(item) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: item.link
                })
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }
  
    addNewCard(item) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: item.name,
                    link: item.link
                })
            })
            .then(res => {
                return this._checkResponse(res);
            })
            
    }
    
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }

    unlikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res);
            })
    }
}