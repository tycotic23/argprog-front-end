import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CarreraComponent } from './carrera/carrera.component';
import { LogginComponent } from './loggin/loggin.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'contacto',component: ContactComponent},
  {path:'proyectos',component: ProyectosComponent},
  {path:'carrera',component: CarreraComponent},
  {path:'login',component: LogginComponent},
  //la ruta del error siempre tiene que ir al final
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
