import { Injectable, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(productId: string): Promise<Product> {
    return await this.productModel.findById(productId);
  }

  async createProduct(product: Product): Promise<Product> {
    return await new this.productModel(product).save();
  }

  async updateProduct(productId: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(productId, product, {
      new: true,
    });
  }

  async deleteProductById(productId: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(productId);
  }
}
