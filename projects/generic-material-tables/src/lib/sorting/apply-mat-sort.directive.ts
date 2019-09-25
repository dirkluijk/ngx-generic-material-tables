import { Directive, Host, OnInit } from '@angular/core';
import { MatSort, MatTable, MatTableDataSource } from '@angular/material';

/**
 * Directives which automatically registers a MatSort to a MatTableDataSource.
 */
@Directive({
  selector: '[gmtApplyMatSort]'
})
export class ApplyMatSortDirective implements OnInit {
  constructor(@Host() private readonly matTable: MatTable<any>, @Host() private readonly matSort: MatSort) {}

  public ngOnInit(): void {
    if (this.matTable.dataSource instanceof MatTableDataSource) {
      this.matTable.dataSource.sort = this.matSort;
    }
  }
}
