import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {GalleryComponent} from './gallery/gallery.component';
import {ConnectedComponent} from './connected/connected.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'gallery',component:GalleryComponent},
    {path:'connected',component: ConnectedComponent},
    //{path:'connected',component: ConnectedComponent, canActivate:[AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);