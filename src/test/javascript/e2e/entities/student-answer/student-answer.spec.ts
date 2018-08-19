import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentAnswerComponentsPage, StudentAnswerUpdatePage } from './student-answer.page-object';

describe('StudentAnswer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let studentAnswerUpdatePage: StudentAnswerUpdatePage;
    let studentAnswerComponentsPage: StudentAnswerComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load StudentAnswers', async () => {
        await navBarPage.goToEntity('student-answer');
        studentAnswerComponentsPage = new StudentAnswerComponentsPage();
        expect(await studentAnswerComponentsPage.getTitle()).toMatch(/Student Answers/);
    });

    it('should load create StudentAnswer page', async () => {
        await studentAnswerComponentsPage.clickOnCreateButton();
        studentAnswerUpdatePage = new StudentAnswerUpdatePage();
        expect(await studentAnswerUpdatePage.getPageTitle()).toMatch(/Create or edit a Student Answer/);
        await studentAnswerUpdatePage.cancel();
    });

    it('should create and save StudentAnswers', async () => {
        await studentAnswerComponentsPage.clickOnCreateButton();
        await studentAnswerUpdatePage.studentSelectLastOption();
        await studentAnswerUpdatePage.answerSelectLastOption();
        await studentAnswerUpdatePage.taskSelectLastOption();
        await studentAnswerUpdatePage.save();
        expect(await studentAnswerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
