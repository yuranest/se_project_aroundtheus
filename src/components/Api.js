export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Generic method to handle API requests
  async _request(url, method, body = null) {
    const options = {
      method,
      headers: this._headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this._baseUrl}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // ✅ Fetch user data
  async getUserInfo() {
    return this._request("/users/me", "GET");
  }

  // ✅ Update user profile
  async updateUserInfo({ name, about }) {
    return this._request("/users/me", "PATCH", { name, about });
  }

  // ✅ Update user avatar
  async updateUserAvatar({ avatar }) {
    return this._request("/users/me/avatar", "PATCH", { avatar });
  }

  // ✅ Fetch only current user's cards
  async getInitialCards() {
    return this._request("/cards", "GET");
  }

  // ✅ Add a new card
  async addCard({ name, link }) {
    return this._request("/cards", "POST", { name, link });
  }

  // ✅ Delete a card
  async deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, "DELETE");
  }

  // ✅ Fixed Like & Unlike Endpoints
  async likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, "PUT");
  }

  async unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, "DELETE");
  }
}
