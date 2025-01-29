import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ListProductDTO } from './dto/list-Product.dto';
import { UpdateProductDTO } from './dto/update-productDTO';
import { ProductEntity } from './emtity/Product';
import { ProductRepository } from './product.repository';

@Controller('/produtos')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Get()
  async getProduct() {
    const listProduct = await this.productRepository.listProducts();
    const productShort = listProduct.map(
      (product) => new ListProductDTO(product.id, product.nome),
    );
    return productShort;
  }

  @Post()
  async createProduct(@Body() product: CreateProductDTO) {
    const objectProduct = new ProductEntity();
    objectProduct.id = randomUUID();
    objectProduct.nome = product.nome;
    objectProduct.valor = product.valor;
    objectProduct.quantidade = product.quantidade;
    objectProduct.descricao = product.descricao;
    objectProduct.caracteristicas = product.caracteristicas;
    objectProduct.imagens = product.imagens;
    objectProduct.categoria = product.categoria;

    const registeredProduct =
      await this.productRepository.saveProduct(objectProduct);
    return {
      produto: registeredProduct,
      mensagem: 'produto cadastrado com sucesso',
    };
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dataForUpdate: UpdateProductDTO,
  ) {
    const updatedProduct = await this.productRepository.UpdateProduct(
      id,
      dataForUpdate,
    );
    return {
      produto: updatedProduct,
      mensagem: 'Produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const removeProduct = await this.productRepository.removeProduct(id);
    return removeProduct;
  }
}
