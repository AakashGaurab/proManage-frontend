import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient,private router: Router) { }
    login(form:any){

      if (form.value.email=="admin" && form.value.password=="admin123"){
        Swal.fire(
          {
            icon:"success",
            title:"Login Succesfull"
          }
        )

        sessionStorage.setItem("role","admin");
        return;
      }
        this.http.post("https://promanage-backend.onrender.com/login",form.value).subscribe(
        (response:any )=> {

          if (response) {
            Swal.fire(
              {
                icon:"success",
                title:"Login Succesfull"
              }
            )
              
              sessionStorage.setItem("email",response[0].name)
              this.router.navigate(['/landing']);
          }
          else {
            Swal.fire(
              {
                icon:"info",
                title:response
              }
            )
          }
          // Handle the response data
        },
        error => {
          console.log('Error', error);
          // Handle the error
          Swal.fire({
            title:"Error Logging In",
            icon: "warning"
          }
          )
        }

        
      )
        form.resetForm();
    }
}
