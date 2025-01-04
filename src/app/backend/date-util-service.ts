import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor(private datePipe: DatePipe) {
  }

  convertDateToIsoFormatString(date: Date): string {
    const result = this.datePipe.transform(date, 'yyyy-MM-dd')
    if (result == null) {
      throw new Error('Error converting date to iso format: ' + date)
    }
    return result
  }

  today(): string {
    return this.convertDateToIsoFormatString(new Date())
  }
}
