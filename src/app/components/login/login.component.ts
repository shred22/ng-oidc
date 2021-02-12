import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8080/auth/realms/spboot-ms-auth',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:8083/login/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'ng-app-auth',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'id_token',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile',

  showDebugInformation: true,

  requireHttps: false,

  oidc: true,

  requestAccessToken: false,

  customQueryParams: {
    "response_mode": "form_post"
  }
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private oauthService: OAuthService) {
    console.log('in cnstructor')
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.initImplicitFlow();
  }
  ngOnInit(): void {
  }

}
