const Page = require('@justeat/f-wdio-utils/src/page.object');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const {
    USER_MESSAGE_COMPONENT,
    USER_MESSAGE_CONTENT
} = require('./f-user-message-selectors');

module.exports = class UserMessage extends Page {
    constructor() {
        super('molecule', 'user-message-component');
    }

    get component () { return $(USER_MESSAGE_COMPONENT) }
    get content () { return this.component.$(USER_MESSAGE_CONTENT) }

    load () {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.path);
        this.open(pageUrl);
        this.waitForComponent();
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    open (url) {
        super.open(url);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isContentDisplayed () {
        const messageContent = this.content.getText();

        return this.content.isDisplayed() && messageContent.length > 0;
    }
}
