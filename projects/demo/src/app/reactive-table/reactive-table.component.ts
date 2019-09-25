import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveGenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables';
import { of } from 'rxjs';

import { Person, PersonService } from '../person-service';

@Component({
  selector: 'app-reactive-table',
  templateUrl: './reactive-table.component.html',
  styleUrls: ['./reactive-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveTableComponent {
  public readonly filterControl = new FormControl('');

  public readonly displayedColumns = ['id', 'name', 'vehicle.number'];

  public readonly dataSource = new ReactiveGenericTableDataSource<Person>(
    of(this.displayedColumns),
    this.personService.getPersons(),
    this.filterControl.valueChanges
  );

  constructor(private readonly personService: PersonService) {}
}
