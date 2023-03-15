import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CarreraComponent } from './carrera/carrera.component';
import { LogginComponent } from './loggin/loggin.component';
import { EditIndexComponent } from './edit-index/edit-index.component';
import { EditContactoComponent } from './edit-contacto/edit-contacto.component';
import { EditEducacionComponent } from './edit-educacion/edit-educacion.component';
import { EditLaboralComponent } from './edit-laboral/edit-laboral.component';
import { EditProyectosComponent } from './edit-proyectos/edit-proyectos.component';
import { EditGeneralComponent } from './edit-general/edit-general.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'contacto',component: ContactComponent},
  {path:'proyectos',component: ProyectosComponent},
  {path:'carrera',component: CarreraComponent},
  {path:'login',component: LogginComponent},
  {path:'edit-index',component: EditIndexComponent},
  {path:'edit-contacto',component: EditContactoComponent},
  {path:'edit-educacion',component: EditEducacionComponent},
  {path:'edit-laboral',component: EditLaboralComponent},
  {path:'edit-proyectos',component: EditProyectosComponent},
  {path:'edit-general',component: EditGeneralComponent},
  //la ruta del error siempre tiene que ir al final
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
