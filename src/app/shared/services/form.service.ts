import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      beratungEntwicklung: [''],
      accessibilityConsulting: [''],
      codeArchitektur: [''],
      mvpEntwicklung: [''],
      appModernisierung: [''],
      testStrategie: [''],
      reaktiveProgrammierung: [''],
      sonstigeAnfrage: [''],
      inquiry: ['', [Validators.required, Validators.maxLength(5000)]],
      acceptPolicies: [true],
    });
  }

  getForm(): FormGroup {
    return this.contactForm;
  }

  getFormControl(name: string): FormControl {
    return this.contactForm.get(name) as FormControl;
  }

  getFormControlValue(name: string): any {
    const control = this.contactForm.get(name);
    return control ? control.value : null;
  }
}
