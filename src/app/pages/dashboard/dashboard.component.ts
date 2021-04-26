import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { DashboardData } from '../../interfaces/dashboard/dashboard.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../../assets/scss/overrides/primeng/sidemenu.scss',
  ],
})
export class DashboardComponent implements OnInit {
  visible: boolean;
  sidebarMenutems: MenuItem[];
  userMenuItems: MenuItem[];

  dashboardData$: Observable<DashboardData>;
  error$: Observable<boolean>;

  graphOptions: any;

  constructor(
    private dashboardService: DashboardService,
    public userService: UserService,
    private router: Router
  ) {
    this.visible = true;

    this.sidebarMenutems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-pw pi-chart-bar',
        styleClass: 'active',
      },
    ];

    this.userMenuItems = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.onClickLogout(),
      },
    ];

    this.dashboardData$ = of();
    this.error$ = of(false);
    this.graphOptions = {
      legend: {
        display: false,
      },
    };
  }

  ngOnInit(): void {
    this.dashboardData$ = this.dashboardService.getData().pipe(
      catchError((error) => {
        this.error$ = of(true);
        return throwError(null);
      })
    );
  }

  onClickLogout(): void {
    this.userService.logout();
    this.router.navigate(['signin']);
  }
}
