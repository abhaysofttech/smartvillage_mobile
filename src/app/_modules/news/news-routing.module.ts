import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { DetailNewsComponent } from './detail-news/detail-news.component';


const NewsRoutes:Routes=[{
    path:'',
    component:NewsComponent,
    children:[
        {path:'news-detail',component:DetailNewsComponent}
    ]
}]

@NgModule({
    imports:[RouterModule.forChild(NewsRoutes)],
    exports:[RouterModule]
})
export class NewsRoutingModule{}