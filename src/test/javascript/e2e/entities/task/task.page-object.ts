import { element, by, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    questionInput = element(by.id('field_question'));
    correctnessFactorInput = element(by.id('field_correctnessFactor'));
    imageInput = element(by.id('file_image'));
    taskSetSelect = element(by.id('field_taskSet'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuestionInput(question) {
        await this.questionInput.sendKeys(question);
    }

    async getQuestionInput() {
        return this.questionInput.getAttribute('value');
    }

    async setCorrectnessFactorInput(correctnessFactor) {
        await this.correctnessFactorInput.sendKeys(correctnessFactor);
    }

    async getCorrectnessFactorInput() {
        return this.correctnessFactorInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async taskSetSelectLastOption() {
        await this.taskSetSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async taskSetSelectOption(option) {
        await this.taskSetSelect.sendKeys(option);
    }

    getTaskSetSelect(): ElementFinder {
        return this.taskSetSelect;
    }

    async getTaskSetSelectedOption() {
        return this.taskSetSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
