import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatIconModule
    ],
    providers: [
        provideClientHydration(),
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClient(withFetch(), withInterceptorsFromDi())
    ]
})
export class AppModule { }
