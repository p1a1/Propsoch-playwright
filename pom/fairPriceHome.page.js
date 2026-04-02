import {expect} from '@playwright/test';

export class FairPriceHomePage{


    constructor(page){
         this.page = page;
         this.selectproperty=page.getByText('Select a Property');
         this.searchBar=page.getByRole('combobox');
         this.suggestions = page.locator("//div[@role='group']/div");
         this.noResults = page.getByText('No properties found.')


    }

    async clickselectProperty() {
    await this.selectproperty.click();
  }
    async searchProject(name) {
    await this.searchBar.fill(name);
  }
 
  async clickSuggestion(name) {
    const suggestioncount = await this.suggestions.count();
    for (let i=0; i<suggestioncount; i++){
        if (await this.suggestions.nth(i).locator("h2").textContent() === name) {
            await this.suggestions.nth(i).click();
    }
    }
   
  }
  
}