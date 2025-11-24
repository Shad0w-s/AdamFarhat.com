import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('can fill and submit form', async ({ page }) => {
    await page.goto('/contact')
    
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'Test message')
    
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('Message Sent!')).toBeVisible()
  })
  
  test('validates required fields', async ({ page }) => {
    await page.goto('/contact')
    
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('Name is required')).toBeVisible()
  })
})

