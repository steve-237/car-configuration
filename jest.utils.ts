import {DebugElement} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

/**
 * Reads an Angular input value whether it's a regular variable or a Signal (function)
 * @param property
 */
export function readInputValue(property: unknown) {
  if (typeof property === 'function' ) {
    return property();
  } else {
    return property;
  }
}

/**
 * Returns the trimmed text contents of a native HTML element
 * @param element
 */
export function trimmedContent(element: DebugElement): string {
  return element.nativeElement.textContent.trim();
}

/**
 * Returns the trimmed HTML contents of a native HTML element
 * @param element
 */
export function trimmedHtml(element: DebugElement): string {
  return element.nativeElement.innerHTML.trim();
}

/**
 * Selects an element by data-test id
 * @param id
 * @param fixture
 */
export function getByDataTest<T>(id: string, fixture: ComponentFixture<T>): DebugElement {
  return fixture.debugElement.query(By.css(`[data-test=${id}]`));
}

/**
 * Simulates a click on an element + runs change detection
 * @param element
 * @param fixture
 */
export function click<T>(element: DebugElement, fixture: ComponentFixture<T>) {
  const el = element.nativeElement;
  el.dispatchEvent(new Event("click"));
  fixture.detectChanges();
}
