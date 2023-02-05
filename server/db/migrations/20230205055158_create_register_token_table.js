exports.up = (knex) => knex.schema
    .createTable('register_token', (table) => {
        table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
        table.text('token').notNullable();
        table.boolean('token_used').defaultTo(false);
        // relations
        table.bigInteger("user_id").notNullable();

        // timestamps
        table.timestamp('created_at', true);
        table.timestamp('updated_at', true);
        table.timestamp('deleted_at', true);
    });

exports.down = (knex) => knex.schema.dropTable('register_token');
