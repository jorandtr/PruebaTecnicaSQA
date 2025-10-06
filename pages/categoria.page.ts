import { Page } from '@playwright/test';

export class CategoriaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async agregarProductoAlCarrito(nombreProducto: string) {

    const producto = this.page.getByText(nombreProducto)
    const addCarritoBoton = this.page.getByRole('button', { name: 'Añadir al carrito ' })

    await producto.first().click();
    await this.page.waitForLoadState('networkidle');
    await addCarritoBoton.click();
    await this.page.waitForLoadState('networkidle');
  }
}