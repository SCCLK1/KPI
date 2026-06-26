import { test, expect } from '@playwright/test';

test.describe('Brokerage Intelligence Suite - E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('Page loads and displays default Interactive KPI Matrix view', async ({ page }) => {
    // Verify Page Title or Heading
    await expect(page.locator('h1')).toContainText('Brokerage Intel');
    
    // Verify default tab content (KPI Matrix) is visible
    await expect(page.locator('text=Interactive KPI Matrix')).toBeVisible();
    await expect(page.locator('text=KPI Parameter')).toBeVisible();
  });

  test('Sidebar Navigation works correctly', async ({ page }) => {
    // Click Partner Benchmarking
    await page.click('text=Partner Benchmarking');
    await expect(page.locator('text=Head-to-Head Comparison')).toBeVisible();

    // Click Strategic Partner Profiles
    await page.click('text=Strategic Partner Profiles');
    await expect(page.locator('text=Select Partner to Audit')).toBeVisible();

    // Click Visual Performance Analytics
    await page.click('text=Visual Performance Analytics');
    await expect(page.locator('text=Visual Financial Benchmarking')).toBeVisible();

    // Click Disclosure Analytics
    await page.click('text=Disclosure Analytics');
    await expect(page.locator('text=Conceptual & Regulatory Disclosures')).toBeVisible();

    // Click CFO Strategic Insights
    await page.click('text=CFO Strategic Insights');
    await expect(page.locator('text=Balance-Sheet and Operational Insights')).toBeVisible();

    // Click Scenario Projections Model
    await page.click('text=Scenario Projections Model');
    await expect(page.locator('text=Dynamic Financial Scenario Projections')).toBeVisible();
  });

  test('KPI Matrix parameter search filters rows correctly', async ({ page }) => {
    // Make sure we are on matrix tab
    await page.click('text=Interactive KPI Matrix');

    // Count initial parameters row headers
    const initialRows = await page.locator('table tbody tr').count();
    
    // Search for a specific term, e.g. "employee"
    await page.fill('input[placeholder*="Search all 28 KPIs"]', 'employee');
    await page.waitForTimeout(300); // Wait for input debounce/reactions if any
    
    // Verify row count is smaller
    const filteredRows = await page.locator('table tbody tr').count();
    expect(filteredRows).toBeLessThan(initialRows);
    await expect(page.locator('table tbody')).toContainText('Employee Cost');
  });

  test('KPI Matrix category selection filters parameters', async ({ page }) => {
    await page.click('text=Interactive KPI Matrix');

    // Click "Expenses" category pill
    await page.click('button:has-text("Expenses")');
    
    // Check that we only see Expenses parameters
    await expect(page.locator('table tbody')).toContainText('Employee Cost');
    await expect(page.locator('table tbody')).not.toContainText('Broking Income');
  });

  test('Broker Filter - Select All / Deselect All / Multi-Select', async ({ page }) => {
    await page.click('text=Interactive KPI Matrix');

    // Click Deselect All
    await page.click('button:has-text("Deselect All")');

    // Verify empty state placeholder is shown
    await expect(page.locator('text=No Brokerage Partners Selected')).toBeVisible();

    // Click Select All Partners button in empty state
    await page.click('button:has-text("Select All Partners")');

    // Verify table is restored
    await expect(page.locator('text=KPI Parameter')).toBeVisible();
    await expect(page.locator('table')).toContainText('Groww');
  });

  test('Mobile responsive drawer toggles correctly', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 });

    // Desktop sidebar should be hidden
    const desktopSidebar = page.locator('aside');
    await expect(desktopSidebar).not.toBeVisible();

    // Mobile header open menu button should be visible
    const menuButton = page.locator('header button');
    await expect(menuButton).toBeVisible();

    // Click menu button
    await menuButton.click();

    // Mobile drawer should slide in and be visible
    const mobileDrawer = page.locator('text=Regulatory Transition Note');
    await expect(mobileDrawer).toBeVisible();

    // Click CFO Strategic Insights inside drawer
    await page.click('button:has-text("CFO Strategic Insights")');

    // Drawer should close and view should switch
    await expect(page.locator('text=Balance-Sheet and Operational Insights')).toBeVisible();
  });
});
