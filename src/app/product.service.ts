import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Controlo si se ha pasado el parámetro filter, en caso positivo   |
    | proceso el filtro para aplicarlo correctamente, construyendo una |
    | string 'filtro' que aplica todos los filtros necesarios en el    |
    | formato requerido por 'JSON Server'. También controlo que el     |
    | filtro de categría sea distinto de 0 para el caso en el que luego|
    | de aplicar un filtro de categoría se quite dicho filtro, en ese  |
    | caso la categoría del filtro viene seteada a 0 y ello provoca que|
    | la petición del cliente Http reciba  una lista de productos      |
    | vacía (todos los productos cuyo id de categoría es igual a 0)    |
    |                                                                  |
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Yellow Path                                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Adicionalmente si se ha indicado filtro de estado lo agrego a la |
    | string que procesará los filtros en la petición GET              |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    let filtro = '';

    if (filter) {
      if (filter.text) {
        filtro = '&q=' + filter.text;
        console.log('Aplicado filtro de texto:', filter.text);
      }
      if (filter.category && +filter.category !== 0) {
        filtro = filtro + '&category.id=' + filter.category;
        console.log('Aplicado filtro de categoría:', filter.category);
      }
      if (filter.state) {
        filtro = filtro + '&state=' + filter.state;
        console.log('Aplicado filtro de estado:', filter.state);
      }
    } else {
        console.log('Mostrando todos los productos (no aplican filtros)');
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pink Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Para aplicar la ordenación de datos en la petición basta con      |
    | incluir los parámetros indicados (_sort=publishedDate&_order=DESC)|
    | en el GET del cliente Http. Usamos ? antes para indicar que       |
    | lo que siguen son parámetros                                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | si se habían aplicado filtros en el formulario, la variable      |
    | 'filtro' tendrá almacenada una cadena de caracteres con el filtro|
    | en el formato requerido por 'JSON Server', en caso contrario,    |
    | estará vacía y no se aplicará ningún filtro                      |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    return this._http
      .get(`${this._backendUri}/products?_sort=publishedDate&_order=DESC&${filtro}`)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
