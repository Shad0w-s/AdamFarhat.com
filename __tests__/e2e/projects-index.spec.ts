import { test, expect } from '@playwright/test'

test.describe('Projects Index', () => {
  test('page loads with all projects', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByText('Projects')).toBeVisible()
  })

  test('can click project cards to navigate', async ({ page }) => {
    await page.goto('/projects')
    
    // Wait for projects to load
    const projectCard = page.locator('a[href^="/projects/"]').first()
    
    if (await projectCard.count() > 0) {
      const href = await projectCard.getAttribute('href')
      await projectCard.click()
      await expect(page).toHaveURL(new RegExp(href || ''))
    }
  })
})

