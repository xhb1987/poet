import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception-filter/exception-filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import configuration from './config/configuration';
import { Role } from './user/entity/role.entity';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PoetryModule } from './poetry/poetry.module';
import { Poetry } from './poetry/entity/poetry.entity';
import { Collection } from './profile/entity/collection.entity';
import { RecommendationPoetry } from './recommendation/entity/recommendation.entity';
import { RecommendationModule } from './recommendation/recommendation.module';
@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
    imports: [
        ConfigModule.forRoot({ load: [databaseConfig, configuration] }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('database.host'),
                port: config.get('database.port'),
                username: config.get('database.username'),
                password: config.get('database.password'),
                database: config.get('database.name'),
                autoLoadEntities: true,
                synchronize: true,
                entities: [
                    User,
                    Role,
                    Poetry,
                    Collection,
                    RecommendationPoetry,
                ],
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        ProfileModule,
        PoetryModule,
        RecommendationModule,
    ],
})
export class AppModule {}
