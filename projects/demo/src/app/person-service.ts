import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Person {
  id: string;
  name: string;
  vehicle: {
    id: string;
    number: string;
  };
  budget: number;
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
        },
        budget: 2000
      },
      {
        id: '2',
        name: 'Other guy',
        vehicle: {
          id: 'b',
          number: 'zz-yy-xx'
        },
        budget: 4000
      }
    ]).pipe(
      // tslint:disable-next-line:no-console
      tap(() => console.log('Getting persons...')),
      delay(400),
    );
  }
}
