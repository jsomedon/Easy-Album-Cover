// () => Promise(tabs.Tab)
const current_tab = () =>
    browser.tabs.query({
        currentWindow: true,
        active: true
    })
        .then(([tab]) => tab);

// not really useful for now because we only have
// content script that extract url
const req_msgs = ["EXTRACTOR"];

// tabs.Tab => Promise([response...])
const request = ({ id }) =>
    Promise.all(req_msgs.map(req_msg =>
        browser.tabs.sendMessage(id, req_msg)));

const handle_response = (resps) => {
    for ({ type, value } of resps) {
        if (type == "EXTRACTOR") {
            browser.tabs.create({ url: value });
        }
    }
};

const browser_action_click_handler = () =>
    current_tab()
        .then(request)
        .then(handle_response);

browser.browserAction.onClicked.addListener(browser_action_click_handler);
