import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  data : any
  task : any
  constructor(private route:ActivatedRoute,private host:HttpClient){}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
       this.task = this.data.tasks
    });
  }





  addResource(form:any){
    this.host.post(`http://127.0.0.1:5000/resource/${this.data.name}`,form.value).subscribe(
      (response:any)=>{
        Swal.fire({"icon":"success","title":response})
      },
      error =>{
        Swal.fire({"icon":"warning","title":"Error"})
      }
    )
    form.resetForm()
  }
}
