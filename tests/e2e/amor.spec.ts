import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CategoriaPage } from '../../pages/categoria.page';
import { CarritoPage } from '../../pages/carrito.page';
test('Seleccionar dos productos de la categoría “Amor” y agregarlos al carrito', async ({ page }) => {
  const home = new HomePage(page);
  const categoria = new CategoriaPage(page);
  const carrito = new CarritoPage(page);

  await home.irAHome();
  await home.abrirCategoria('Amor');
  await categoria.agregarProductoAlCarrito('MDF 0001');
  await home.abrirCategoria('Amor');
  await categoria.agregarProductoAlCarrito('MDF 00010');
  await carrito.validarCantidadDeItemsConValue();
  await carrito.validarNombresVisiblesEnPantalla('MDF 0001');
  await carrito.validarNombresVisiblesEnPantalla('MDF 00010');
  await carrito.validarSubtotal();
});