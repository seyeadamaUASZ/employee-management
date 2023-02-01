import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LayoutModule } from './layout/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { SharedState } from './shared/helpers/shared.state';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPagination } from './shared/helpers/custom-pagination';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from './shared/helpers/custom-state-matcher';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      closeButton: true,
      maxOpened: 1,
      progressBar: true,
      newestOnTop: true
      //preventDuplicates: true,
  }),
    LayoutModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
  },
  SharedState,
  { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  { provide: MatPaginatorIntl, useClass: CustomPagination },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
