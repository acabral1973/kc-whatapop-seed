import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                         |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| El pipe PublicationDatePipe, a partir de una fecha dada, devuelve |
| una cadena de caracteres  que indica el tiempo transcurrido desde |
| dicha fecha. Por ejemplo: 'hace 2 horas'                          |
| La función de transformación esta desarrollada de forma que si el |
| parámetro fecha no tuviera valor (null o undefined) devuelve una  |
| string "neutra" y si lo tiene aplica el método indicado...        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

@Pipe({
  name: 'PublicationDatePipe'
})

export class PublicationDatePipe implements PipeTransform {

  transform(fecha: string): string {

    if (fecha) {
        return 'Publicado hace ' + moment(fecha).fromNow();
    } else {
       return 'Fecha de publicación desconocida';
    }
  }
}
