import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {AppComponent} from "./app/app.component";
import {HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";


interface Mock {
  path: RegExp;
  mockData: (param?: string) => any;
}

function createPathRegExp(path: string) {
  const escapedPath = path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regexPattern = escapedPath.replace(/:(\w+)/g, '([^/]+)');
  return new RegExp(`^${regexPattern}$`);
}


const MOCKS: Mock[] = [
  {path: createPathRegExp(`options/:id`), mockData:(param) => {

    const options = {
      "S": {
        configs: [
          {id: 1, description: "Dual Motor All-Wheel Drive", range: 405, speed: 149, price: 74990},
          {id: 2, description: "Plaid - Tri Motor All-Wheel Drive", range: 396, speed: 200, price: 89990},
        ],
        towHitch: false,
        yoke: true
      },
      "X": {
        configs: [
          {id: 1, description: "Dual Motor All-Wheel Drive", range: 348, speed: 149, price: 79990},
          {id: 2, description: "Plaid - Tri Motor All-Wheel Drive", range: 333, speed: 149, price: 94990},
        ],
        towHitch: true, // costs $1,000
        yoke: true, // costs $1,000
      },
      "C" : {
        configs: [
          {id: 1, description: "Rear Wheel Drive", range: 250, speed: 110, price: 60990},
          {id: 2, description: "Dual Motor All-Wheel Drive", range: 340, speed: 112, price: 79990},
          {id: 3, description: "Cyberbeast - Tri Motor All-Wheel Drive", range: 320, speed: 130, price: 99990},
        ],
        towHitch: true, // costs $1,000
        yoke: true, // costs $1,000
      },
      "3": {
        configs: [
          {id: 1, description: "Rear-Wheel Drive", range: 272, speed: 140, price: 38990},
          {id: 2, description: "Long Range - Dual Motor All-Wheel Drive", range: 333, speed: 145, price: 45990},
          {id: 3, description: "Performance - Dual Motor All-Wheel Drive", range: 315, speed: 162, price: 50990},
        ],
        towHitch: false,
        yoke: false,
      },
      "Y": {
        configs: [
          {id: 1, description: "Rear-Wheel Drive", range: 260, speed: 135, price: 43990},
          {id: 2, description: "Long Range - Dual Motor All-Wheel Drive", range: 330, speed: 135, price: 48990},
          {id: 3, description: "Performance - Dual Motor All-Wheel Drive", range: 303, speed: 155, price: 52490},
        ],
        towHitch: true,
        yoke: false,
      }
    };
      // @ts-ignore
    return options[param.toUpperCase()];
  }
  },
  {path: createPathRegExp('models'), mockData: () => {
  return [
      { code: "S",
        description: "Model S",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 0},
          {code: "black", description: "Solid Black", price: 0},
          {code: "blue", description: "Deep Blue Metallic", price: 0},
          {code: "grey", description: "Stealth Grey", price: 0},
          {code: "red", description: "Ultra Red", price: 0}
        ]
      },
      { code: "X",
        description: "Model X",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 0},
          {code: "black", description: "Solid Black", price: 0},
          {code: "blue", description: "Deep Blue Metallic", price: 0},
          {code: "grey", description: "Stealth Grey", price: 0},
          {code: "red", description: "Ultra Red", price: 0}
        ]
      },
      { code: "C",
        description: "Cybertruck",
        colors: [
          {code: "grey", description: "Stainless Steel", price: 0},
          {code: "black", description: "Satin Black", price: 6500},
          {code: "white", description: "Satin White", price: 6500}
        ]
      },
      { code: "3",
        description: "Model 3",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 1000},
          {code: "black", description: "Solid Black", price: 1500},
          {code: "blue", description: "Deep Blue Metallic", price: 1000},
          {code: "grey", description: "Midnight Silver Metallic", price: 0},
          {code: "red", description: "Red Multi-Coat", price: 2000}
        ]
      },
      { code: "Y",
        description: "Model Y",
        colors: [
          {code: "white", description: "Pearl White Multi-Coat", price: 1000},
          {code: "black", description: "Solid Black", price: 2000},
          {code: "blue", description: "Deep Blue Metallic", price: 1000},
          {code: "grey", description: "Midnight Silver Metallic", price: 0},
          {code: "red", description: "Red Multi-Coat", price: 2000}
        ]
      }

    ]
  }
  }
];

export function mockingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const mock = MOCKS.find(mock => mock.path.test(req.url));
  if (mock) {
    return of(new HttpResponse({body: mock.mockData(req.url.split("/").at(-1)), status: 200}));
  }
  return next(req);
}
bootstrapApplication(AppComponent, appConfig);


