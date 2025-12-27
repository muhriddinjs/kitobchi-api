import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { config } from 'src/config';
import { BookImageModule } from './book_image/book_image.module';
import { BookListingModule } from './book_listing/book_listing.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: config.DB_SYNC,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', config.FILE_PATH),
      serveRoot: `/api/v1${config.FILE_PATH}`,
    }),
    BookImageModule,
    BookListingModule,
    CategoryModule,
    LikeModule,
    ProfileModule,
    UserModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
