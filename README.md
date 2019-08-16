# Generic Angular Material Tables

> Sorting and filtering utils to create generic Angular Material tables

[![NPM version](http://img.shields.io/npm/v/@dirkluijk/ngx-generic-material-tables.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/ngx-generic-material-tables)
[![NPM downloads](http://img.shields.io/npm/dm/@dirkluijk/ngx-generic-material-tables.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/ngx-generic-material-tables)
[![Build status](https://img.shields.io/travis/dirkluijk/ngx-generic-material-tables.svg?style=flat-square)](https://travis-ci.org/dirkluijk/ngx-generic-material-tables)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

## Overview

### What? 🤔

A small set of utils to make [Angular Material Tables](https://material.angular.io/components/table) more generic.

* Sorting based on column names, with nested property support using dot notation
* Filtering based on column names, with nested property support using dot notation
* Sorts string values case-insensitive
* Filter only on displayed columns 
* Persisted sorting using SessionStorage
* Reactive data source for RxJS Observables

### Why? 🤷‍♂️

When using Angular Material Table, you may need more advanced sorting and filtering behaviour. That's why you usually end up with a lot of boilerplate code.

This library provides some utils to use consistent sorting and filtering behaviour for all your tables.

## Installation 🌩

##### npm

```
npm install @dirkluijk/ngx-generic-material-tables --save-dev
```

##### yarn

```
yarn add @dirkluijk/ngx-generic-material-tables --dev
```

## Usage 🕹

### GenericTableDataSource

The `GenericTableDataSource` allows you to use "dot notation" for your columns and benefit from the following features:

* Only filter on the displayed columns (which you need to pass to it), using the dot notation
* Use the sortable columns based on the values accessed using the dot notation

```typescript
import { Component } from '@angular/core';
import { GenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables'

@Component({
    template: `
      <table mat-table [dataSource]="genericDataSource" matSort gmtApplyMatSort>
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
          <td mat-cell *matCellDef="let row">
              {{ row.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="foo.bar">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Foo Bar</th>
          <td mat-cell *matCellDef="let row">
            {{ row.foo.bar }}
          </td>>
        </ng-container>
          
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
    `
})
export class MyComponent {
    public displayedColumns = ['name', 'foo.bar'];
    public genericDataSource = new GenericTableDataSource<YourRecordEntity>(this.displayedColumns, [/** your data */]);
}
``` 

### Apply `MatSort` automatically

Use the `gmtApplyMatSort` to automatically register the `MatSort` on the data source.

```html
<table mat-table [dataSource]="genericDataSource" matSort gmtApplyMatSort>
  <!-- ...  -->
</table>
```

This allows you to omit the following code: 

```typescript
ViewChild(MatSort, {static: true}) sort: MatSort; // not needed anymore!

ngOnInit(): void {
  this.dataSource.sort = this.sort; // not needed anymore!
}
```

### Persisted sorting

You can persist the sorting actions to SessionStorage using the `gmtPersistedSort` directive.
Just pass an additional identifier for your table in order to distinguish between multiple tables. 

```html
<table mat-table [dataSource]="genericDataSource" matSort gmtPersistedSort="my-table">
  <!-- ...  -->
</table>
```

That's it!

### ReactiveGenericTableDataSource

Even more awesome is the reactive version of the `GenericTableDataSource`:

* Pass the displayed columns, table data and filter data as `Observable` stream
* Automatically reacts to changes

```typescript
import { ReactiveGenericTableDataSource } from '@dirkluijk/ngx-generic-material-tables'

const myDataSource = new ReactiveGenericTableDataSource<YourRecordEntity>(
  displayedColumns$,
  yourTableData$,
  yourFilter$ // (optional)
);
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dirkluijk"><img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;" alt="Dirk Luijk"/><br /><sub><b>Dirk Luijk</b></sub></a><br /><a href="https://github.com/dirkluijk/@ngx-dirkluijk/generic-material-tables/commits?author=dirkluijk" title="Code">💻</a> <a href="https://github.com/dirkluijk/@dirkluijk/generic-material-tables/commits?author=dirkluijk" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
