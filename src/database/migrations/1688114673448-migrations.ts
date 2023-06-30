import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1688114673448 implements MigrationInterface {
    name = 'migrations1688114673448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parties" DROP CONSTRAINT "FK_f62d62e656a13f0d0fe4e3fb9b5"`);
        // await queryRunner.query(`ALTER TABLE "storage_files" ALTER COLUMN "uploader_id" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "parties" ADD CONSTRAINT "FK_f62d62e656a13f0d0fe4e3fb9b5" FOREIGN KEY ("img_id", "img_uploader_id") REFERENCES "storage_files"("id","uploader_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parties" DROP CONSTRAINT "FK_f62d62e656a13f0d0fe4e3fb9b5"`);
        // await queryRunner.query(`ALTER TABLE "storage_files" ALTER COLUMN "uploader_id" SET NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "parties" ADD CONSTRAINT "FK_f62d62e656a13f0d0fe4e3fb9b5" FOREIGN KEY ("img_id", "img_uploader_id") REFERENCES "storage_files"("id","uploader_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
