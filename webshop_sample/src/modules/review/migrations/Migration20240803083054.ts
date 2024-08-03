import { Migration } from '@mikro-orm/migrations';

export class Migration20240803083054 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "review" drop column if exists "date_added";');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "review" add column if not exists "date_added" timestamptz not null;');
  }

}
