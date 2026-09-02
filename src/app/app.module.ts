import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchModule } from './search/search.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PublisherModule } from './publisher/publisher.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToolsModule } from './tools/tools.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    RouterModule,
    TranslateModule.forRoot(),
    NoopAnimationsModule,
    MaterialModule,
    SharedModule,
    ShellModule,
    NgxMatSelectSearchModule,
    SearchModule,
    HomeModule,
    AuthModule,
    PublisherModule,
    ScrollingModule,
    ToolsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
