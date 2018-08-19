import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaskSetComponentsPage, TaskSetUpdatePage } from './task-set.page-object';

describe('TaskSet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let taskSetUpdatePage: TaskSetUpdatePage;
    let taskSetComponentsPage: TaskSetComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TaskSets', async () => {
        await navBarPage.goToEntity('task-set');
        taskSetComponentsPage = new TaskSetComponentsPage();
        expect(await taskSetComponentsPage.getTitle()).toMatch(/Task Sets/);
    });

    it('should load create TaskSet page', async () => {
        await taskSetComponentsPage.clickOnCreateButton();
        taskSetUpdatePage = new TaskSetUpdatePage();
        expect(await taskSetUpdatePage.getPageTitle()).toMatch(/Create or edit a Task Set/);
        await taskSetUpdatePage.cancel();
    });

    it('should create and save TaskSets', async () => {
        await taskSetComponentsPage.clickOnCreateButton();
        await taskSetUpdatePage.setNameInput('name');
        expect(await taskSetUpdatePage.getNameInput()).toMatch('name');
        await taskSetUpdatePage.setRequiredTaskAmountInput('5');
        expect(await taskSetUpdatePage.getRequiredTaskAmountInput()).toMatch('5');
        await taskSetUpdatePage.setMaxPointInput('5');
        expect(await taskSetUpdatePage.getMaxPointInput()).toMatch('5');
        const selectedArtificialSelection = taskSetUpdatePage.getArtificialSelectionInput();
        if (await selectedArtificialSelection.isSelected()) {
            await taskSetUpdatePage.getArtificialSelectionInput().click();
            expect(await taskSetUpdatePage.getArtificialSelectionInput().isSelected()).toBeFalsy();
        } else {
            await taskSetUpdatePage.getArtificialSelectionInput().click();
            expect(await taskSetUpdatePage.getArtificialSelectionInput().isSelected()).toBeTruthy();
        }
        await taskSetUpdatePage.quizSelectLastOption();
        await taskSetUpdatePage.save();
        expect(await taskSetUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
