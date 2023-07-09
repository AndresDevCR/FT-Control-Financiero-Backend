import { APP_GALLERY_SCHEMA as schema } from '@/const';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GalleryApp1688928643916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    //category

    await queryRunner.query(`
    CREATE TABLE "${schema}"."category" (
        "id" serial not null,
        "name" varchar(255) not null,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        primary key ("id")
        );
    `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."artwork" (
        "id" serial not null,
        "name" varchar(255) not null,
        "description" varchar(255) not null,
        "price" int not null,
        "artist" varchar(255) not null,
        "category_id" int not null,
        "is_available" boolean not null,
        "is_favorite" boolean not null default false,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        foreign key ("category_id") references "${schema}"."category" ("id"),
        primary key ("id")
        );
    `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."artwork_image" (
        "id" serial not null,
        "artwork_id" int not null,
        "image_url" varchar(255) not null,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        foreign key ("artwork_id") references "${schema}"."artwork" ("id"),
        primary key ("id")
        );
    `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."order" (
        "id" serial not null,
        "client_name" varchar(255) not null,
        "client_email" varchar(255) not null,
        "artwork_id" int not null,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        foreign key ("artwork_id") references "${schema}"."artwork" ("id"),
        primary key ("id")
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
