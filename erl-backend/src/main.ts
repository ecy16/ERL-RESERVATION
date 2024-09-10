import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule,{cors: true});
    app.useGlobalPipes(new ValidationPipe({
        whitelist:true,
        forbidNonWhitelisted:true,
    }))
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
