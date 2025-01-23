import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('/produtos')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Get()
  async getProduct() {
    return this.productRepository.listProducts();
  }

  @Post()
  async createProduct(@Body() product) {
    return this.productRepository.saveProduct(product);
  }
}
