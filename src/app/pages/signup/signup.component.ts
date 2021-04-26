import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../../../assets/scss/overrides/primeng/auth-form.scss',
  ],
})
export class SignupComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.user = {
      email: '',
      name: '',
      password: '',
      age: undefined,
    };
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.user) {
      this.userService.addUser(this.user).subscribe(
        (createdUser: User) => {
          this.toastService.success('Success', 'User created successfully!');
          this.router.navigate(['signin']);
        },
        ({ error }) => {
          this.toastService.error(
            error.name,
            `${error.message}. ${error?.cause}.`
          );
        }
      );
    }
  }
}
