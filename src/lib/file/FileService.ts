import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { config } from 'src/config';

@Injectable()
export class FileService {
  private filePath = join(process.cwd(), config.FILE_PATH);

  constructor() {
    // Agar papka mavjud bo'lmasa, yaratamiz
    if (!existsSync(this.filePath)) {
      mkdirSync(this.filePath, { recursive: true });
    }
  }

  async create(file: Express.Multer.File): Promise<string> {
    try {
      // Fayl nomini tozalash va kengaytmani saqlash
      const extension = file.originalname.split('.').pop();
      const name = file.originalname
        .replace(/\.[^/.]+$/, '') // extension ni olib tashlash
        .replace(/[^a-zA-Z0-9]/g, ''); // faqat harf va raqam qoldirish

      const fileName = `${Date.now()}_${name}.${extension}`;

      const filePath = join(this.filePath, fileName);

      await writeFile(filePath, file.buffer);

      return `${config.BASE_URL}/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on uploading file: ${error}`,
      );
    }
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const parts = fileUrl.split(`${config.BASE_URL}/`);
      if (parts.length < 2) {
        throw new BadRequestException('Invalid file URL');
      }
      const fileName = parts[1];
      const filePath = join(this.filePath, fileName);

      if (!existsSync(filePath)) {
        throw new BadRequestException('File not found');
      }

      await unlink(filePath);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException(
        `Error on deleting file: ${error}`,
      );
    }
  }

  async exist(fileUrl: string | null): Promise<boolean> {
    try {
      if (!fileUrl) return false;

      const parts = fileUrl.split(`${config.BASE_URL}/`);
      if (parts.length < 2) return false;

      const fileName = parts[1];
      const filePath = join(this.filePath, fileName);

      return existsSync(filePath);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on checking file: ${error}`,
      );
    }
  }
}
