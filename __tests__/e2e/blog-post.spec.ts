import { test, expect } from '@playwright/test'

test.describe('Blog Post', () => {
  test('can navigate to blog post', async ({ page }) => {
    await page.goto('/blog')
    
    const postLink = page.locator('a[href^="/blog/"]').first()
    if (await postLink.count() > 0) {
      await postLink.click()
      await expect(page).toHaveURL(/\/blog\/.+/)
    }
  })

  test('content renders correctly', async ({ page }) => {
    await page.goto('/blog')
    
    const postLink = page.locator('a[href^="/blog/"]').first()
    if (await postLink.count() > 0) {
      await postLink.click()
      await expect(page.locator('article')).toBeVisible()
    }
  })

  test('"Back to blog" link works', async ({ page }) => {
    await page.goto('/blog')
    
    const postLink = page.locator('a[href^="/blog/"]').first()
    if (await postLink.count() > 0) {
      await postLink.click()
      await page.getByText(/back to blog/i).first().click()
      await expect(page).toHaveURL(/\/blog/)
    }
  })

  test('404 page shows for invalid slug', async ({ page }) => {
    await page.goto('/blog/non-existent-post')
    await expect(page.getByText('404')).toBeVisible()
  })
})

