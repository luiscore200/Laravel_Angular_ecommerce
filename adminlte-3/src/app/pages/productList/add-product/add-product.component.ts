import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  form:FormGroup;
  nameControl:any;
  priceControl:any;
  categoryControl:any;
  descriptionControl:any;
  imageControl:any;
  image:any;

  error:any;
  categories:any[];
  object:any;


  constructor(private activeModal: NgbActiveModal, private fb:FormBuilder,private api:ApiService){
 this.form = this.fb.group({

  name: ['', [Validators.required, Validators.maxLength(255)]],
  category: ['', [Validators.required,]],
  price: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.maxLength(500)]],
  image:['',[Validators.required]]

  });
  this.api.getCategories().subscribe(
    data=>this.categories=data
   
  )
  
  }
  ngDoCheck(): void {
    this.nameControl= this.form.get('name');
   
    this.categoryControl= this.form.get('category');
    this.priceControl= this.form.get('price');
    this.descriptionControl= this.form.get('description');
    this.imageControl= this.form.get('image');
   
    
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

onTarget(event:any){
  this.image= event.target.files[0];
  console.log(this.image);
}


onSubmit(){
//console.log(this.form.value);

 if(this.form.valid){
  const formData = new FormData();
  formData.append('name', this.form.value.name);
  formData.append('category', this.form.value.category);
  formData.append('price', this.form.value.price);
  formData.append('description', this.form.value.description);
  formData.append('image', this.image); // Aquí asumiendo que "this.image" contiene el archivo de imagen seleccionado
  
  

//console.log();


  this.api.storeProduct(formData).subscribe(
      data => {
          this.handleData(data);
          this.close();
      },
      error => console.error(error)
  );

 }

  
 
  this.close();

}
}
