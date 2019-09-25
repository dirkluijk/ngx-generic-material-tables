import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables';

import { Person, PersonService } from '../person-service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent implements OnInit {
  public readonly filterControl = new FormControl('');

  public readonly displayedColumns = ['id', 'name', 'vehicle.number'];
  public readonly dataSource = new GenericTableDataSource<Person>(this.displayedColumns, []);

  constructor(private readonly personService: PersonService) {}

  public ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.dataSource.data = persons;
    });

    this.filterControl.valueChanges.subscribe((filterValue) => {
      return this.dataSource.filter = filterValue;
    });
  }
}
