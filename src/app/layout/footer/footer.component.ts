import { Component, ElementRef, ViewChild } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TooltipModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  @ViewChild('kontakt') private kontaktElement!: ElementRef;
  constructor() {}
}
