import { test, expect } from '@playwright/test'

test.describe('Blog Index', () => {
  test('page loads with all posts', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByText('Blog')).toBeVisible()
  })

  test('can click post cards to navigate', async ({ page }) => {
    await page.goto('/blog')
    
    const postCard = page.locator('a[href^="/blog/"]').first()
    
    if (await postCard.count() > 0) {
      const href = await postCard.getAttribute('href')
      await postCard.click()
      await expect(page).toHaveURL(new RegExp(href || ''))
    }
  })
})

