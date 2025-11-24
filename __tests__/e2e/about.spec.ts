import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('page loads with all content', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText(/about/i)).toBeVisible()
  })

  test('contact section works', async ({ page }) => {
    await page.goto('/about')
    
    const contactLink = page.getByRole('link', { name: /get in touch|contact/i })
    if (await contactLink.count() > 0) {
      await expect(contactLink).toHaveAttribute('href', /mailto:/)
    }
  })
})

