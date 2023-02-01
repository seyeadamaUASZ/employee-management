import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    profil = '';
    fullName = '';
  constructor(private router:Router,
    private authService: AuthService, private credentialService: CredentialsService) { 
      
    }

  ngOnInit(): void {
      this.profil = this.credentialService.permissions[0] ?? 'Unknown';
      this.fullName = this.credentialService.fullName;
  }

  onLogout(): void {
    this.authService.onLogout();
}

}
