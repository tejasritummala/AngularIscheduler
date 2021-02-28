import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';
export const WINDOW = new InjectionToken('WindowToken');
@Injectable({
  providedIn: 'root'
})

/* Define abstract class for obtaining reference to the global window object. */
export abstract class WindowRef {

   // tslint:disable-next-line: ban-types
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }

}
export class WindowService extends WindowRef {

  constructor() {
    super();
  }

  // tslint:disable-next-line: ban-types
  get nativeWindow(): Window | Object {
    return window;
  }
}


/* Create an factory function that returns the native window object. */
 // tslint:disable-next-line: ban-types
export function windowFactory(browserWindowRef: WindowService, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
export const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: WindowService
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowRef, PLATFORM_ID ]
};

/* Create an array of providers. */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider
];
