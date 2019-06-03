import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === "string" && value.length === 10) {
      let areaCode = value.substring(0, 3);
      let prefix = value.substring(3, 6);
      let exchange = value.substring(6);
      return `(${areaCode}) ${prefix}-${exchange}`;
    } else {
      return value;
    }
  }
}
