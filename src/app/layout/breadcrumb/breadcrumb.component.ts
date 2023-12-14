import { Component } from '@angular/core';
import { breadcrumbData } from './breadcrumb-data';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbData = breadcrumbData;

}
