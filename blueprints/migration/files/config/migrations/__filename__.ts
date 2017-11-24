import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('posts', (post) => {
    post.text('title');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('posts');
}
