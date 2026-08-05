import {
  HomePage,
  ProfilePage,
} from '../pages/index.js';

export class ProfileFacade {
  constructor(page) {
    this.homePage = new HomePage(page);
    this.profilePage = new ProfilePage(page);
  }

  async updateProfile(bio, password) {
    await this.homePage.open();
    await this.homePage.openSettings();

    await this.profilePage.updateBio(
      bio,
      password
    );

    await this.profilePage.openSettings();
  }
}