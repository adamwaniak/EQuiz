import { element, by, ElementFinder } from 'protractor';

export class TaskSetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-task-set div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TaskSetUpdatePage {
    pageTitle = element(by.id('jhi-task-set-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    requiredTaskAmountInput = element(by.id('field_requiredTaskAmount'));
    maxPointInput = element(by.id('field_maxPoint'));
    artificialSelectionInput = element(by.id('field_artificialSelection'));
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

    async setRequiredTaskAmountInput(requiredTaskAmount) {
        await this.requiredTaskAmountInput.sendKeys(requiredTaskAmount);
    }

    async getRequiredTaskAmountInput() {
        return this.requiredTaskAmountInput.getAttribute('value');
    }

    async setMaxPointInput(maxPoint) {
        await this.maxPointInput.sendKeys(maxPoint);
    }

    async getMaxPointInput() {
        return this.maxPointInput.getAttribute('value');
    }

    getArtificialSelectionInput() {
        return this.artificialSelectionInput;
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
