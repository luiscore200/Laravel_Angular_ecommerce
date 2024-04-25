import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { sleep } from '@/utils/helpers';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService,private api:ApiService,private auth:AuthService) {}

    async loginByAuth({email, password}) {
     let objeto:any;
     objeto= {
      email:email,
      password:password
     };
     this.api.login(objeto).subscribe(
     
      data=> this.handleData(data),
     );

      
    }

    async registerByAuth({email, password}) {
        try {
          this.toastr.warning('Not implemented');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
          this.toastr.warning('Not implemented');

        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
          this.toastr.warning('Not implemented');

        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
          this.toastr.warning('Not implemented');

        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {

            this.toastr.warning('Not implemented');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

   handleData(data:any){
   // console.log(data);
    if(data===true){
      console.log(data);
     document.location.reload();
    }else{
      console.log(data);
    }
   
   }

  
}


