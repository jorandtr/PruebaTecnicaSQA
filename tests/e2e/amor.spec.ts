import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CategoriaPage } from '../../pages/categoria.page';
import { CarritoPage } from '../../pages/carrito.page';
import { testData } from '../../fixtures/test-data';
import { capturarEvidencia } from '../../utils/screenshots';
test('Seleccionar dos productos de la categoría “Amor” y agregarlos al carrito', async ({ page }) => {
  
  const home = new HomePage(page);
  const categoria = new CategoriaPage(page);
  const carrito = new CarritoPage(page);
  const categorias = testData.categorias.amor;
  const producto1 = testData.productos.producto1;
  const producto2 = testData.productos.producto2;
  const stripeUrl = 'https://m.stripe.com/6';

  await home.irAHome();
  await home.abrirCategoria(categorias);
  const response1 = await categoria.agregarProductoAlCarrito(producto1, stripeUrl);
  await categoria.validarRespuestaDelServicio(response1);
  await home.abrirCategoria(categorias);
  const response2 = await categoria.agregarProductoAlCarrito(producto2, stripeUrl);
  await categoria.validarRespuestaDelServicio(response2);
  await carrito.validarCantidadDeItemsConValue();
  await carrito.validarNombresVisiblesEnPantalla(producto1);
  await carrito.validarNombresVisiblesEnPantalla(producto2);
  await carrito.validarSubtotal();
  await capturarEvidencia(page, 'Validar subtotal');
});