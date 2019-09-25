import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="mat-headline">Generic Material tables</h1>

    <h2 class="mat-title">Generic table data source</h2>
    <app-generic-table></app-generic-table>

    <h2 class="mat-title">Reactive table data source</h2>
    <app-reactive-table></app-reactive-table>
  `,
  styles: [`
    h2 {
      margin-top: 1em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
