import { test, expect } from '@playwright/test'

test.describe('Project Detail', () => {
  test('can navigate to project detail', async ({ page }) => {
    await page.goto('/projects')
    
    const projectLink = page.locator('a[href^="/projects/"]').first()
    if (await projectLink.count() > 0) {
      await projectLink.click()
      await expect(page).toHaveURL(/\/projects\/.+/)
    }
  })

  test('all sections render', async ({ page }) => {
    await page.goto('/projects')
    
    const projectLink = page.locator('a[href^="/projects/"]').first()
    if (await projectLink.count() > 0) {
      await projectLink.click()
      
      // Check for key sections
      await expect(page.getByText('Problem')).toBeVisible()
      await expect(page.getByText('Solution')).toBeVisible()
    }
  })

  test('404 page shows for invalid slug', async ({ page }) => {
    await page.goto('/projects/non-existent-project')
    await expect(page.getByText('404')).toBeVisible()
  })
})

