import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newClient: FormGroup;

  //Form Status
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.newClient = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    })
  }

  async submitHandler () {
    this.loading = true;

    const formValue = this.newClient.value;

    try {
      this.auth.CreateWithEmail(formValue)
      this.success = true;
    } catch (err) {
      console.log(err)
    }
    this.loading = false;
  }

}
