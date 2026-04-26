import { test, expect } from '@playwright/test';

function generarPasosIA() {
  return [
    { action: 'goto', value: '/' },

    { action: 'click', selector: 'text=Log-in' },
    { action: 'waitFor', selector: 'form' },

    { action: 'fill', selector: 'input[name="email"]', value: 'test@test.com' },
    { action: 'fill', selector: 'input[name="password"]', value: '123456' },

    { action: 'submit' },

    { action: 'waitFor', selector: 'text=Log-out' }
  ];
}

test('login con agente IA', async ({ page }) => {

  const pasos = generarPasosIA();

  for (const paso of pasos) {

    if (paso.action === 'goto') {
      await page.goto(paso.value, { waitUntil: 'domcontentloaded' });
    }

    if (paso.action === 'click') {
      await page.click(paso.selector);
    }

    if (paso.action === 'fill') {
      await page.fill(paso.selector, paso.value);
       await page.waitForTimeout(1000); 
    }

    if (paso.action === 'submit') {
      await page.press('input[name="password"]', 'Enter');
    }

    if (paso.action === 'waitFor') {
      await page.waitForSelector(paso.selector);
    }

  }

});