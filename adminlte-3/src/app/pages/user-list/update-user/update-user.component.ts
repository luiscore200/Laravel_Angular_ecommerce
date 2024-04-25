import { User } from '@/interface/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-update-user',
 
 
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  user:any;
  form:FormGroup;
  nameControl:any;
  emailControl:any;
  error:any;
  roles:any[];
  roleControl:any;
  objeto:User;

  constructor(private activeModal: NgbActiveModal, private fb:FormBuilder,private api:ApiService){
 this.form = this.fb.group({

  name: ['', [Validators.required, Validators.maxLength(255)]],
  role: ['', []],
  email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
 

  });
  this.api.getRoles().subscribe(
    data=>this.roles=data
   
  )

 
  }
ngOnInit(): void {
  if (this.user) {
    this.form.patchValue({
      name: this.user.user.name,
      email: this.user.user.email,
      role: this.user.role
      // Asigna más campos aquí si es necesario
    });
  }
}

  ngDoCheck(): void {
    this.nameControl= this.form.get('name');
    this.emailControl= this.form.get('email');
    this.roleControl= this.form.get('role');
//    console.log(this.user);
 
  }

  handleData(data){
    if(data.error){
      this.error= data.error.message;
    }else{
     
      console.log(data);
    }
    
  }


close(){
  this.activeModal.close();
}

onSubmit(){
  //console.log(this.objeto);

  if(this.form.valid){
    this.objeto = {
     name:this.form.get("name")?.value,
     role:this.form.get("role")?.value,
    }

       
    console.log(this.objeto);
    this.api.updateUser(this.objeto,this.user.user.id).subscribe(
      data=>this.handleData(data)
    )

  }
 
  this.close();

}
}
