import { Migration } from '@mikro-orm/migrations';

export class Migration20240802204435 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "review" ("id" text not null, "product_id" text not null, "title" text not null, "description" text not null, "confirmed" boolean not null, "email" text not null, "verified_customer" boolean not null, "rating" integer not null, "locale" text not null, "date_added" timestamptz not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "review_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "review" cascade;');
  }

}
