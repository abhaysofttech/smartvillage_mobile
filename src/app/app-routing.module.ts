import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './_modules';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';
import { RegisterVillageComponent } from './Users/register-village/register-village.component';
import { RegisterComponent } from './Users/register/register.component';

const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registervillage', component: RegisterVillageComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule),
  // },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'complaint',
    loadChildren: () => import('./_modules/complaint-box/complaint-box.module').then(m => m.ComplaintBoxModule)
  },
  // ,

  // otherwise redirect to home
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
