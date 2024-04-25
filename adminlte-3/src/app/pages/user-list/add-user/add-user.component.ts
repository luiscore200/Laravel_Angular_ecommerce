import { User } from '@/interface/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  
  form:FormGroup;
  nameControl:any;
  emailControl:any;
  passwordControl:any;
  confirmPControl:any;
  error:any;
  roles:any[];
  roleControl:any;
  objeto:User;

  constructor(private activeModal: NgbActiveModal, private fb:FormBuilder,private api:ApiService){
 this.form = this.fb.group({

  name: ['', [Validators.required, Validators.maxLength(255)]],
  role: ['', []],
  email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  password_confirmation:['',[Validators.required]]

  });
  this.api.getRoles().subscribe(
    data=>this.roles=data
   
  )
  
  }
  ngDoCheck(): void {
    this.nameControl= this.form.get('name');
    this.emailControl= this.form.get('email');
    this.roleControl= this.form.get('role');
    this.passwordControl= this.form.get('password');
    this.confirmPControl= this.form.get('password_confirmation');
    this.passwordMatchValidator();
    
  }

  handleData(data){
    if(data.error){
      this.error= data.error.message;
    }else{
     
      console.log(data);
    }
    
  }

  passwordMatchValidator() {

    if (!this.confirmPControl) {
    return { required: true };
   }
    if(this.passwordControl.value == this.confirmPControl.value) 
    { return null}else
    { return this.confirmPControl.setErrors({ mismatch: true})} 

}




close(){
  this.activeModal.close();
}

onSubmit(){
  console.log(this.form.value);

  if(this.form.valid){
    this.objeto = {
     name:this.form.get("name")?.value,
     email:this.form.get("email")?.value,
     role:this.form.get("role")?.value,
     password:this.form.get("password")?.value,
     password_confirmation:this.form.get("password_confirmation")?.value

    }

       
   // console.log(this.objeto);
    this.api.storeUser(this.objeto).subscribe(
      data=>this.handleData(data)
    )

  }
 
  this.close();

}
}
