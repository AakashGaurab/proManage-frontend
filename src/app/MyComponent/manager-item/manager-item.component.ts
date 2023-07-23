import { Component ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
type obj = {
  id:any,
  status : any
}
@Component({
  selector: 'app-manager-item',
  templateUrl: './manager-item.component.html',
  styleUrls: ['./manager-item.component.css']
})
export class ManagerItemComponent {
  data : any
  project : any
  obj = {
    name: "asas",
    status : "as"
  }
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
      this.project = this.data.project;
    });
  }


  status(){
    this.obj["name"] = this.data["name"]
    if (this.data.status=="active"){
      this.obj["status"] = "inactive";
    }
    else {
      this.obj["status"] = "active";
    }


    this.http.patch("http://127.0.0.1:5000/manager/status",this.obj).subscribe(
        response => {
          console.log('POST request successful', response);
          if (200) {
            Swal.fire(
              {
                icon:"success",
                title:"status updated"
              }
            )

            
          }
          // Handle the response data
        },
        error => {
          console.log('Error', error);
          // Handle the error
          Swal.fire({
            title:"Error updating status",
            icon: 'error'
          }
          )
        }

        
      )



  }
}
