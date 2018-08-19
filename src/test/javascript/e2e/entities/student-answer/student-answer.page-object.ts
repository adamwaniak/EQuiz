import { element, by, ElementFinder } from 'protractor';

export class StudentAnswerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-student-answer div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class StudentAnswerUpdatePage {
    pageTitle = element(by.id('jhi-student-answer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    studentSelect = element(by.id('field_student'));
    answerSelect = element(by.id('field_answer'));
    taskSelect = element(by.id('field_task'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async studentSelectLastOption() {
        await this.studentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async studentSelectOption(option) {
        await this.studentSelect.sendKeys(option);
    }

    getStudentSelect(): ElementFinder {
        return this.studentSelect;
    }

    async getStudentSelectedOption() {
        return this.studentSelect.element(by.css('option:checked')).getText();
    }

    async answerSelectLastOption() {
        await this.answerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async answerSelectOption(option) {
        await this.answerSelect.sendKeys(option);
    }

    getAnswerSelect(): ElementFinder {
        return this.answerSelect;
    }

    async getAnswerSelectedOption() {
        return this.answerSelect.element(by.css('option:checked')).getText();
    }

    async taskSelectLastOption() {
        await this.taskSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async taskSelectOption(option) {
        await this.taskSelect.sendKeys(option);
    }

    getTaskSelect(): ElementFinder {
        return this.taskSelect;
    }

    async getTaskSelectedOption() {
        return this.taskSelect.element(by.css('option:checked')).getText();
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
