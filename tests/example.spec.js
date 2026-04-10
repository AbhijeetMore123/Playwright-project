import{chromium} from '@playwright/test';
(async() =>
{
const browser= await chromium.launch({headless: false});
const context =await browser.newContext();
const page1= await context.newPage();
const page2= await context.newPage();
const page3 =await context.newPage();
 await page1.goto('https: ')
 await page2.goto('https://amazon.in');
await page3.goto('https: ');
const flipkartTitle= await page1.title();
const amazinTitle = await page2.title();
const mytraTitle = await page3.title();

if(flipKartTitle.includes('Flipkart'))
{
await page1.close();
console.log('closed Flipkart tab');
}

console.log('amazon title: ',  amazonTitle);
console.log('Myntra.title: ', myntraTitle);
//await page.close();
}
);