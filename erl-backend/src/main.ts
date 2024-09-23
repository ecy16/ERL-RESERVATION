import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
                forbidNonWhitelisted: true,
    }))
    app.useStaticAssets(join(__dirname, '..', 'uploads'));
    app.enableCors(); // Enable CORS
    const config = new DocumentBuilder()
        .setTitle('Erl')
        .setDescription('The Erl API description')
        .setVersion('1.0')
            .addTag('erl')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api');
    
    await app.listen(3000);
    


}
bootstrap();
