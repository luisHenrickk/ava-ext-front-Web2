import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: Usuario | null = null;

  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUserValue();
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
