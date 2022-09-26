import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmited: boolean = false;

  get formControls() { return this.loginForm.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$")])],
      password: ['', Validators.required],
      hiddenValidation: ['']
    });
  }

  login() {
    this.formSubmited = true;
    this.loginForm.controls['hiddenValidation'].setErrors(null)
    debugger
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(res => {

        this.userService.updateUserState(res);
        this.router.navigate(['/'])
      }, err => {
        console.log(err);

        this.loginForm.controls['hiddenValidation'].setErrors({ 'somethingWentWrong': err.error.error })
      })
    }
  }

  onSignUpClikc() {
    this.router.navigate(['auth', 'signup'])
  }
}
