import {Component} from '@angular/core';
import {Step1Component} from './step1/step1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Step1Component],
  templateUrl: "app.component.html",
})
export class AppComponent {
  name = 'Angular';

}
