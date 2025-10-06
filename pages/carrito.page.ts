import { Page, expect } from '@playwright/test';

export class CarritoPage {
  readonly page: Page;
  readonly preciosLocator;
  readonly subtotalLocator;

  constructor(page: Page) {
    this.page = page;
    this.preciosLocator = page.locator('td.product-subtotal.price bdi');
    this.subtotalLocator = page.locator('tr.cart-subtotal .woocommerce-Price-amount bdi');
  }

  async validarCantidadDeItemsConValue() {
    // Selecciona todos los inputs que tienen value="1"
    const items = this.page.locator('input[value="1"]');
    const total = await items.count();

    console.log('Total de productos detectados con value="1": ${total}');
    await expect(total).toBe(2);
  }
  // Validar que los producto mostrados en pantalla sean los enviados desde el caso de prueba
  async validarNombresVisiblesEnPantalla(nombreEsperado: string) {
      const elemento = this.page.getByRole('link', {name: nombreEsperado, exact: true }).first();
      await expect(elemento).toBeVisible();
}


  async validarSubtotal() {
    // obtener todos los precios individuales
    const preciosTexto = await this.preciosLocator.allInnerTexts();

    // limpiar texto y convertir a número
    const preciosNumeros = preciosTexto.map(texto =>
      Number(texto.replace(/[^0-9]/g, ''))
    );
    const totalProductos = preciosNumeros.reduce((a, b) => a + b, 0); // Suma los precios obtenidos
    const subtotalTexto = await this.subtotalLocator.innerText(); // Obtiene el precio del subtotal
    const subtotalNumero = Number(subtotalTexto.replace(/[^0-9]/g, '')); // LImpia el precio del subtotal
    expect(subtotalNumero).toBe(totalProductos); // Compara los totales
  }
}
        