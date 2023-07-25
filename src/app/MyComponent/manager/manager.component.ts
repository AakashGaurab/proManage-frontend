import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
type todo_el = {
  _id:any,
  image:any,
  name:any,
  email:any,
  password:any,
  bio:any,
  start_date:any,
  status:any
  tech_stack:any
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent {
  managers : any
  json_data : any
  role = sessionStorage.getItem("role")
  constructor(private host:HttpClient,private router:Router){}
    ngOnInit(){
      if (this.role!="admin"){
        alert("Not Authorised")
        this.router.navigate(['/landing']);
        return
      }
        this.host.get("https://promanage-backend.onrender.com/manager").subscribe(
          response=>{
            console.log(response);
            this.managers = response;
            
          },
          error=>{console.log(error)}
        )
    }

    item(user:any){
      //  console.log(user );
      this.json_data = JSON.stringify(user)
       this.router.navigate(['/manager-item'], { queryParams: { data: this.json_data } });
    }


    delete_manager(name:any){
      console.log(name)
      this.host.delete(`https://promanage-backend.onrender.com/manager/${name}`).subscribe(
        (response:any)=>{
          Swal.fire({
            "icon":"success"
          })
          this.ngOnInit()
        },
        (error:any)=>{
          Swal.fire({
            "icon":"error"
          })
        }
      )
    }
}
