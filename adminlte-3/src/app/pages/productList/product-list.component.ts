import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '@pages/productList/add-product/add-product.component';
import { UpdateProductComponent } from '@pages/productList/update-product/update-product.component';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-product-list',

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  user:any;
  lista:any[]=[];
  modalRef: NgbModalRef ;
  listaPaginated:any[]=[];
  currentPage:number;
  pageSize:number;
  totalPage:number;
  busqueda:string;
  lista2:any[]=[];
  pageSizeOptions = [1, 2, 5, 10, 20, 50];

  constructor(private api:ApiService,private auth:AuthService, private modalService:NgbModal){
    this.pageSize=5;
    this.currentPage=1;
    this.user= this.auth.getUser();
  }
  
ngOnInit(): void {
  this.getData();
  

}
getData(){
  this.api.getProductList().subscribe(
    data=>this.handleData(data),
   
 );

}

handleData(data){
  if (data.error) {
    console.log(data.error);
  
  } else {
    this.lista = data;
    this.lista2 = this.lista;
    this.paginate();
    console.log(this.lista);
    this.currentPage = 1;
    // this.onPageChange(this.currentPage);
  }
}

onEdit($object:any){

  const modalRef = this.modalService.open(UpdateProductComponent, { centered: true, size: 'md', backdrop: false });

  modalRef.componentInstance.object = $object

  modalRef.result.then(
    (result) => {
     
      console.log('Modal cerrado con resultado:', result);
      this.getData();
    },
    (reason) => {
      // Aquí puedes manejar lo que sucede si el modal se cierra inesperadamente
      console.log('Modal cerrado debido a:', reason);
      this.getData();
    }
  );

}

onDelete($id){
  if(confirm('¿Estás seguro de que deseas eliminar este producto?')){
  this.api.deleteProduct($id).subscribe(
    data=>console.log('respuesta de borrado'+data)
  )
  }
  this.getData();
}


//abrir modal
onCreate(){
  const modalRef = this.modalService.open(AddProductComponent, { centered: true, size: 'md', backdrop: false });


  modalRef.result.then(
    (result) => {
      this.getData();
      console.log('Modal cerrado con resultado:', result);
    },
    (reason) => {
      // Aquí puedes manejar lo que sucede si el modal se cierra inesperadamente
      console.log('Modal cerrado debido a:', reason);
    }
  );

}

//filtrar y paginar la nueva lista
onBusquedaChange(): void {
  console.log(this.busqueda);
  if (this.busqueda.trim() === '') {
    this.lista2 = this.lista; 
  } else {
    this.lista2 = this.lista.filter(n => 
      n.user && n.user.name && n.user.name.toUpperCase().includes(this.busqueda.toUpperCase())
    );
  }
  this.paginate();
}




//cambiar desde el paginate
onPageChange(page: number): void {
  this.currentPage = page;
  this.paginate();
}

//funcion interna de paginar
paginate(){

  const min = (this.currentPage - 1) * this.pageSize;
  const max = Math.min(this.currentPage * this.pageSize, this.lista2.length);

  this.listaPaginated= this.lista2.slice(min,max);
  console.log(this.listaPaginated);
}

onPageSizeChange(size: number) {
  this.pageSize = size;
  this.paginate();

}

}
