import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Adam Farhat/)
  })

  test('all sections visible', async ({ page }) => {
    await page.goto('/')
    
    // Check for hero section
    await expect(page.getByText(/a student founder curious about/i)).toBeVisible()
    
    // Check for projects section
    await expect(page.getByText('Projects')).toBeVisible()
    
    // Check for about section
    await expect(page.getByText('About')).toBeVisible()
    
    // Check for blog section
    await expect(page.getByText('Recent Posts')).toBeVisible()
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/')
    
    // Test Projects link
    await page.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects/)
    
    // Test Blog link
    await page.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog/)
    
    // Test About link
    await page.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/about/)
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/')
    
    const themeToggle = page.getByLabel(/toggle theme|switch to/i)
    await expect(themeToggle).toBeVisible()
    
    // Click theme toggle
    await themeToggle.click()
    
    // Check if dark class is applied
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })
})

