import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kontakt',
  imports: [
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css'],
})
export class KontaktComponent implements OnInit, OnDestroy {
  maxLength = 5000;
  private destroy$ = new Subject<void>();
  navigationTimeout: any;
  constructor(
    private formService: FormService,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  isLoading = false;
  successMessage = false;
  errorMessage = false;
  contactForm!: FormGroup;
  name!: FormControl;
  companyName!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  beratungEntwicklung!: FormControl;
  accessibilityConsulting!: FormControl;
  codeArchitektur!: FormControl;
  mvpEntwicklung!: FormControl;
  appModernisierung!: FormControl;
  testStrategie!: FormControl;
  reaktiveProgrammierung!: FormControl;
  sonstigeAnfrage!: FormControl;
  inquiry!: FormControl;
  acceptPolicies!: FormControl;

  ngOnInit() {
    this.contactForm = this.formService.getForm();
    this.initializeFormControls();
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('online', this.handleOnline.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.navigationTimeout) {
      clearTimeout(this.navigationTimeout);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleOnline(): void {
    const pendingFormData = localStorage.getItem('pendingFormData');
    if (pendingFormData) {
      this.submitForm(JSON.parse(pendingFormData));
    }
  }

  private initializeFormControls() {
    this.name = this.formService.getFormControl('name');
    this.companyName = this.formService.getFormControl('companyName');
    this.email = this.formService.getFormControl('email');
    this.phone = this.formService.getFormControl('phone');
    this.beratungEntwicklung = this.formService.getFormControl('beratungEntwicklung');
    this.accessibilityConsulting = this.formService.getFormControl('accessibilityConsulting');
    this.codeArchitektur = this.formService.getFormControl('codeArchitektur');
    this.mvpEntwicklung = this.formService.getFormControl('mvpEntwicklung');
    this.appModernisierung = this.formService.getFormControl('appModernisierung');
    this.testStrategie = this.formService.getFormControl('testStrategie');
    this.reaktiveProgrammierung = this.formService.getFormControl('reaktiveProgrammierung');
    this.sonstigeAnfrage = this.formService.getFormControl('sonstigeAnfrage');
    this.inquiry = this.formService.getFormControl('inquiry');
    this.acceptPolicies = this.formService.getFormControl('acceptPolicies');
  }

  onSubmit() {
    this.isLoading = true;
    const formData = this.contactForm.value;
    if (!navigator.onLine) {
      localStorage.setItem('pendingFormData', JSON.stringify(formData));
      this.isLoading = false;
      alert(
        `You are currently offline. The form will be submitted once you are online.`,
      );
    } else {
      this.submitForm(formData);
    }
  }

  private submitForm(formData: any) {
    this.isLoading = true;
    this.successMessage = false;
    this.errorMessage = false;

    this.http
      .post<{ message: string }>(environment.apiUrl, formData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (resData) => {
          this.successMessage = true;
          localStorage.removeItem('pendingFormData');

          this.navigationTimeout = setTimeout(() => {
            this.contactForm.reset();
            this.successMessage = false;
            this.router.navigate(['/']);
          }, 8000);
        },
        error: (error) => {
          this.errorMessage = true;

          this.navigationTimeout = setTimeout(() => {
            this.errorMessage = false;
          }, 8000);
        },
      });
  }
}
