import { MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { SortModule } from '@dirkluijk/ngx-generic-material-tables';
import { of } from 'rxjs';
import { SESSION_STORAGE } from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { Person, PersonService } from './person-service';

describe('AppComponent', () => {
  const createComponent = createTestComponentFactory({
    component: AppComponent,
    imports: [
      MatTableModule,
      SortModule,
      ReactiveFormsModule
    ],
    providers: [
      {
        provide: PersonService,
        useValue: {
          getPersons: () => of<Person[]>([
            {
              id: '1',
              name: 'John Doe',
              vehicle: {
                id: 'a',
                number: 'zz-yy-xx'
              }
            },
            {
              id: '2',
              name: 'Adam',
              vehicle: {
                id: 'c',
                number: 'yy-zz-xx'
              }
            },
            {
              id: '3',
              name: 'Other guy',
              vehicle: {
                id: 'b',
                number: 'aa-bb-cc'
              }
            }
          ])
        }
      }
    ]
  });

  let spectator: Spectator<AppComponent>;

  beforeEach(async () => {
    spectator = createComponent();
    // await spectator.fixture.whenStable();
    // spectator.detectChanges();
  });

  afterEach(() => spectator.get(SESSION_STORAGE).clear());

  ['.table-1', '.table-2'].forEach((table) => {
    describe(table, () => {
      it('should sort all columns', () => {
        // id ascending
        spectator.click(spectator.$$(`${ table } th.sort-id`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('1');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('John Doe');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('zz-yy-xx');

        // id descending
        spectator.click(spectator.$$(`${ table } th.sort-id`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // name ascending
        spectator.click(spectator.$$(`${ table } th.sort-name`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('2');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Adam');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('yy-zz-xx');

        // name descending
        spectator.click(spectator.$$(`${ table } th.sort-name`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // vehicle number ascending
        spectator.click(spectator.$$(`${ table } th.sort-vehicle-nr`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // vehicle number descending
        spectator.click(spectator.$$(`${ table } th.sort-vehicle-nr`));

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('1');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('John Doe');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('zz-yy-xx');
      });

      it('should filter visible columns case-insensitive', () => {
        expect(`${ table } tr.row`).toHaveLength(3);

        spectator.typeInElement('A', 'input');

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('2');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Adam');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('yy-zz-xx');

        expect(`${ table } tr.row`).toHaveLength(2);

        spectator.typeInElement('bb', 'input');

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        expect(`${ table } tr.row`).toHaveLength(1);
      });
    });
  });
});
