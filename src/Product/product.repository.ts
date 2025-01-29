import { Injectable } from '@nestjs/common';
import { ProductEntity } from './emtity/Product';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async saveProduct(product: ProductEntity) {
    this.products.push(product);
  }

  async listProducts() {
    return this.products;
  }

  async UpdateProduct(id: string, dataForUpdate: Partial<ProductEntity>) {
    const product = this.findById(id);
    Object.entries(dataForUpdate).forEach(([key, val]) => {
      if (key === 'id') {
        return;
      }
      product[key] = val;
    });
    return product;
  }

  private findById(id: string) {
    const possibleProduct = this.products.find(
      (prodSave) => prodSave.id === id,
    );
    if (!possibleProduct) {
      throw new Error('produto não existe');
    }
    return possibleProduct;
  }

  async removeProduct(id: string) {
    const product = this.findById(id);
    this.products = this.products.filter((prod) => prod.id !== id);
    return product;
  }
}
