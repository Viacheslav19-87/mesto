export default class UserInfo {
  constructor({
    title,
    subtitle,
    avatarSelector
  }) {
    this._title = title;
    this._subtitle = subtitle;
    this._avatar = document.querySelector(avatarSelector);
    this._userId;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.title = this._title.textContent;
    this._userInfo.subtitle = this._subtitle.textContent;
    return this._userInfo;
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(item) {
    this._title.textContent = item['name'];
    this._subtitle.textContent = item['about'];
    this._avatar.src = item.avatar;
    this._userId = item._id;
  }
}