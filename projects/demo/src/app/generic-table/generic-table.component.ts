import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { defaultColumnFilterPredicate, GenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables';

import { Person, PersonService } from '../person-service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent implements OnInit {
  public readonly filterControl = new FormControl('');

  public readonly displayedColumns = ['id', 'name', 'vehicle.number', 'budget'];
  public readonly dataSource = new GenericTableDataSource<Person>(this.displayedColumns, []);

  constructor(private readonly personService: PersonService, @Inject(LOCALE_ID) private readonly locale: string) {}

  public ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.dataSource.data = persons;
    });

    this.filterControl.valueChanges.subscribe((filterValue) => {
      return this.dataSource.filter = filterValue;
    });

    const decimalPipe = new DecimalPipe(this.locale);

    this.dataSource.columnFilterPredicate = (value, filter, columnName) => {
      if (columnName === 'vehicle.number') {
        return value.trim().includes(filter); // exact filter
      }

      if (typeof value === 'number') {
        return String(decimalPipe.transform(value)).includes(filter); // filter for decimal value;
      }

      return defaultColumnFilterPredicate(value, filter, columnName);
    };
  }
}
