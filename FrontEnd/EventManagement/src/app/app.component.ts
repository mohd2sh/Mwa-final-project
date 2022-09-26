import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'EventManagement';

  constructor(){
    setTheme('bs4')
  }

}
