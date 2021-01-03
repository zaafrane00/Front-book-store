import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './books/add-book/add-book.component';
import { IndexComponent } from './books/index/index.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'add',
    component: AddBookComponent,
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
