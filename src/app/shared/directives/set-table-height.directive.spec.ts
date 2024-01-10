import { ElementRef } from '@angular/core';
import { SetTableHeightDirective } from './set-table-height.directive';

describe('SetTableHeightDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(null); // Create a mock ElementRef
    const directive = new SetTableHeightDirective(el);
    expect(directive).toBeTruthy();
  });
});
