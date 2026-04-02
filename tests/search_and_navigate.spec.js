import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';
import { FairPriceHomePage } from '../pom/fairPriceHome.page';
import { FairPriceProjectPage } from '../pom/fairPriceProject.page';
import { project } from '../testdata/project'; 

test("search and navigate",async({page})=>{
    const home = new FairPriceHomePage(page);
    const projectPage = new FairPriceProjectPage(page);

    // Step 1: Open page

    await page.goto('/fair-price-calculator');
    await expect(page).toHaveURL('https://www.propsoch.com/fair-price-calculator');
    await expect(page).toHaveTitle('Fair Price Calculator | Check Apartment Prices & Property Fairness in Bangalore | Propsoch');

    // Step 2: Search project
    await home.clickselectProperty();
    await home.searchProject(project.name);
    
    // Step 3: Click suggestion by its text value
    await home.clickSuggestion(project.name);
    await expect(page).toHaveTitle(`Fair Price Analysis - ${project.name} | Propsoch`);

    // Verify project loaded

    await projectPage.verifyProjectLoaded(project.name);

    //verify project name and price
    
    await expect(projectPage.projectName).toHaveText(project.name);
    await expect(projectPage.projectPrice).toBeVisible();

    //capture screenshot of the result
    await page.screenshot({ path: 'reports/fair-price-result.png', fullPage: true });    

});

test('Verify Score and Comparables',async({page})=>{
        const projectPage = new FairPriceProjectPage(page);
        // open page
        await projectPage.goto();
        await expect(page).toHaveTitle(`Fair Price Analysis - ${project.name} | Propsoch`);
        // verify project loaded
        await projectPage.verifyProjectLoaded(project.name);

        // verify composite Score are visible or not
        await projectPage.verifyCompositeScore();

        //verify atleast one comparable property is present
        await projectPage.verifyComparableProperty();
    });

test("no results found",async({page})=>{
    const home = new FairPriceHomePage(page);
    const projectPage = new FairPriceProjectPage(page);
    // Step 1: Open page
    await page.goto('/fair-price-calculator');
    await expect(page).toHaveTitle('Fair Price Calculator | Check Apartment Prices & Property Fairness in Bangalore | Propsoch');

    // Step 2: Search project
    await home.clickselectProperty();
    await home.searchProject(project.absent_name);
    // Step 3: Verify no suggestions
    await expect(home.noResults).toBeVisible();


});
