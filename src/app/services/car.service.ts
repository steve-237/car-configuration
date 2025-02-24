import { CarModel, CarOptions, Color, Config } from './../models.type';
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

  readonly currentConfig = signal<Config | undefined>(undefined);
  readonly currentWheelIsYoke = signal<boolean>(false);
  readonly currentTowHitchIsSelected = signal<boolean>(false);
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

  readonly step3Ready: Signal<boolean> = computed(
    () => this.step2Ready() != undefined && this.currentConfig() != undefined
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

  readonly totalCost = computed(() => {
    return (this.currentConfig()?.price ?? 0) +
    (this.currentColor()?.price ?? 0) +
    (this.currentTowHitchIsSelected() ? 1000 : 0) +
    (this.currentWheelIsYoke() ? 1000 : 0);
  })
   
  selectModel(code: CarModel['code']) {
    const model = this.allModels().find((model) => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
    this.currentWheelIsYoke.set(false);
    this.currentTowHitchIsSelected.set(false);
    this.currentConfig.set(undefined);
  }

  selectColor(code: Color['code']) {
    const color = this.selectableColors()?.find((color) => color.code === code);
    this.currentColor.set(color);
  }

  selectConfig(id: string) {
    const config = this.selectableOptions()?.configs.find(c => c.id === +id);
    this.currentConfig.set(config);
  }
}
