// utils/screenshots.ts
import { Page, test } from '@playwright/test';

export async function capturarEvidencia(page: Page, nombre: string) {
  // Quita caracteres no válidos en nombres de archivo
  const safeName = nombre.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  // Captura la pantalla
  const screenshot = await page.screenshot({ path: `screenshots/${safeName}.png`, fullPage: true });

  // Adjunta la imagen al reporte HTML
  await test.info().attach(nombre, {
    body: screenshot,
    contentType: 'image/png',
  });
}