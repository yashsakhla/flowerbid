import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
    },
    {
        path:'aboutus',
        component:AboutusComponent
    },
    {
        path:'auction',
        component:AuctionsComponent,
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'contact',
        component:ContactComponent
    },
    {
        path:'auction-item/:id',
        component:CardDetailComponent
    }
];
