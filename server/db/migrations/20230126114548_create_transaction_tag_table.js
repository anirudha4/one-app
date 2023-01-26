exports.up = function (knex) {
    return knex.schema.createTable("transaction_tag", (table) => {
        table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
        
        // relations
        table.bigInteger("transaction_id").notNullable();
        table.bigInteger("tag_id").notNullable();

        // timestamps
        table.timestamp('created_at', true);
        table.timestamp('updated_at', true);
        table.timestamp('deleted_at', true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("transaction_tag");
};
