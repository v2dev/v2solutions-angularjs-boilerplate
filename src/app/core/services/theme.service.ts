import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  chartTheme = new BehaviorSubject<string>('light');

  constructor(@Inject(DOCUMENT) private document: Document) {
    let theme = 'bootstrap4-light-blue';
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      theme = 'bootstrap4-dark-blue';
      this.chartTheme.next('dark');
    }
    this.switchTheme(theme);
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
    if (theme === 'bootstrap4-light-blue') {
      this.chartTheme.next('light');
    } else {
      this.chartTheme.next('dark');
    }
  }
}
