import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {CarModel} from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>("models"), {initialValue: []}
  );

  readonly currentCar = signal<CarModel | undefined>(undefined);

}
