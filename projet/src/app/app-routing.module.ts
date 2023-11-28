import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
      },
      {
        path:'course/add',
        loadComponent: () => import('./demo/addcourse/addcourse.component')
      },
      {
        path:'course/edit/:id',
        loadComponent: () => import('./demo/editcourse/editcourse.component')
      },
      {
        path: 'home',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'admin',
        loadComponent: () => import('./demo/admin/admin.component')
      },

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
      {
        path:'course/:id',
        loadComponent: () => import('./demo/courses/courses.component')
      },
      {
        path:'course/qcm/:id',
        loadComponent: () => import('./demo/qcm/qcm.component')
      },
      {
        path: 'student/home',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'courses',
        loadComponent: () => import('./demo/listcourses/listcourses.component')
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
