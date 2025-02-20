import { CarModel, Color } from './../models.type';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CarService {

    protected httpClient = inject(HttpClient);

    readonly allModels: Signal<CarModel[]> = toSignal(this.httpClient.get<CarModel[]>('models'), {initialValue: []});

    readonly currentCar = signal<CarModel | undefined>(undefined); 
    readonly currentColor = signal<Color | undefined>(undefined);
    readonly currentImage = computed(
        () => {
            const car = this.currentCar();
            const color = this.currentColor();
            if(car && color) {
                return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg` 
            } else return null;
        }
    );

    readonly selectableColors = computed(() => this.currentCar()?.colors);

    selectModel(code: CarModel["code"]) {
        const model = this.allModels().find(model => model.code === code);
        this.currentCar.set(model);
        this.currentColor.set(model?.colors[0]);
    }

    selectColor(code: Color["code"]) {
        const color = this.selectableColors()?.find(color => color.code === code);
        this.currentColor.set(color);
    }

}