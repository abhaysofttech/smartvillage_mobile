
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintBoxRoutingModule } from './complaint-box-routing.module';
import { ComplaintBoxComponent } from './complaint-box.component';
import { AtikramanComponent } from './atikraman/atikraman.component';
import { AtikramanRegtokanComponent } from './atikraman-regtokan/atikraman-regtokan.component';
import { CompboxListComponent } from './compbox-list/compbox-list.component';
import { IonicModule } from '@ionic/angular';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintRegisterComponent } from 'src/app/_components';
@NgModule({
    declarations: [
        ComplaintBoxComponent,
        ComplaintComponent,
        AtikramanComponent,
        AtikramanRegtokanComponent,
        CompboxListComponent,
        ComplaintRegisterComponent
    ],
    imports: [
        ComplaintBoxRoutingModule,
        ReactiveFormsModule,
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [ComplaintBoxComponent]

})


export class ComplaintBoxModule { }