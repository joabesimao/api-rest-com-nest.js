import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { v4 as uuid } from 'uuid';
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
    const obj = new ProductEntity();
    obj.id = randomUUID();
    obj.nome = product.nome;
    obj.valor = product.valor;
    obj.quantidade = product.quantidade;
    obj.descricao = product.descricao;
    obj.caracteristicas = product.caracteristicas;
    obj.imagens = product.imagens;
    obj.categoria = product.categoria;

    const produtoCadastrado = await this.productRepository.saveProduct(obj);
    return {
      produto: produtoCadastrado,
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
}
