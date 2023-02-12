exports.up = (knex) => knex.schema
    .createTable('splitwise_integration', (table) => {
        table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
        
        // attributes
        table.string('name').notNullable();
        table.text('client_id').notNullable();
        table.text('client_secret').notNullable();

        // relations
        table.bigInteger("user_id").notNullable();
        table.bigInteger("organization_id").notNullable();

        // timestamps
        table.timestamp('created_at', true);
        table.timestamp('updated_at', true);
        table.timestamp('deleted_at', true);
    });

exports.down = (knex) => knex.schema.dropTable('splitwise_integration');
