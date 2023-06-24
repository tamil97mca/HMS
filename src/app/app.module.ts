import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { environment } from 'src/environments/environment';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { HomeComponent } from './components/home/home.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { StaffComponent } from './components/staff/staff.component';
import { AddStaffComponent } from './components/staff/add-staff/add-staff.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';




@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    DoctorComponent,
    PatientComponent,
    HomeComponent,
    AddDoctorComponent,
    AddPatientComponent,
    StaffComponent,
    AddStaffComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule,
    MaterialModule,    
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
