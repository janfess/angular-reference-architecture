import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface InquiryResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a contact/project inquiry to the backend API.
   * @param formData The raw form data from the contact form.
   * @returns An Observable of the API response.
   */
  sendInquiry(formData: any): Observable<InquiryResponse> {
    return this.http.post<InquiryResponse>(environment.apiUrl, formData).pipe(
      catchError((error) => {
        // Here we could add centralized error logging (e.g. Sentry)
        console.error('Inquiry submission failed:', error);
        return throwError(() => new Error('An error occurred while sending your inquiry. Please try again later.'));
      })
    );
  }
}
