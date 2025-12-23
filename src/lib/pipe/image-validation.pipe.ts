  import {
    BadRequestException,
    HttpException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  import { extname } from 'path';

  @Injectable()
  export class ImageValidationPipe implements PipeTransform<any> {
    private readonly allowedExtensions = ['.jpeg', '.jpg', '.png'];

    transform(value: any) {
      try {
        if (!value) return value;
        const files = Array.isArray(value) ? value : [value];

        for (const file of files) {
          const fileExtension = extname(file.originalname).toLowerCase();
          if (!this.allowedExtensions.includes(fileExtension)) {
            throw new BadRequestException(
              `${file.originalname}: Only .jpeg, .jpg, .png formats can be uploaded`,
            );
          }
        }

        return value;
      } catch (error) {
        const errorObject = {
          statusCode: error?.response ? 400 : 500,
          error: {
            message: error?.response
              ? error?.message
              : `Error on image pipe: ${error}`,
          },
        };
        throw new HttpException(
          errorObject.error.message,
          errorObject.statusCode,
        );
      }
    }
  }
