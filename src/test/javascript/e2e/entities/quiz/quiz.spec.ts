import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuizComponentsPage, QuizUpdatePage } from './quiz.page-object';

describe('Quiz e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let quizUpdatePage: QuizUpdatePage;
    let quizComponentsPage: QuizComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Quizzes', async () => {
        await navBarPage.goToEntity('quiz');
        quizComponentsPage = new QuizComponentsPage();
        expect(await quizComponentsPage.getTitle()).toMatch(/Quizzes/);
    });

    it('should load create Quiz page', async () => {
        await quizComponentsPage.clickOnCreateButton();
        quizUpdatePage = new QuizUpdatePage();
        expect(await quizUpdatePage.getPageTitle()).toMatch(/Create or edit a Quiz/);
        await quizUpdatePage.cancel();
    });

    it('should create and save Quizzes', async () => {
        await quizComponentsPage.clickOnCreateButton();
        await quizUpdatePage.setNameInput('name');
        expect(await quizUpdatePage.getNameInput()).toMatch('name');
        await quizUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await quizUpdatePage.getStartDateInput()).toContain('2001-01-01T02:30');
        await quizUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await quizUpdatePage.getEndDateInput()).toContain('2001-01-01T02:30');
        await quizUpdatePage.setPasswordInput('password');
        expect(await quizUpdatePage.getPasswordInput()).toMatch('password');
        await quizUpdatePage.setEditionInput('5');
        expect(await quizUpdatePage.getEditionInput()).toMatch('5');
        await quizUpdatePage.setUrlInput('url');
        expect(await quizUpdatePage.getUrlInput()).toMatch('url');
        await quizUpdatePage.setMaxTimeInMinutesInput('5');
        expect(await quizUpdatePage.getMaxTimeInMinutesInput()).toMatch('5');
        await quizUpdatePage.ownerSelectLastOption();
        await quizUpdatePage.save();
        expect(await quizUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
