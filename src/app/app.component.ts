import { Component } from '@angular/core';
import { AppService } from './app.service';
import { UserData } from './models/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-seniorx';

  userData: UserData = null;

  constructor(private appService: AppService){}

  getLoggedUser(){
    this.appService.getUser().subscribe((res:any) => {
      this.userData = res.body;
    })
  }
}
