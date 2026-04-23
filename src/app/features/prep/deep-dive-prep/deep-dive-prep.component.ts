import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-deep-dive-prep',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './deep-dive-prep.component.html',
  styleUrl: './deep-dive-prep.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeepDivePrepComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
}
