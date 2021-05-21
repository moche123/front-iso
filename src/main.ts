import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

if (environment.production) {
  console.log('HEY')
  enableProdMode();
}else{
  console.log('NO')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
