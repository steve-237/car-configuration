import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from "@angular/core";
import { CarModel } from '../models.type';

@Injectable({
    providedIn: 'root',
})
export class CarService {

    protected httpCLient = inject(HttpClient);

    getCarModels(): Signal<CarModel[] | undefined> {
        return toSignal(this.httpCLient.get<CarModel[]>('/models'));
    }
}