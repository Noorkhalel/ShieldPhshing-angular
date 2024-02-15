import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-abutus',
  templateUrl: './abutus.component.html',
  styleUrls: ['./abutus.component.scss']
})
export class AbutusComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  done = false;
  onSubmit() {
    const formData = this.myForm.value;
    this.done = false;
    this.http.post('https://formspree.io/f/mpzvwklg', formData)
      .subscribe(
        (response: any) => {
          console.log('Form submitted successfully:', response);
          this.done = true;
        },
        (error: any) => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
