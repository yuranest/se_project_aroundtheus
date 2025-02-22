class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector); // Added avatar support
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent || "Unknown Name",
      job: this._jobElement.textContent || "No job specified",
      avatar: this._avatarElement.src || "", // Get avatar URL
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (typeof name === "string" && name.trim() !== "") {
      this._nameElement.textContent = name;
    }

    if (typeof job === "string" && job.trim() !== "") {
      this._jobElement.textContent = job; // Updates job immediately
    } else {
      this._jobElement.textContent = "No job specified";
    }

    if (typeof avatar === "string" && avatar.trim() !== "") {
      this._avatarElement.src = avatar;
    }
  }
}

export default UserInfo;
