const {test, expect} = require('@playwright/test');

test('calender validation', async({page}) =>
{
  const monthnumber = "06";
  const date = "15";
  const year = "2027";
  const expectedList = [monthnumber,date,year];
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  //await page.locator('.react-date-picker_inputgroup').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.getByText(year).click();
  await page.getByRole('button', { name: 'June' }).click();
  //await page.locator(".react-calender_year-view_months_month").nth(5).click();
  await page.locator("//abbr[text()='"+date+"']").click();

  const inputs = page.locator('.react-date-picker__inputGroup');
  for(let i =0; i<expectedList.length; i++)
  {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
  }






})