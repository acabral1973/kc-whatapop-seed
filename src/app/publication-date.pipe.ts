import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| El pipe PublicationDatePipe, a partir d euna fecha dada, devuelve|
| una cadena de caracteres  que indica el tiempo transcurrido desde|
| dicha fecha. Por ejemplo: 'hace 2 horas'                         |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
