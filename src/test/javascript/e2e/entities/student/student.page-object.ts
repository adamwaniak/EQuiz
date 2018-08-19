import { element, by, ElementFinder } from 'protractor';

export class StudentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-student div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class StudentUpdatePage {
    pageTitle = element(by.id('jhi-student-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    scoreInput = element(by.id('field_score'));
    gradeInput = element(by.id('field_grade'));
    quizSelect = element(by.id('field_quiz'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setScoreInput(score) {
        await this.scoreInput.sendKeys(score);
    }

    async getScoreInput() {
        return this.scoreInput.getAttribute('value');
    }

    async setGradeInput(grade) {
        await this.gradeInput.sendKeys(grade);
    }

    async getGradeInput() {
        return this.gradeInput.getAttribute('value');
    }

    async quizSelectLastOption() {
        await this.quizSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async quizSelectOption(option) {
        await this.quizSelect.sendKeys(option);
    }

    getQuizSelect(): ElementFinder {
        return this.quizSelect;
    }

    async getQuizSelectedOption() {
        return this.quizSelect.element(by.css('option:checked')).getText();
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
