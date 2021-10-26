// node HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json
let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

async function run(){
    let browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized'
        ],
        defaultViewport: null
    });

    // let pages = await browser.newPage();
    // pages.goto(args.url);

    let pages = await browser.pages();
    let page = pages[0];
    page.goto(args.url);
    
    //first login
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    //Second login button
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']")
    await page.click("a[href='https://www.hackerrank.com/login']");
    
   //Actual login - username
   await page.waitForSelector("input[name='username']");
   await page.type("input[name='username']", configJSO.userid, {delay: 30});
   
   //Actual login - password
   await page.waitForSelector("input[name='password']");
   await page.type("input[name='password']", configJSO.password, {delay: 30});

   //clicking the final login
   await page.waitForSelector("button[data-analytics='LoginPassword']");
   await page.click("button[data-analytics='LoginPassword']");
   
   //Clicking on compete
   await page.waitForSelector("a[data-analytics='NavBarContests']");
   await page.click("a[data-analytics='NavBarContests']");
   
   //manage contest clicking
   await page.waitForSelector("a[href='/administration/contests/']");
   await page.click("a[href='/administration/contests/']");

   //click on first contest
   await page.waitForSelector("p.mmT");
   await page.click("p.mmT");

   await page.waitFor(3000);

   //moderator clicking
   await page.waitForSelector("li[data-tab='moderators']");
   await page.click("li[data-tab='moderators']");

   //Typing in moderator for first contest
   await page.waitForSelector("input#moderator");
   await page.type("input#moderator", configJSO.moderator, {delay: 30});
   
   //saving the first moderator added!
   //await page.keyboard.press("Enter");


}

run();
