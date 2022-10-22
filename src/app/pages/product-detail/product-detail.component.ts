import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from  '@angular/router';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId : string | null = null;
  product : Product | null = null;

  constructor(
    private route : ActivatedRoute,
    private productServices : ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if (this.productId){
          return this.productServices.getOne(this.productId)
        }
        return [null];
      })
    )
    .subscribe((data) => {
      this.product = data;
    });
  }

  goToBack(){
    
  }


}
