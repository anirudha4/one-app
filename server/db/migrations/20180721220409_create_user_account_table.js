module.exports.up = (knex) =>
  knex.schema
    .createTable('user_account', (table) => {
      /* Columns */

      table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));

      table.text('email').notNullable();
      table.text('password').notNullable();
      table.boolean('is_admin').notNullable();
      table.text('name').notNullable();
      table.text('color').notNullable();
      table.text('username');
      table.text('phone');
      table.text('registration_type').notNullable().defaultTo('standard');
      table.bigInteger('organization_id').notNullable();
      table.timestamp('created_at', true);
      table.timestamp('updated_at', true);
      table.timestamp('deleted_at', true);
    })
    .raw(
      'ALTER TABLE "user_account" ADD CONSTRAINT "user_username_unique" EXCLUDE ("username" WITH =) WHERE ("username" IS NOT NULL AND "deleted_at" IS NULL)',
    );

module.exports.down = (knex) => knex.schema.dropTable('user_account');
