import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

export interface Person {
  id: string;
  name: string;
  vehicle: {
    id: string;
    number: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  public getPersons(): Observable<Person[]> {
    return of<Person[]>([
      {
        id: '1',
        name: 'John Doe',
        vehicle: {
          id: 'a',
          number: 'aa-bb-cc'
        }
      },
      {
        id: '2',
        name: 'Other guy',
        vehicle: {
          id: 'b',
          number: 'zz-yy-xx'
        }
      }
    ]).pipe(
      delay(300)
    );
  }
}
