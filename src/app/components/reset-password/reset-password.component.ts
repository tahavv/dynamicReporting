import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  token!: string;
  currentPassword: string = '';
  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    console.log(this.token);
  }

  submitForm() {
    if (!this.token) {
      this.errorMessage = 'Invalid token';
      return;
    }

    if (!this.currentPassword || !this.newPassword) {
      this.errorMessage = 'Please enter both the current and new passwords.';
      return;
    }

    const request = {
      token: this.token,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    console.log(request);

    this.userService.updatePas(request).subscribe(
      (response: any) => {
        console.log(response);
        this.successMessage = 'Password updated successfully';
        this.toastr.success('Password updated successfully');
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.errorMessage =
          'Failed to update the password. Please check your input and try again.';
        this.toastr.error(
          'Failed to update the password. Please check your input and try again.'
        );
      }
    );
  }
}
