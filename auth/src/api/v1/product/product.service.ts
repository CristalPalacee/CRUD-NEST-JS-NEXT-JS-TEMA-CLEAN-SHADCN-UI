import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { ProductUncheckedCreateInput } from '../../../../generated/prisma/models';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: dto.name,
        price: dto.price,
        category: dto.category,
        description: dto.description,
        userId: dto.userId,
      } as ProductUncheckedCreateInput,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateProductDto) {
    return await this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
