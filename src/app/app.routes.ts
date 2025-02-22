import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { inject } from '@angular/core';
import { CarService } from './services/car.service';

export const routes: Routes = [
    {path: '', redirectTo: 'step1', pathMatch: "full"},
    {path: 'step1', component: Step1Component},
    {path: 'step2', component: Step2Component, canActivate: [() => inject(CarService).step2Ready()]}
];
