import { Injectable, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productRepository.getAllProducts();
    if (products.length > 0) return res.status(HttpStatus.OK).json({ message: 'List of products', products: products });
  }

  async getProduct(@Res() res, productId: string): Promise<Product> {
    const product = await this.productRepository.getProduct(productId);
    if (!product) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({ message: 'Product', products: product });
  }

  async createProduct(@Res() res, product: Product): Promise<Product> {
    const productToFind = await this.productRepository.createProduct(product);
    if (productToFind) return res.status(HttpStatus.OK).json({ message: 'Product succesfully created', product: product });
  }

  async deleteProduct(@Res() res, productId: string): Promise<Product> {
    const product = await this.productRepository.deleteProductById(productId);
    if (!product) return res.status(HttpStatus.OK).json({ message: 'Product was deleted' });
  }

  async updateProduct(@Res() res, productId: string, product: Product): Promise<Product> {
    const productToFind = await this.productRepository.updateProduct(productId, product);
    if (productToFind) return res.status(HttpStatus.OK).json({ message: 'New product', product: product });
  }
}
