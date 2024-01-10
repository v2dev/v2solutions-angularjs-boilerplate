import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appAccessControl]',
})
export class AccessControlDirective implements OnInit {
  @Input('moduleType') module: string = '';
  @Input('accessType') accessType: string = '';

  constructor(
    private elementRef: ElementRef,
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkAccess();
  }

  checkAccess() {
    const accessControls: any = this.authService.getAccessControls();
    const module: any = accessControls.find((access: any) => access.module_name === this.module);
    this.elementRef.nativeElement.style.display = module[this.accessType] ? 'block' : 'none';
  }
}

// demo object
// "access_controls": [
//   {
//     "module_name": "users",
//     "create_action": false,
//     "read_action": true,
//     "update_action": true,
//     "delete_action": false
//   },
//   {
//     "module_name": "articles",
//     "create_action": true,
//     "read_action": true,
//     "update_action": false,
//     "delete_action": false
//   }
// ]
