import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products = [] as any[];

  async saveProduct(product) {
    this.products.push(product);
  }

  async listProducts() {
    return this.products;
  }
}
