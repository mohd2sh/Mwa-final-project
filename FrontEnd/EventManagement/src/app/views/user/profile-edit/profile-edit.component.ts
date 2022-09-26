import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profileForm!: FormGroup;
  formSubmited: boolean = false;
  user!: IUser;

  get formControls() { return this.profileForm.controls; }
  constructor(private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      _id: ['']
    });
    this.userService.userState.subscribe(res => {
      this.user = res;
      this.profileForm.controls['firstName'].patchValue(res.firstName);
      this.profileForm.controls['lastName'].patchValue(res.lastName);
      this.profileForm.controls['email'].patchValue(res.email);
      this.profileForm.controls['_id'].patchValue(res._id);
    })
  }

  editProfile() {
    this.formSubmited = true;

    if (this.profileForm.valid) {
      let user: IUser = this.profileForm.value;
      this.userService.editProfile(user).subscribe(res => {
        console.log(res);
        this.toastr.success('Profile Updated successfully')
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.userService.userState.next(this.user);
        this.router.navigate([''])


      })
    }
  }

}
