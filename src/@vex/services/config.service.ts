import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DeepPartial } from '../interfaces/deep-partial.type';
import { mergeDeep } from '../utils/merge-deep';
import { LayoutService } from './layout.service';
import { configs } from './configs';
import { ConfigName } from '../interfaces/config-name.model';
import { Config } from '../interfaces/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  defaultConfig = ConfigName.apollo;

  configs: Config[] = configs;

  private _configSubject = new BehaviorSubject(this.configs.find(c => c.id === this.defaultConfig));
  config$ = this._configSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document,
              private layoutService: LayoutService) {
    this.config$.subscribe(config => this._updateConfig(config));
  }

  setConfig(config: ConfigName) {
    const settings = this.configs.find(c => c.id === config);

    if (settings) {
      this._configSubject.next(settings);
    }
  }

  updateConfig(config: DeepPartial<Config>) {
    this._configSubject.next(mergeDeep({ ...this._configSubject.getValue() }, config));
  }

  private _updateConfig(config: Config) {
    const body = this.document.body;

    this.configs.forEach(c => {
      if (body.classList.contains(c.id)) {
        body.classList.remove(c.id);
      }
    });

    body.classList.add(config.id);

    config.sidenav.state === 'expanded' ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();

    // Workaround so charts and other externals know they have to resize on Layout switch
    if (window) {
      window.dispatchEvent(new Event('resize'));

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);
    }
  }
}
