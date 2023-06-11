import faker from 'faker';
import {by, element, expect, device} from 'detox';

describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it('Should load with correctly inital state', async () => {
  //   await expect(element(by.id('email'))).toHaveText('');
  //   await expect(element(by.id('password'))).toHaveText('');

  //   await expect(element(by.id('email-status'))).toHaveText('Required field');
  //   await expect(element(by.id('password-status'))).toHaveText(
  //     'Required field',
  //   );

  //   await expect(element(by.id('error-wrapper'))).not.toBeVisible();
  // });

  // it('Should present error state if form is invalid', async () => {
  //   await element(by.id('email')).typeText(faker.random.word());
  //   await element(by.id('password')).typeText(faker.random.alphaNumeric(3));

  //   await expect(
  //     element(by.id('email-status').and(by.text('Invalid data'))),
  //   ).toBeVisible();
  //   await expect(element(by.id('password-status'))).toHaveText('Invalid data');

  //   await expect(element(by.id('error-wrapper'))).not.toBeVisible();
  // });

  it('Should present error if invalid credentials are provided', async () => {
    await element(by.id('email')).typeText(faker.internet.email());
    await element(by.id('password')).typeText(faker.random.alphaNumeric(6));

    await element(by.id('button')).tap();

    // await expect(
    //   element(by.id('error-wrapper').and(by.id('spinbutton'))),
    // ).toExist();
  });
});
