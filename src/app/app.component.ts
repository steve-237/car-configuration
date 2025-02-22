import {Component, inject} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: "app.component.html",
})
export class AppComponent {
  service = inject(CarService);
}
