import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: string, ): string {
    return value.split('').reverse().join('');
  }

}
