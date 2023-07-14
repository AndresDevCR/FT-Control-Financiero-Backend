import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../const';

export class administration1676663942896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt: string = bcrypt.genSaltSync(10);

    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp" with schema "public";`,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."module_category";`,
    );

    await queryRunner.query(`CREATE TABLE "${schema}"."module_category" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR ( 70 ) NOT NULL,
      "display_name" VARCHAR ( 70 ) NOT NULL,
      "is_active" boolean default true,
      "created_on" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_on" TIMESTAMP NOT NULL DEFAULT now()
  );
  `);

    await queryRunner.query(`CREATE TABLE "${schema}"."application" (
      "id" SERIAL PRIMARY KEY,
      "application_uuid" uuid DEFAULT uuid_generate_v4 (),
      "name" VARCHAR ( 70 ) NOT NULL,
      "display_name" VARCHAR ( 70 ) NOT NULL,
      "description" VARCHAR ( 255 ),
      "is_active" boolean default true,
      "created_on" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_on" TIMESTAMP NOT NULL DEFAULT now()
  );
  `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."role";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."role" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR ( 50 ) NOT NULL,
            "display_name" VARCHAR ( 50 ) NOT NULL,
            "application_id" INT,
            "description" VARCHAR ( 255 ),
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."company";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."company" (
            "id" SERIAL PRIMARY KEY,
            "company_uuid" uuid DEFAULT uuid_generate_v4 (),
            "name" VARCHAR ( 100 ) NOT NULL,
            "description" VARCHAR ( 255 ),
            "category" VARCHAR ( 255 ),
            "primary_phone_number" VARCHAR ( 255 ),
            "secondary_phone_number" VARCHAR ( 255 ),
            "city" VARCHAR ( 255 ),
            "state" VARCHAR ( 255 ),
            "country" VARCHAR ( 255 ),
            "is_active" boolean default true,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`CREATE TABLE "${schema}"."phone" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT NOT NULL,
        "phone" VARCHAR ( 15 ) NOT NULL,
        "type" VARCHAR ( 15 ) NOT NULL,
        "is_primary" boolean default true,
        "created_on" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_on" TIMESTAMP NOT NULL DEFAULT now()
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."address" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "city" VARCHAR ( 15 ) NOT NULL,
      "state" VARCHAR ( 15 ) NOT NULL,
      "country" VARCHAR ( 15 ) NOT NULL,
      "description" VARCHAR ( 300 ) NOT NULL,
      "is_primary" boolean default true,
      "created_on" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_on" TIMESTAMP NOT NULL DEFAULT now()
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."user_has_applications" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "application_id" INT NOT NULL
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."module_has_applications" (
      "id" SERIAL PRIMARY KEY,
      "module_id" INT NOT NULL,
      "application_id" INT NOT NULL
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."user_has_modules" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "module_id" INT NOT NULL
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."user_companies" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "company_id" INT NOT NULL
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."user_has_roles" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "role_id" INT NOT NULL
    );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."location";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."location" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR ( 50 ) NOT NULL,
      "company_id" INT NOT NULL,
      "building" VARCHAR ( 50 ),
      "address" VARCHAR ( 50 ),
      "type" VARCHAR ( 50 ),
      "active" boolean default true,
      "created_on" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_on" TIMESTAMP NOT NULL DEFAULT now()
    );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."user";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."user" (
        "id" SERIAL PRIMARY KEY,
        "first_name" VARCHAR ( 50 ) NOT NULL,
        "last_name" VARCHAR ( 50 ) NOT NULL,
        "email" VARCHAR ( 255 ) UNIQUE NOT NULL,
        "password"  VARCHAR ( 255 ) NOT NULL,
        "password_reset_code" VARCHAR ( 255 ),
        "company_id" INT NOT NULL,
        "is_active" boolean default true,
        "company_start_date" date,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "last_login" TIMESTAMP 
    );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."profile";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."profile" (
            "id" SERIAL PRIMARY KEY,
            "user_id" INT,
            "image_url" VARCHAR ( 300 ),
            "birthdate" date,
            "primary_phone" VARCHAR ( 15 ),
            "secondory_phone" VARCHAR ( 15 ),
            "nationality" VARCHAR ( 40 ),
            "alias" VARCHAR ( 50 ),
            "work_id" VARCHAR ( 50 ),
            "supervisor_name" VARCHAR ( 50 )
            
        );
        `);

    await queryRunner.query(
      `ALTER TABLE "${schema}"."phone"
        ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."address"
        ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."role"
        ADD CONSTRAINT application_id_fk FOREIGN KEY (application_id) REFERENCES "${schema}"."application"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    // fk usuarios con company

    await queryRunner.query(
      `ALTER TABLE "${schema}"."profile"
          ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${schema}"."user"(id) ON DELETE CASCADE ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."user"
          ADD CONSTRAINT company_id_fk FOREIGN KEY (company_id) REFERENCES "${schema}"."company"(id) ON DELETE CASCADE ON UPDATE RESTRICT;`,
    );

    // FK User
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_applications" ADD CONSTRAINT "FK_user_has_applications_user_id" FOREIGN KEY ("user_id") REFERENCES "${schema}"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    // FK Application
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_applications" ADD CONSTRAINT "FK_user_has_applications_application_id" FOREIGN KEY ("application_id") REFERENCES "${schema}"."application" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    // FK User
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_companies" ADD CONSTRAINT "FK_user_companies_user_id" FOREIGN KEY ("user_id") REFERENCES "${schema}"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    // FK Company
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_companies" ADD CONSTRAINT "FK_user_companies_application_id" FOREIGN KEY ("company_id") REFERENCES "${schema}"."company" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_roles" ADD CONSTRAINT "FK_user_has_roles_user_id" FOREIGN KEY ("user_id") REFERENCES "${schema}"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    // FK Application
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_roles" ADD CONSTRAINT "FK_user_has_roles_role_id" FOREIGN KEY ("role_id") REFERENCES "${schema}"."role" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );


    await queryRunner.query(
      `
            INSERT INTO "${schema}".application (name, display_name) VALUES('control financiero', 'Control Financiero');
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".role (name, display_name, application_id) VALUES('super_administrator', 'Super Administrador', 1);
            INSERT INTO "${schema}".role (name, display_name, application_id) VALUES('administrator', 'Administrador', 1);
            INSERT INTO "${schema}".role (name, display_name, application_id) VALUES('editor', 'Editor', 1);
            INSERT INTO "${schema}".role (name, display_name, application_id) VALUES('visualizer', 'Visualizador', 1);
            INSERT INTO "${schema}".role (name, display_name, application_id) VALUES('contractor', 'Contratista', 1);
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".company (name) VALUES('Fusion Tech');
            INSERT INTO "${schema}".company (name) VALUES('Boston Scientific');
            INSERT INTO "${schema}".company (name) VALUES('CooperVision');
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Alejandro', 'Gonzalez', 'alejandro.gonzalez@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Manuel', 'Ulate', 'manuel.ulate@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Andres', 'Vargas', 'andres.vargas@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Nathalie', 'Picado', 'nathalie.picado@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Juan', 'Martínez', 'jmartinez@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Rodrigo', 'Martínez', 'rodrigo.martinez@sodiel.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Sofía', 'Ramírez', 'sofia.ramirez@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Kendall', 'Solís', 'kendall.solis@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 3);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, company_id) VALUES('Ruben', 'Contreras', 'ruben.contreras@bsci.com', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}', 2);
            `,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
