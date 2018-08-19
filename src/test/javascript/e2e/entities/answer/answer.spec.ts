import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnswerComponentsPage, AnswerUpdatePage } from './answer.page-object';

describe('Answer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let answerUpdatePage: AnswerUpdatePage;
    let answerComponentsPage: AnswerComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Answers', async () => {
        await navBarPage.goToEntity('answer');
        answerComponentsPage = new AnswerComponentsPage();
        expect(await answerComponentsPage.getTitle()).toMatch(/Answers/);
    });

    it('should load create Answer page', async () => {
        await answerComponentsPage.clickOnCreateButton();
        answerUpdatePage = new AnswerUpdatePage();
        expect(await answerUpdatePage.getPageTitle()).toMatch(/Create or edit a Answer/);
        await answerUpdatePage.cancel();
    });

    it('should create and save Answers', async () => {
        await answerComponentsPage.clickOnCreateButton();
        await answerUpdatePage.setNameInput('name');
        expect(await answerUpdatePage.getNameInput()).toMatch('name');
        const selectedIsCorrect = answerUpdatePage.getIsCorrectInput();
        if (await selectedIsCorrect.isSelected()) {
            await answerUpdatePage.getIsCorrectInput().click();
            expect(await answerUpdatePage.getIsCorrectInput().isSelected()).toBeFalsy();
        } else {
            await answerUpdatePage.getIsCorrectInput().click();
            expect(await answerUpdatePage.getIsCorrectInput().isSelected()).toBeTruthy();
        }
        await answerUpdatePage.taskSelectLastOption();
        await answerUpdatePage.save();
        expect(await answerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
