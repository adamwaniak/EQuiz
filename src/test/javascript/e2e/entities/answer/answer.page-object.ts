import { element, by, ElementFinder } from 'protractor';

export class AnswerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-answer div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class AnswerUpdatePage {
    pageTitle = element(by.id('jhi-answer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    isCorrectInput = element(by.id('field_isCorrect'));
    taskSelect = element(by.id('field_task'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getIsCorrectInput() {
        return this.isCorrectInput;
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
