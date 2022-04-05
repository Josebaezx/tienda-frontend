import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cartReducer, metaReducerLocalStorage } from './state/reducers/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({cartEntries: cartReducer},{metaReducers: [metaReducerLocalStorage]}),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    // HomeModule // eager load
    // ShopModule // eager load
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
