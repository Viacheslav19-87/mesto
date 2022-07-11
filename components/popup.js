export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._closePopupEsc);
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._closePopupEsc);
    }

    _closePopupEsc = ((evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    });

    setEventListeners() {
        this._popup.querySelector('.popup__button-res').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open')) {
                this.close();
            }
        });
    }
}