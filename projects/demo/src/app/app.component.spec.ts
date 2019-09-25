import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { SortModule } from '@dirkluijk/ngx-generic-material-tables';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SESSION_STORAGE } from 'ngx-webstorage-service';

import { AppComponent } from './app.component';
import { Person, PersonService } from './person-service';
import { ReactiveTableComponent } from './reactive-table/reactive-table.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

describe('AppComponent', () => {
  let getDataSpy: jasmine.Spy;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      MatTableModule,
      SortModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule
    ],
    declarations: [GenericTableComponent, ReactiveTableComponent],
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
              },
              budget: 2000
            },
            {
              id: '2',
              name: 'Adam',
              vehicle: {
                id: 'c',
                number: 'yy-zz-xx'
              },
              budget: 2000
            },
            {
              id: '3',
              name: 'Other guy',
              vehicle: {
                id: 'b',
                number: 'aa-bb-cc'
              },
              budget: 4000
            }
          ]).pipe(tap(() => getDataSpy()))
        }
      }
    ]
  });

  let spectator: Spectator<AppComponent>;

  beforeEach(() => {
    getDataSpy = jasmine.createSpy();
    spectator = createComponent();
  });

  afterEach(() => spectator.get(SESSION_STORAGE).clear());

  ['app-generic-table', 'app-reactive-table'].forEach((table) => {
    describe(table, () => {
      it('should sort all columns', () => {
        // id ascending
        spectator.click(spectator.query(`${ table } th.sort-id`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('1');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('John Doe');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('zz-yy-xx');

        // id descending
        spectator.click(spectator.query(`${ table } th.sort-id`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // name ascending
        spectator.click(spectator.query(`${ table } th.sort-name`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('2');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Adam');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('yy-zz-xx');

        // name descending
        spectator.click(spectator.query(`${ table } th.sort-name`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // vehicle number ascending
        spectator.click(spectator.query(`${ table } th.sort-vehicle-nr`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        // vehicle number descending
        spectator.click(spectator.query(`${ table } th.sort-vehicle-nr`, {root: true})!);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('1');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('John Doe');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('zz-yy-xx');
      });

      it('should filter visible columns case-insensitive', () => {
        expect(`${ table } tr.row`).toHaveLength(3);

        spectator.typeInElement('a', `${ table } input`);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('2');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Adam');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('yy-zz-xx');

        expect(`${ table } tr.row`).toHaveLength(2);

        spectator.typeInElement('bb', `${ table } input`);

        expect(`${ table } tr:first-child td:nth-of-type(1)`).toHaveText('3');
        expect(`${ table } tr:first-child td:nth-of-type(2)`).toHaveText('Other guy');
        expect(`${ table } tr:first-child td:nth-of-type(3)`).toHaveText('aa-bb-cc');

        expect(`${ table } tr.row`).toHaveLength(1);
      });
    });
  });

  describe('app-generic-table', () => {
    it('should have reload functionality', () => {
      getDataSpy.calls.reset();

      spectator.click('button');

      expect(getDataSpy).toHaveBeenCalledTimes(1);
    });
  });
});
