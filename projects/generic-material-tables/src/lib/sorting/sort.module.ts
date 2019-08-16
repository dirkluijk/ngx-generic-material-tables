import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material';

import { ApplyMatSortDirective } from './apply-mat-sort.directive';
import { PersistedSortDirective } from './persisted-sort.directive';

@NgModule({
    declarations: [ApplyMatSortDirective, PersistedSortDirective],
    exports: [ApplyMatSortDirective, PersistedSortDirective, MatSortModule]
})
export class SortModule {}
