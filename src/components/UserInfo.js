class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // Return current user info from the page
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    // Update the user info on the page
    if (name) {
      this._nameElement.textContent = name;
    } else {
      console.error("Name is missing in setUserInfo.");
    }

    if (job) {
      this._jobElement.textContent = job;
    } else {
      console.error("Job is missing in setUserInfo.");
    }
  }
}

export default UserInfo;
