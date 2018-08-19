import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaskComponentsPage, TaskUpdatePage } from './task.page-object';

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Tasks', async () => {
        await navBarPage.goToEntity('task');
        taskComponentsPage = new TaskComponentsPage();
        expect(await taskComponentsPage.getTitle()).toMatch(/Tasks/);
    });

    it('should load create Task page', async () => {
        await taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(await taskUpdatePage.getPageTitle()).toMatch(/Create or edit a Task/);
        await taskUpdatePage.cancel();
    });

    it('should create and save Tasks', async () => {
        await taskComponentsPage.clickOnCreateButton();
        await taskUpdatePage.setQuestionInput('question');
        expect(await taskUpdatePage.getQuestionInput()).toMatch('question');
        await taskUpdatePage.typeSelectLastOption();
        await taskUpdatePage.setCorectnessFactorInput('5');
        expect(await taskUpdatePage.getCorectnessFactorInput()).toMatch('5');
        await taskUpdatePage.taskSetSelectLastOption();
        await taskUpdatePage.save();
        expect(await taskUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
