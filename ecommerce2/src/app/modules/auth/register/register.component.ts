import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interface/user';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form:FormGroup;
  emailControl:any;
  passwordControl:any;
  objeto!:User;
  error!:any;
  confirmPControl:any;
  nameControl:any;
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService){
    this.form= this.fb.group
      ({
        name: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       password_confirmation:['',[Validators.required]]
      });
    }

    passwordMatchValidator() {

      if (!this.confirmPControl) {
      return { required: true };
     }
      if(this.passwordControl.value == this.confirmPControl.value) 
      { return null}else
      { return this.confirmPControl.setErrors({ mismatch: true})} 
  
  }

  
  ngDoCheck():void { 
    this.nameControl= this.form.get('name');
    this.emailControl= this.form.get('email');
    this.passwordControl= this.form.get('password');
    this.confirmPControl=this.form.get('password_confirmation');
    this.passwordMatchValidator();
  
    }

  onSubmit():void {
    console.log(this.form.value);
    
    if(this.form.valid){
     this.objeto = {
      name:this.form.get("name")?.value,
      email:this.form.get("email")?.value,
      password:this.form.get("password")?.value,
      password_confirmation:this.form.get("password_confirmation")?.value

     }
     console.log(this.objeto);
     this.api.register(this.objeto).subscribe(
         data=>this.handleData(data),
      );
 
   }else {    
     alert("formulario invalido")
   }  
 }

 handleData(data:any){
   console.log(data);
   if(data.error){
    this.error= data.error.error;
   }else{
    this.router.navigateByUrl('/auth/login');
   }
 }

}
