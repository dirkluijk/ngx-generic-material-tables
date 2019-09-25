import { Directive, Host, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subscription } from 'rxjs';

/**
 * Directives which persists the sort of MatSort in StorageService.
 */
@Directive({
  selector: '[gmtPersistedSort]'
})
export class PersistedSortDirective implements OnInit, OnDestroy {
  @Input('gmtPersistedSort') public key!: string;

  private readonly sortChangeSubscription = new Subscription();

  constructor(
    @Host() private readonly matSort: MatSort,
    @Inject(SESSION_STORAGE) private readonly storage: StorageService<Sort>
  ) {}

  public ngOnInit(): void {
    this.restoreSort();

    this.sortChangeSubscription.add(
      this.matSort.sortChange.subscribe((sort: Sort) => this.saveSort(sort))
    );
  }

  public ngOnDestroy(): void {
    this.sortChangeSubscription.unsubscribe();
  }

  private saveSort(sort: Sort): void {
    this.storage.set(this.fullStorageKey, sort);
  }

  private restoreSort(): void {
    const currentSort = this.storage.get(this.fullStorageKey);

    if (currentSort) {
      this.matSort.active = currentSort.active;
      this.matSort.direction = currentSort.direction;
      this.matSort._stateChanges.next();
    }
  }

  private get fullStorageKey(): string {
    return `persisted.sort.${ this.key }`;
  }
}
