import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-step1',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {

}
