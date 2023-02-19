exports.up = (knex) => knex.schema
    .createTable('splitwise_transaction', (table) => {
        table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));

        // attributes
        table.bigInteger('reference_id').notNullable();
        table.string('group_name');
        table.string('creation_method');
        table.jsonb('friends');
        table.jsonb('created_by');

        // relations
        table.bigInteger("transaction_id").notNullable();
        table.bigInteger("organization_id").notNullable();
        table.bigInteger("splitwise_integration_id").notNullable();

        // timestamps
        table.timestamp('created_at', true);
        table.timestamp('updated_at', true);
        table.timestamp('deleted_at', true);
    });

exports.down = (knex) => knex.schema.dropTable('splitwise_transaction');
