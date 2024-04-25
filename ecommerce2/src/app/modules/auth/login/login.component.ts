import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  emailControl:any;
  passwordControl:any;
  form:FormGroup;
  error:any;
  

  constructor(private api:ApiService, private fb:FormBuilder){
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }

  ngDoCheck(): void {
    this.passwordControl= this.form.get('password');
    this.emailControl=this.form.get('email')
  }

  onSubmit(){
    const obj ={
      email:this.form.get('email')?.value,
      password:this.form.get('password')?.value,
    }
    console.log(obj);
    this.api.login(obj).subscribe(
      data=>this.handleData(data),
    )
  }
  handleData(data:any){
    console.log(data);
    if(data.error){
      this.error = data.error.error;
      
    }else{
      location.reload();
    }
  }

}
