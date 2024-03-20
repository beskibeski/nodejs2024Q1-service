import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710940528930 implements MigrationInterface {
    name = 'Migrations1710940528930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_album" ("id" uuid NOT NULL, CONSTRAINT "PK_8b1f4c021579fa1631fcc0b6377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artist" ("id" uuid NOT NULL, CONSTRAINT "PK_62b62ed38bf0e76f54a5609f9ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_track" ("id" uuid NOT NULL, CONSTRAINT "PK_919a46033d84cebe3f7c405fe50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_album" ADD CONSTRAINT "FK_8b1f4c021579fa1631fcc0b6377" FOREIGN KEY ("id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" ADD CONSTRAINT "FK_62b62ed38bf0e76f54a5609f9ae" FOREIGN KEY ("id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_track" ADD CONSTRAINT "FK_919a46033d84cebe3f7c405fe50" FOREIGN KEY ("id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_track" DROP CONSTRAINT "FK_919a46033d84cebe3f7c405fe50"`);
        await queryRunner.query(`ALTER TABLE "favorite_artist" DROP CONSTRAINT "FK_62b62ed38bf0e76f54a5609f9ae"`);
        await queryRunner.query(`ALTER TABLE "favorite_album" DROP CONSTRAINT "FK_8b1f4c021579fa1631fcc0b6377"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`DROP TABLE "favorite_track"`);
        await queryRunner.query(`DROP TABLE "favorite_artist"`);
        await queryRunner.query(`DROP TABLE "favorite_album"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
