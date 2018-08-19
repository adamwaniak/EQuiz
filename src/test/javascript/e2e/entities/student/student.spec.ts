import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentComponentsPage, StudentUpdatePage } from './student.page-object';

describe('Student e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let studentUpdatePage: StudentUpdatePage;
    let studentComponentsPage: StudentComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Students', async () => {
        await navBarPage.goToEntity('student');
        studentComponentsPage = new StudentComponentsPage();
        expect(await studentComponentsPage.getTitle()).toMatch(/Students/);
    });

    it('should load create Student page', async () => {
        await studentComponentsPage.clickOnCreateButton();
        studentUpdatePage = new StudentUpdatePage();
        expect(await studentUpdatePage.getPageTitle()).toMatch(/Create or edit a Student/);
        await studentUpdatePage.cancel();
    });

    it('should create and save Students', async () => {
        await studentComponentsPage.clickOnCreateButton();
        await studentUpdatePage.setNameInput('name');
        expect(await studentUpdatePage.getNameInput()).toMatch('name');
        await studentUpdatePage.setScoreInput('5');
        expect(await studentUpdatePage.getScoreInput()).toMatch('5');
        await studentUpdatePage.setGradeInput('grade');
        expect(await studentUpdatePage.getGradeInput()).toMatch('grade');
        await studentUpdatePage.quizSelectLastOption();
        await studentUpdatePage.save();
        expect(await studentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
