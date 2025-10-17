# StockAppNg18
nvm use twenty
curl commands are in public/watchlist.json
HARVEST ETFs  moved watchlist.json
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
enviroments were created unsing ng g environments
  CREATE src/environments/environment.ts (31 bytes)
  CREATE src/environments/environment.development.ts (31 bytes)
  UPDATE angular.json (2841 bytes)
## Development server   
## error was during ng test
## error:    Error: Module build failed (from ./node_modules/@ngtools/webpack/src/ivy/index.js):
Error: data:text/javascript;base64,CiAgaW1wb3J0IHsgZ2V0VGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7CiAgaW1wb3J0IHsKICAgIEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwKICAgIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nLAogICB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJzsKCiAgLy8gSW5pdGlhbGl6ZSB0aGUgQW5ndWxhciB0ZXN0aW5nIGVudmlyb25tZW50LgogIGdldFRlc3RCZWQoKS5pbml0VGVzdEVudmlyb25tZW50KEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1Ccm93c2VyRHluYW1pY1Rlc3RpbmcoKSwgewogICAgZXJyb3JPblVua25vd25FbGVtZW50czogdHJ1ZSwKICAgIGVycm9yT25Vbmtub3duUHJvcGVydGllczogdHJ1ZQogIH0pOwo= is missing from the TypeScript compilation. Please make sure it is in your tsconfig via the 'files' or 'include' property.

FIX:   "angularCompilerOptions": {  //from tsconfig.json
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
## "allowJs": false  ##This line was the FIX after deleting nodemodules and clearing npm cache...was set to ##'allowJS": true
  }
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

To read and write to .ods files in Angular, consider the following options:

Use libraries like SheetJS (xlsx) that support .ods file formats.
Convert .ods files to a more common format (like .xlsx or .csv) for easier manipulation.
Implement file upload functionality to read .ods files using Angular's file input.
Utilize the FileReader API to read the contents of the uploaded .ods file.
Write data back to .ods format using the same libraries or convert it back after processing.
Ensure proper handling of asynchronous operations when reading and writing files.
npm i xlsx