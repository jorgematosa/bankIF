import { TableListComponent } from './main/table-list/table-list.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '',  component: MainComponent, children: [
    { path: 'listInfo',  component: TableListComponent }
  ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
