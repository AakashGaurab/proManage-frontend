import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pro-manage';

  data = ''
  flag = false
  constructor(private host:HttpClient){}

  userquery(form:any){
    this.flag = true
    this.host.post("https://promanage-backend.onrender.com/openai",form.value).subscribe(
      (response:any)=>{
        this.flag = false
        this.data = response.choices[0].message.content
        
      },
      (error:any)=>{
        this.flag = false
        Swal.fire(
          {
            icon:"error",
            title:error
          }
        )
      }
    )

    form.resetForm()
  }
}
