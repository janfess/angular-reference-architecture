import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-agb',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './agb.component.html',
  styleUrls: ['./agb.component.css'],
})
export class AGBComponent {
  constructor() {}
}
