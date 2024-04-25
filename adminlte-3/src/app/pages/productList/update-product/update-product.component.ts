import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  
  form:FormGroup;
  nameControl:any;
  priceControl:any;
  categoryControl:any;
  descriptionControl:any;
  imageControl:any;
  image:any;
  image_url:any;

  error:any;
  categories:any[];
  object:any;


  constructor(private activeModal: NgbActiveModal, private fb:FormBuilder,private api:ApiService){
 this.form = this.fb.group({

  name: ['', [Validators.required, Validators.maxLength(255)]],
  category: ['', [Validators.required,]],
  price: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.maxLength(500)]],
  image:['',[]]

  });
  this.api.getCategories().subscribe(
    data=>this.categories=data
   
  )
  
  }

  ngOnInit(): void {
    console.log(this.object);
    if (this.object) {
      this.form.patchValue({
        name: this.object.name,
        category:this.object.category.name,
        price:this.object.price,
        description: this.object.description,
        //image:
        // Asigna más campos aquí si es necesario
      });
    }
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
  this.image_url = URL.createObjectURL(event.target.files[0]);
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
  if (this.image) {
    formData.append('image', this.image); // Agrega la nueva imagen al FormData
  }
  formData.append('_method', 'PUT'); // Agregar este campo para indicar la actualización



  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });

  this.api.updateProduct(formData,this.object.id).subscribe(
      data => {
          this.handleData(data);
        
      },
      error => console.error(error)
  );

 }

  
 
  this.close();

}

}
