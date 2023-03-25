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
import { IdiomasEditComponent } from './idiomas-edit/idiomas-edit.component';
import { BotonfooterEditComponent } from './botonfooter-edit/botonfooter-edit.component';
import { ConocimientoEditComponent } from './conocimiento-edit/conocimiento-edit.component';
import { ContactoEditComponent } from './contacto-edit/contacto-edit.component';
import { EducacionEditComponent } from './educacion-edit/educacion-edit.component';
import { ExplaboralEditComponent } from './explaboral-edit/explaboral-edit.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { SubfooterdatoEditComponent } from './subfooterdato-edit/subfooterdato-edit.component';
import { TextomainEditComponent } from './textomain-edit/textomain-edit.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { EditGeneralComponent } from './edit-general/edit-general.component';
import { EditContactoComponent } from './edit-contacto/edit-contacto.component';
import { EditProyectosComponent } from './edit-proyectos/edit-proyectos.component';
import { EditEducacionComponent } from './edit-educacion/edit-educacion.component';
import { EditLaboralComponent } from './edit-laboral/edit-laboral.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NavEditComponent } from './nav-edit/nav-edit.component';
import { SkillsEditComponent } from './skills-edit/skills-edit.component';
import { LoginComponent } from './auth/login.component';
import { NavLogoutComponent } from './nav-logout/nav-logout.component';
import { CheckloguserComponent } from './checkloguser/checkloguser.component';
import { ChecklogadminComponent } from './checklogadmin/checklogadmin.component';
import { interceptorProvider } from './interceptors/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    EditIndexComponent,
    HomeComponent,
    ContactComponent,
    CarreraComponent,
    ProyectosComponent,
    IdiomasEditComponent,
    BotonfooterEditComponent,
    ConocimientoEditComponent,
    ContactoEditComponent,
    EducacionEditComponent,
    ExplaboralEditComponent,
    ProyectoEditComponent,
    SubfooterdatoEditComponent,
    TextomainEditComponent,
    UsuarioEditComponent,
    EditGeneralComponent,
    EditContactoComponent,
    EditProyectosComponent,
    EditEducacionComponent,
    EditLaboralComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    NavEditComponent,
    SkillsEditComponent,
    LoginComponent,
    NavLogoutComponent,
    CheckloguserComponent,
    ChecklogadminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
