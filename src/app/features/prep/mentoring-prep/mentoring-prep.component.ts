import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-mentoring-prep',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './mentoring-prep.component.html',
  styleUrl: './mentoring-prep.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentoringPrepComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
}
