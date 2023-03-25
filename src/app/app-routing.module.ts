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
import { GuardService as guard } from './guards/guard.service';

const routes: Routes = [
  {path:'',component: LogginComponent},
  {path:'home',component: HomeComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'contacto',component: ContactComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'proyectos',component: ProyectosComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'carrera',component: CarreraComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'edit-index',component: EditIndexComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'edit-contacto',component: EditContactoComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'edit-educacion',component: EditEducacionComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'edit-laboral',component: EditLaboralComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'edit-proyectos',component: EditProyectosComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  {path:'edit-general',component: EditGeneralComponent,canActivate:[guard],data:{expectedRol:['admin']}},
  //la ruta del error siempre tiene que ir al final
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
