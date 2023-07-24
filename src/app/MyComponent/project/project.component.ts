import { Component , ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  project:any
  managers:any
  json_data : any
  role = sessionStorage.getItem("role")
  email = sessionStorage.getItem("email")
    constructor (private host:HttpClient,private elementRef: ElementRef,private router:Router){}
    ngOnInit(){
      if (this.role=="admin"){
      this.host.get("http://127.0.0.1:5000/project").subscribe(
        response=>{
          this.project = response;
        },
        error=>{alert(error)}
      )


      this.host.get("http://127.0.0.1:5000/manager").subscribe(
          response=>{

            this.managers = response;
            
          },
          error=>{alert(error)}
        )}
        else if (this.email!="null"){
          this.host.get(`http://127.0.0.1:5000/project/${this.email}`).subscribe(
            (response: any)=>{
              this.project = response;
            },
            error=>{alert(error)}
          )
    
    
          this.host.get("http://127.0.0.1:5000/manager").subscribe(
              response=>{
                this.managers = response;
                
              },
              error=>{alert(error)}
            )
        }
        else {
          alert("Login Please")
          this.router.navigate(['/landing'])
          return
        }
    }
    

    addProj(form:any){
       if (this.role!="admin"){
          Swal.fire({"icon":"info","title":"You are not authorised to create a Project"})
          return
       }
       this.host.post("http://127.0.0.1:5000/project",form.value).subscribe(
        response=>{
          console.log(response);
          Swal.fire({
            icon:"success",
            title:response
          })
        },
        error=>{
          console.log(error);
          Swal.fire({
            icon:"error",
            title:"Error"
          })
        }
       )

       form.resetForm()
    }


    delete_data(data:any){
      this.host.delete("http://127.0.0.1:5000/project",data).subscribe(
        response =>{
          this.ngOnInit()
          Swal.fire(
            {
              "icon":"success",
              "title": response
            }
          )
        },
        error=>{
          Swal.fire(
            {
              "icon":"info",
              "title":"Error Deleting"
            }
          )
        }
      )
    }


    status(form:any){

      this.host.patch("http://127.0.0.1:5000/project",form.value).subscribe(
        response =>{
          Swal.fire(
            {
              "icon":"success",
              "title":"Status Updated"
            }
          )
        },
        error=>{
          Swal.fire({
            "icon":"error",
            "title":"Error updating Status"
          })
        }
      )
      form.resetForm();
    }


    view(data:any){
      this.json_data = JSON.stringify(data)
      this.router.navigate(['/project-item'], { queryParams: { data: this.json_data } });
    }


    task_create(form:any){
      console.log(form.value)
      this.host.post("http://127.0.0.1:5000/task_create",form.value).subscribe(
        response=>{
          Swal.fire({"icon":"success","title":response})
        },
        error=>{
          Swal.fire({"icon":"error","title":"Error Creating Task"})
        }
      )
    }


    sort(value:any){
      if (value.value=="LTH"){
          this.project = this.project.sort((a:any,b:any)=>{return new Date(a.start_date).getDate() - new Date(b.start_date).getDate() }) 
          
      }
      else if (value.value=="HTL"){
        this.project = this.project.sort((a:any,b:any)=>{return new Date(b.start_date).getDate() - new Date(a.start_date).getDate() }) 
        
      }
      else {
        this.ngOnInit()
      }

    }


    filter(value:any){
      if (value.value==""){
        this.ngOnInit()
        return;
      }
      this.project = this.project.filter((a:any)=>{return a.status==value.value})
    }

}

