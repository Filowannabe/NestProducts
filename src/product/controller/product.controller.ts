import { Controller, Post, Get, Put, Delete, Res, Body, Param } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async createProduct(@Res() res, @Body() createProductDTO: Product) {
    await this.productService.createProduct(res, createProductDTO);
  }

  @Get()
  async getProducts(@Res() res) {
    await this.productService.getProducts(res);
  }

  @Get(':id')
  async getProduct(@Res() res, @Param('id') productId) {
    await this.productService.getProduct(res, productId);
  }

  @Put(':id')
  async updateProduct(@Res() res, @Param('id') productId, @Body() createProductDTO: Product) {
    await this.productService.updateProduct(res, productId, createProductDTO);
  }

  @Delete(':id')
  async deleteProduct(@Res() res, @Param('id') productId) {
    await this.productService.deleteProduct(res, productId);
  }
}
