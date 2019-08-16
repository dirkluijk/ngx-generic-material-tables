import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { GenericTableDataSource, ReactiveGenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables';

import { Person, PersonService } from './person-service';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="mat-headline">Generic Material tables</h1>
    
    <h2 class="mat-title">Filter</h2>
    <input type="text" [formControl]="filterControl">
    
    <h2 class="mat-title">Generic table data source</h2>
    <table mat-table [dataSource]="genericDataSource" matSort gmtApplyMatSort gmtPersistedSort="table-1" class="table-1">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-id">ID</th>
        <td mat-cell *matCellDef="let person">
          {{ person.id }}
        </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-name">Name</th>
        <td mat-cell *matCellDef="let person">
          {{ person.name }}
        </td>
      </ng-container>
      <ng-container matColumnDef="vehicle.number">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-vehicle-nr">Vehicle number</th>
        <td mat-cell *matCellDef="let person">
          {{ person.vehicle.number }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns" class="row"></tr>
    </table>

    <h2 class="mat-title">Reactive table data source</h2>
    <table mat-table [dataSource]="reactiveGenericDataSource" matSort gmtApplyMatSort gmtPersistedSort="table-2" class="table-2">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-id">ID</th>
        <td mat-cell *matCellDef="let person">
          {{ person.id }}
        </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-name">Name</th>
        <td mat-cell *matCellDef="let person">
          {{ person.name }}
        </td>
      </ng-container>
      <ng-container matColumnDef="vehicle.number">
        <th mat-header-cell *matHeaderCellDef mat-sort-header class="sort-vehicle-nr">Vehicle number</th>
        <td mat-cell *matCellDef="let person">
          {{ person.vehicle.number }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns" class="row"></tr>
    </table>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public readonly filterControl = new FormControl('');

  public readonly displayedColumns = ['id', 'name', 'vehicle.number'];
  public readonly genericDataSource = new GenericTableDataSource<Person>(this.displayedColumns, []);

  public readonly reactiveGenericDataSource = new ReactiveGenericTableDataSource<Person>(
    of(this.displayedColumns),
    this.personService.getPersons(),
    this.filterControl.valueChanges
  );

  constructor(private readonly personService: PersonService) {}

  public ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.genericDataSource.data = persons;
    });

    this.filterControl.valueChanges.subscribe((filterValue) => this.genericDataSource.filter = filterValue);
  }
}
