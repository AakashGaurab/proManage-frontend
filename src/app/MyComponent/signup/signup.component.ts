import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http: HttpClient,private router:Router) { }

    sub(form:any){
      console.log(form.value);
      
      this.http.post("https://promanage-backend.onrender.com/signup",form.value).subscribe(
        response => {
          console.log('POST request successful', response);
          if (200) {
            Swal.fire(
              {
                icon:"success",
                title:"Signup Succesfull"
              }
            )

            this.router.navigate(['/login']);
          }
          // Handle the response data
        },
        error => {
          console.log('Error', error);
          // Handle the error
          Swal.fire({
            title:"Error in Signup , Try again later",
            icon: 'error'
          }
          )
        }

        
      )


      form.resetForm();
    }
}
