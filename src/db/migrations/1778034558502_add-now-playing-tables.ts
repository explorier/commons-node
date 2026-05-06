import type { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('now_playing', {
    title: { type: 'varchar(1000)' },
    station_id: {
      type: 'integer',
      references: '"stations"',
      primaryKey: true,
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createTable('now_playing_history', {
    id: { type: 'serial', primaryKey: true },
    title: { type: 'varchar(1000)' },
    station_id: {
      type: 'integer',
      references: '"stations"',
    },
    logged_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('now_playing_history');
  pgm.dropTable('now_playing');
}
