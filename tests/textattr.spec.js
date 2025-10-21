const {test, expect} = require("playwright/test");

// text assertions, attribute assertions, network request/response event, soft assertions
test('text assertion test', async ({page}) => {
    page.on('request', req => console.log('Incoming', req.url()))
    page.on('response', res => console.log('Outgoing', res.url()))

    await page.goto('https://example.com')
    const heading = page.locator('h1')
    await expect.soft(heading).toHaveText(/Example/)
    const learnmore = page.locator('a')
    await expect(learnmore).toHaveAttribute('href', 'https://iana.org/domains/example')
    console.log('continues')   
})

// attribute assertions, manual retries, console event
test('attribute assertion test', async ({page}) => {
    page.on('console', msg => {
        console.log('Console:', msg)
    })
    // manual retry
    for(let i =0; i < 3; i++) {
        try {
            await page.goto('https://example.com')
            const learnmore = page.locator('a')
            expect(learnmore).toHaveAttribute('href', 'https://iana.org/domains/example')
            break;
        } catch(err) {
            console.log(err);
        }
    }
})

// safer btn click via custom timeout
async function safeBtnClick(page, selector) {
    try {
        await page.click(selector, { timeout: 5000 })
    } catch(err) {
        console.error(err)
    }
}

// console event test, safebtn click
test.skip('console event test', async ({page}) => {
    page.on('console', msg => {
        console.log('Console:', msg.text())
    })
    await page.goto('http://127.0.0.1:5500/frontend/index.html')
    await safeBtnClick(page, '#mybtn')
    // expect(heading).toHaveText(/Example/)
    // console.log(heading)
})