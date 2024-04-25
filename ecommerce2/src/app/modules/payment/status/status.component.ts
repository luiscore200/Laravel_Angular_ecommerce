import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../service/api.service';


declare const MPStatus:any;

@Component({
  selector: 'app-status',

  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  Query:string="";
  Payment:any;

  constructor(private route: ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
  //    console.log(params);
      this.Query = params['payment_id'];
});
//console.log(this.Query);
  this.handlePayment();
  this.bindStatus(this.Query);
  }


  handlePayment():void{
    this.api.findPayment(this.Query).subscribe(
     data=>{
      this.Payment=data;
     }
    );

  }

  bindStatus(data:any){
    if (typeof MPStatus === 'function') {
      MPStatus(data);
     } else {
       console.error("La función 'MPStatus' no está definida o el script no se ha cargado correctamente.");
     }

  }

  

}
