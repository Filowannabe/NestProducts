import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { AuditMiddleware } from './middleware/audit.middleware';
import { HttpModule } from '@nestjs/axios';
import { SecurityClient } from './externalAPI/external.client';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), HttpModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, SecurityClient],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
