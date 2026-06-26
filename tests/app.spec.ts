import { test, expect } from '@playwright/test';

test.describe('Brokerage Intelligence Suite - E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ─── TEST 1: Page loads ─────────────────────────────────────────────────────
  test('Page loads and displays default Interactive KPI Matrix view', async ({ page }) => {
    // Use first() — both mobile header & desktop sidebar have an h1
    await expect(page.locator('h1').first()).toContainText('Brokerage Intel');

    // Default tab content — KPI Parameter sticky column header
    await expect(page.locator('text=KPI Parameter')).toBeVisible();

    // Broker filter controls should be visible
    await expect(page.locator('text=Compare Distribution Partners')).toBeVisible();
  });

  // ─── TEST 2: Sidebar navigation ────────────────────────────────────────────
  test('Sidebar Navigation works correctly', async ({ page }) => {
    // Partner Benchmarking → HeadToHead heading
    await page.locator('aside button:has-text("Partner Benchmarking")').click();
    await expect(page.locator('text=Partner Benchmarking Comparer')).toBeVisible();

    // Strategic Partner Profiles → BrokerProfiler (shows broker tab row)
    await page.locator('aside button:has-text("Strategic Partner Profiles")').click();
    await expect(page.locator('text=Operational & Balance-Sheet Auditing')).toBeVisible();

    // Visual Performance Analytics → KPICharts
    await page.locator('aside button:has-text("Visual Performance Analytics")').click();
    await expect(page.locator('text=Select Parameter to Visualize')).toBeVisible();

    // Disclosure Analytics → DisclosureCard
    await page.locator('aside button:has-text("Disclosure Analytics")').click();
    await expect(page.locator('text=Regulatory Disclosure & Market Intelligence Portal')).toBeVisible();

    // CFO Strategic Insights
    await page.locator('aside button:has-text("CFO Strategic Insights")').click();
    await expect(page.locator('text=CFO Strategic Insights Desk')).toBeVisible();

    // Scenario Projections Model → ProjectionsModel
    await page.locator('aside button:has-text("Scenario Projections Model")').click();
    await expect(page.locator('text=FY27 Business Model Projection Desk')).toBeVisible();
  });

  // ─── TEST 3: Search filter ─────────────────────────────────────────────────
  test('KPI Matrix parameter search filters rows correctly', async ({ page }) => {
    await page.locator('aside button:has-text("Interactive KPI Matrix")').click();

    const initialRows = await page.locator('table tbody tr').count();

    await page.fill('input[placeholder*="Search all 28 KPIs"]', 'employee');
    await page.waitForTimeout(300);

    const filteredRows = await page.locator('table tbody tr').count();
    expect(filteredRows).toBeLessThan(initialRows);
    await expect(page.locator('table tbody')).toContainText('Employee Cost');
  });

  // ─── TEST 4: Category pill filter ──────────────────────────────────────────
  test('KPI Matrix category selection filters parameters', async ({ page }) => {
    await page.locator('aside button:has-text("Interactive KPI Matrix")').click();

    // Click the Expenses category pill
    await page.click('button:has-text("Expenses")');

    await expect(page.locator('table tbody')).toContainText('Employee Cost');
    await expect(page.locator('table tbody')).not.toContainText('Broking Income');
  });

  // ─── TEST 5: Broker filter ─────────────────────────────────────────────────
  test('Broker Filter - Select All / Deselect All / Multi-Select', async ({ page }) => {
    await page.locator('aside button:has-text("Interactive KPI Matrix")').click();

    // Deselect all
    await page.click('button:has-text("Deselect All")');

    // Empty-state card appears
    await expect(page.locator('text=No Brokerage Partners Selected')).toBeVisible();

    // Restore via the call-to-action in the empty state
    await page.click('button:has-text("Select All Partners")');

    // Table is back with at least one broker column
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=KPI Parameter')).toBeVisible();
  });

  // ─── TEST 6: Mobile responsive drawer ──────────────────────────────────────
  test('Mobile responsive drawer toggles correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    // Desktop aside should be hidden on mobile
    const desktopAside = page.locator('aside');
    await expect(desktopAside).not.toBeVisible();

    // Mobile header hamburger button is visible
    const menuButton = page.locator('header button');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile drawer slides in — look for the drawer's regulatory note
    // (scoped with .lg\\:hidden parent to avoid matching the desktop aside)
    await expect(
      page.locator('.fixed.inset-y-0 >> text=Regulatory Transition Note')
    ).toBeVisible();

    // Navigate to CFO Insights from inside the drawer
    await page.locator('.fixed.inset-y-0 button:has-text("CFO Strategic Insights")').click();

    // Drawer closes and page content switches
    await expect(page.locator('text=CFO Strategic Insights Desk')).toBeVisible();
  });

});
