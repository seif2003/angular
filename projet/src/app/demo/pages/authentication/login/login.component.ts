import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { Admin } from 'src/models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  admins: Admin[];
  error: String = "";

  constructor(private adminService: AdminService, private router: Router) {}

  connect(email: string, password: string): void {
    this.adminService.getAdmins().subscribe(admins => {
      this.admins = admins;

      const isValidCredentials = this.admins.some(admin => admin.username === email && admin.password === password);

      if (isValidCredentials) {
        this.router.navigate(['/admin']);
      } else {
        this.error='Invalid credentials';
      }
    });
  }
}
