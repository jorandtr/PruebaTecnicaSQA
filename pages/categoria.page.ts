import { Page } from '@playwright/test';

export class CategoriaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async agregarProductoAlCarrito(nombreProducto: string) {

    const producto = this.page.getByText(nombreProducto) // Se define el producto enviado desde el caso de prueba para ser añadido al carrito
    const addCarritoBoton = this.page.getByRole('button', { name: 'Añadir al carrito ' }) // Se define el localizador del boton añadir al carrito

    await producto.first().click();
    await this.page.waitForLoadState('networkidle');
    await addCarritoBoton.click();
    await this.page.waitForLoadState('networkidle');
  }
}