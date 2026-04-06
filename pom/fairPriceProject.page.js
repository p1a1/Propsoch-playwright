import {expect} from '@playwright/test';

export class FairPriceProjectPage{
    constructor(page) {
    this.page = page;
    this.projectName=page.locator("//h1");
    this.projectPrice=page.locator('p.text-text-neutral-inverted.space-x-1');
    this.compositeScore = page.locator('p.flex.items-end.gap-1');
    this.comparableProperty=page.locator("//div[@class='flex flex-col']/div[1]/div/div[1]")
    }

    async verifyProjectLoaded() {
    await expect(this.projectName, "Project name is not visible").toBeVisible();
    await expect(this.projectPrice,"Price is not visible").toBeVisible();      
  }

  async verifyCompositeScore(){
    await expect(this.compositeScore).toBeVisible();
    const scoreText = (await this.compositeScore.textContent())?.trim();
    await expect(this.compositeScore).toHaveText(/\d+\s*\/\s*100/);
  }

  async verifyComparableProperty(){
    await expect(this.comparableProperty).toBeVisible();
    await this.comparableProperty.screenshot({ path: 'reports/comparable-result.png' });
  }

}