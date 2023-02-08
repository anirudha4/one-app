module.exports.up = (knex) =>
    knex.schema
        .createTable('wallet', (table) => {
            /* Columns */

            table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));

            // attributes
            table.text('name').notNullable();
            table.text('color').notNullable();
            table.float('amount').notNullable();

            // relations
            table.bigInteger('organization_id').notNullable();

            // timestamps
            table.timestamp('created_at', true);
            table.timestamp('updated_at', true);
            table.timestamp('deleted_at', true);
        });

module.exports.down = (knex) => knex.schema.dropTable('wallet');
