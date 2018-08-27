import { AuthenticationService } from './main/authentication/authentication.service';
import { TokenInterceptor } from './main/token.interceptor';
import { NodeService } from './main/node.service';
import { MainService } from './main/main.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {
  MatFormFieldModule, MatSelectModule, MatOptionModule,
  MatSidenavModule, MatToolbarModule, MatIconModule,
  MatInputModule, MatButtonModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { TableListComponent } from './main/table-list/table-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TableListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    MainService,
    NodeService,
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
