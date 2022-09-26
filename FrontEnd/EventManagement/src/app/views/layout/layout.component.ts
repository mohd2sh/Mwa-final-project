import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  user!: IUser;
  ngOnInit(): void {
    this.userService.userState.subscribe(res => {
      this.user = res;
    })
  }

  onLoginClick() {
    this.navigateToLogin();
  }
  onLogoutClick() {
    this.userService.logout();
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.router.navigate(['auth', 'login'])
  }
}
