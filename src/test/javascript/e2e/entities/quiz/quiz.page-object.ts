import { element, by, ElementFinder } from 'protractor';

export class QuizComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-quiz div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class QuizUpdatePage {
    pageTitle = element(by.id('jhi-quiz-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));
    passwordInput = element(by.id('field_password'));
    editionInput = element(by.id('field_edition'));
    urlInput = element(by.id('field_url'));
    maxTimeInMinutesInput = element(by.id('field_maxTimeInMinutes'));
    ownerSelect = element(by.id('field_owner'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    async setEditionInput(edition) {
        await this.editionInput.sendKeys(edition);
    }

    async getEditionInput() {
        return this.editionInput.getAttribute('value');
    }

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async setMaxTimeInMinutesInput(maxTimeInMinutes) {
        await this.maxTimeInMinutesInput.sendKeys(maxTimeInMinutes);
    }

    async getMaxTimeInMinutesInput() {
        return this.maxTimeInMinutesInput.getAttribute('value');
    }

    async ownerSelectLastOption() {
        await this.ownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ownerSelectOption(option) {
        await this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect(): ElementFinder {
        return this.ownerSelect;
    }

    async getOwnerSelectedOption() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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
