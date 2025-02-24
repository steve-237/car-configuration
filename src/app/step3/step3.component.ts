import { Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-step3',
  imports: [CurrencyPipe],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  protected service = inject(CarService);
}
