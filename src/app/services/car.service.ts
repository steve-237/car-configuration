import { CarModel, CarOptions, Color } from './../models.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  protected httpClient = inject(HttpClient);

  readonly allModels: Signal<CarModel[]> = toSignal(
    this.httpClient.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentImage = computed(() => {
    const car = this.currentCar();
    const color = this.currentColor();
    if (car && color) {
      return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg`;
    } else return null;
  });

  readonly step2Ready: Signal<boolean> = computed(
    () => this.currentCar() != undefined && this.currentColor() != undefined
  );

  constructor() {
    effect(() => {
      if (this.currentCar()?.code)
        this.httpClient
          .get<CarOptions>('options/' + this.currentCar()?.code)
          .subscribe((options) => this.selectableOptions.set(options));
    });
  }

  readonly selectableColors = computed(() => this.currentCar()?.colors);
  readonly selectableOptions = signal<CarOptions | null>(null);
   
  selectModel(code: CarModel['code']) {
    const model = this.allModels().find((model) => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
  }

  selectColor(code: Color['code']) {
    const color = this.selectableColors()?.find((color) => color.code === code);
    this.currentColor.set(color);
  }
}
