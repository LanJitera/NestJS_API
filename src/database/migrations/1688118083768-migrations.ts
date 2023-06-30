import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1688118083768 implements MigrationInterface {
    name = 'migrations1688118083768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "encrypted_password" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "reset_password_token" character varying, "reset_password_sent_at" TIMESTAMP, "remember_created_at" TIMESTAMP, "current_sign_in_at" TIMESTAMP, "last_sign_in_at" TIMESTAMP, "current_sign_in_ip" character varying, "last_sign_in_ip" character varying, "sign_in_count" integer NOT NULL DEFAULT '0', "password" character varying, "password_confirmation" character varying, "locked_at" TIMESTAMP, "failed_attempts" integer NOT NULL DEFAULT '0', "unlock_token" character varying, "confirmation_token" character varying, "unconfirmed_email" character varying, "confirmed_at" TIMESTAMP, "confirmation_sent_at" TIMESTAMP, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "UQ_f5894bd39071094f70aedd8af67" UNIQUE ("reset_password_token"), CONSTRAINT "UQ_89fcdf28a356dd7f3c8f0df1455" UNIQUE ("unlock_token"), CONSTRAINT "UQ_32d44a1ae047be170fbb5a6530f" UNIQUE ("confirmation_token"), CONSTRAINT "UQ_56db053b4b5afb5dca180ec330a" UNIQUE ("unconfirmed_email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isactive" boolean DEFAULT false, "username" character varying NOT NULL DEFAULT '', "password" text DEFAULT '', "dateofbirth" TIMESTAMP NOT NULL, "encrypted_password" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "reset_password_token" character varying, "reset_password_sent_at" TIMESTAMP, "remember_created_at" TIMESTAMP, "current_sign_in_at" TIMESTAMP, "last_sign_in_at" TIMESTAMP, "current_sign_in_ip" character varying, "last_sign_in_ip" character varying, "sign_in_count" integer NOT NULL DEFAULT '0', "password_confirmation" character varying, "locked_at" TIMESTAMP, "failed_attempts" integer NOT NULL DEFAULT '0', "unlock_token" character varying, "confirmation_token" character varying, "unconfirmed_email" character varying, "confirmed_at" TIMESTAMP, "confirmation_sent_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ee6419219542371563e0592db51" UNIQUE ("reset_password_token"), CONSTRAINT "UQ_b800fd597d3e239f367bb8852df" UNIQUE ("unlock_token"), CONSTRAINT "UQ_00ef65cb563e7c32768f478d49b" UNIQUE ("confirmation_token"), CONSTRAINT "UQ_29f17c6c6424b532a3ee36e840e" UNIQUE ("unconfirmed_email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."partybookings_status_enum" AS ENUM('Approve', 'Reject', 'Unvalue')`);
        await queryRunner.query(`CREATE TABLE "partybookings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "party_id" integer NOT NULL, "status" "public"."partybookings_status_enum" DEFAULT 'Approve', CONSTRAINT "PK_f6fc3e815797a14d357f9ea40ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."parties_isstatus_enum" AS ENUM('Public', 'Draft', 'Close', 'Private')`);
        await queryRunner.query(`CREATE TABLE "parties" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nameparty" character varying NOT NULL DEFAULT '', "partystarttime" TIMESTAMP NOT NULL, "partylocation" character varying NOT NULL DEFAULT '', "numberofpeople" integer, "isstatus" "public"."parties_isstatus_enum" DEFAULT 'Public', "admin_id" integer NOT NULL, "describe" text, "requiredage" integer, "img" text DEFAULT '', CONSTRAINT "PK_da698299dca60d55f0050dde935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "resource_owner_id" integer NOT NULL, "resource_owner_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65140f59763ff994a0252488166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9f8f44257355360846bb3826ed" ON "access_tokens" ("token") `);
        await queryRunner.query(`CREATE INDEX "IDX_1eb4d35b4dfacd5c971cc02d8c" ON "access_tokens" ("refresh_token") `);
        await queryRunner.query(`CREATE TABLE "storage_files" ("id" SERIAL NOT NULL, "file_path" character varying NOT NULL, "origin_name" character varying NOT NULL, "mime_type" character varying NOT NULL, "checksum" character varying NOT NULL, "size" integer NOT NULL, "disk" character varying NOT NULL, "uploader_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01de016a496655ebca9a2558bed" PRIMARY KEY ("id", "uploader_id"))`);
        await queryRunner.query(`ALTER TABLE "partybookings" ADD CONSTRAINT "FK_16166ad3d4bf9df53686f7d7f6c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partybookings" ADD CONSTRAINT "FK_69e2d5fcb7c29725a5405c9c647" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parties" ADD CONSTRAINT "FK_a6e2c3968cd8551b00bf4bcb357" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parties" DROP CONSTRAINT "FK_a6e2c3968cd8551b00bf4bcb357"`);
        await queryRunner.query(`ALTER TABLE "partybookings" DROP CONSTRAINT "FK_69e2d5fcb7c29725a5405c9c647"`);
        await queryRunner.query(`ALTER TABLE "partybookings" DROP CONSTRAINT "FK_16166ad3d4bf9df53686f7d7f6c"`);
        await queryRunner.query(`DROP TABLE "storage_files"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1eb4d35b4dfacd5c971cc02d8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f8f44257355360846bb3826ed"`);
        await queryRunner.query(`DROP TABLE "access_tokens"`);
        await queryRunner.query(`DROP TABLE "parties"`);
        await queryRunner.query(`DROP TYPE "public"."parties_isstatus_enum"`);
        await queryRunner.query(`DROP TABLE "partybookings"`);
        await queryRunner.query(`DROP TYPE "public"."partybookings_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
