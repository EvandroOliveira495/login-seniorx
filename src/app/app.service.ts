import { Injectable } from '@angular/core';
import { ENVIRONMENTS, SeniorApi } from '@seniorsistemas/senior-core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '@seniorsistemas/senior-platform-data';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private seniorApi : SeniorApi;

  constructor() {
    this.seniorApi = new SeniorApi();
    if(environment.production){
      this.seniorApi.setEnvironment(ENVIRONMENTS.PROD)
    } else {
     //this.seniorApi.setEnvironment(ENVIRONMENTS.DEV)
      this.seniorApi.setEnvironment(ENVIRONMENTS.PROD)
    }
   }

   getUser(): Observable<any> { 
    return from(user.getToken())
      .pipe(
        concatMap(token => { 
          this.seniorApi.accessToken = token.access_token;
          return from(this.seniorApi.users.getUser());
        })
      );
  } 
}
