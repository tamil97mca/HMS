import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestapiService } from 'src/app/service/restapi.service';
import { DialogData } from '../doctor.component';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  formGroup!: FormGroup;

  id!: string;
  rev!: string;
  name!: string;
  mobile!: string;
  email!: string;
  gender!: string;
  department!: string;
  birthdate!: string;
  qualifications!: string;
  status!: string;
  // isAdmin!: boolean;
  // isDoctor!: boolean;
  // isPatient!: boolean;
  // isNurse!: boolean;
  // isReceptionist!: boolean;
  // isLaboratory!: boolean;
  // isPharmacy!: boolean;

  constructor(public dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder,
    private _snackBar: MatSnackBar, private restApi: RestapiService) {

      this.id = data['_id'];
      this.rev = data['_rev'];
      this.name = data.name;
      this.mobile = data.mobile;
      this.email = data.email;
      this.gender = data.gender;
      this.department = data.department;
      this.birthdate = data.birthdate;
      this.qualifications = data.qualifications;
      this.status = data.status;
    }

  ngOnInit(): void {

    if(this.id) {
      this.restApi.findOne('hms', this.id).then((result:any) => {
        console.log("$$$$", result)
      })
    }

    this.formGroup = this.fb.group({
      _id: [this.id, [Validators.required]],
      _rev: [this.rev, [Validators.required]],
      name: [ this.name, [Validators.required]],
      mobile: [ this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: [ this.email, [Validators.required, Validators.email]],
      gender: [ this.gender, [Validators.required]],
      department: [ this.department, [Validators.required]],
      birthdate: [ this.birthdate, [Validators.required]],
      qualifications: [ this.qualifications, [Validators.required]],
      status: [ this.status, [Validators.required]],
    })
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    if (this.id) {
      this.dialogRef.close(this.formGroup.value);
    } else {
      delete this.formGroup.value._id;
      delete this.formGroup.value._rev;
      this.dialogRef.close(this.formGroup.value);
    }
    this._snackBar.open(message, action);
  }
}
