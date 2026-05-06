import type { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createIndex('now_playing_history', 'station_id');
  pgm.createIndex('now_playing_history', 'logged_at');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('now_playing_history', 'station_id');
  pgm.dropIndex('now_playing_history', 'logged_at');
}
