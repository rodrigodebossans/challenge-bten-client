import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [
    './signin.component.scss',
    '../../../assets/scss/overrides/primeng/auth-form.scss',
  ],
})
export class SigninComponent implements OnInit {
  user: User;
  targetUrl: string;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = {
      email: '',
      name: '',
      password: '',
      age: undefined,
    };
    this.targetUrl = this.route.snapshot.queryParams?.targetUrl || '';
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  onSubmit(): void {
    if (this.user) {
      this.userService.authenticate(this.user).subscribe(
        (authenticatedUser: User) => {
          this.toastService.success(
            'Success',
            `Welcome back ${authenticatedUser.name}`
          );

          this.router.navigate([this.targetUrl]);
        },
        ({ error }) => {
          this.toastService.error(
            error.name,
            `${error.message}. ${error.cause}.`
          );
        }
      );
    }
  }
}
