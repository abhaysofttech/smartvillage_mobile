import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintBoxComponent } from './complaint-box.component';
import { AtikramanComponent } from './atikraman/atikraman.component';
import { AtikramanRegtokanComponent } from './atikraman-regtokan/atikraman-regtokan.component';
import { CompboxListComponent } from './compbox-list/compbox-list.component';
import { ComplaintComponent } from './complaint/complaint.component';

const ComplaintBoxRoutes: Routes = [{
    path: '',
    component: ComplaintBoxComponent,
    children: [
        { path: 'dash', component: ComplaintComponent },
        { path: 'atikraman/:id', component: AtikramanComponent },
        { path: 'atikraman-regtokan', component: AtikramanRegtokanComponent },
        { path: 'compbox-list', component: CompboxListComponent },
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(ComplaintBoxRoutes)],
    exports: [RouterModule]
})
export class ComplaintBoxRoutingModule { }