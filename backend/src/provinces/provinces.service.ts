
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProvincesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const provincesBlocEst = [
      'Bas-Uele',
      'Haut-Uele',
      'Ituri',
      'Maniema',
      'Nord-Kivu',
      'Sud-Kivu',
      'Tanganyika',
      'Tshopo',
    ];

    return this.prisma.province.findMany({
      where: {
        name: {
          in: provincesBlocEst,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
