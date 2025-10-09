import { Page, expect } from '@playwright/test';

export class CarritoPage {
  readonly page: Page;
  readonly preciosLocator;
  readonly subtotalLocator;

  constructor(page: Page) {
    this.page = page;
    this.preciosLocator = page.locator('td.product-subtotal.price bdi'); // Se define el localizador de los precios de los productos mediante el bloque donde se encuentra y las clases
    this.subtotalLocator = page.locator('tr.cart-subtotal .woocommerce-Price-amount bdi');  // Se define el localizador del precio subtotal mediante el bloque donde se encuentra y las clases
  }

  async validarCantidadDeItemsConValue() {
    // Selecciona todos los inputs que tienen value="1"
    const items = this.page.locator('input[value="1"]');
    const total = await items.count(); // Cuenta cuantos inputs con el localizador value="1" encuentra
    await expect(total).toBe(2); // Evalua que el numero de elementos con value="1" sea 2 igual a lo que se espera
  }
  // Validar que los producto mostrados en pantalla sean los enviados desde el caso de prueba
  async validarNombresVisiblesEnPantalla(nombreEsperado: string) {
      const elemento = this.page.getByRole('link', {name: nombreEsperado, exact: true }).first(); // Se define el localizador para buscar en pantalla los productos agregados al carrito
      await expect(elemento).toBeVisible(); // Se valida que el nombre del producto enviado desde el caso de prueba se muestre en el carrito
}


  async validarSubtotal() {
    // obtener todos los precios individuales
    const preciosTexto = await this.preciosLocator.allInnerTexts(); // Se define el localizar para obtener los precios de los productos agregados al carrito

    // limpiar texto y convertir a número
    const preciosNumeros = preciosTexto.map(texto =>
      Number(texto.replace(/[^0-9]/g, ''))
    );
    const totalProductos = preciosNumeros.reduce((a, b) => a + b, 0); // Suma los precios obtenidos
    const subtotalTexto = await this.subtotalLocator.innerText(); // Obtiene el precio del subtotal
    const subtotalNumero = Number(subtotalTexto.replace(/[^0-9]/g, '')); // LImpia el precio del subtotal
    expect(subtotalNumero).toBe(totalProductos); // Compara los totales validando que sean iguales
  }
  
}
        