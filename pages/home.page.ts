import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }
  async irAHome() {
    await this.page.goto('/'); // Toma la URL de la base URL del archivo config
  }

  async abrirCategoria(nombre: string) {
  const categoriaLink = this.page.locator('#primary-menu').getByRole('link', { name: nombre });
    await categoriaLink.click();
    await this.page.waitForLoadState('networkidle'); // Espera que cargue completamente el sitio
  }  
}