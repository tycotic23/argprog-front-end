import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { EditIndexComponent } from './edit-index/edit-index.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CarreraComponent } from './carrera/carrera.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NewIdiomaComponent } from './new-idioma/new-idioma.component';

@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    EditIndexComponent,
    HomeComponent,
    ContactComponent,
    CarreraComponent,
    ProyectosComponent,
    NewIdiomaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
