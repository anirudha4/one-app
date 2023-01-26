exports.up = function (knex) {
    return knex.schema.createTable("transaction", (table) => {
        table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));

        // attributes
        table.string("name").notNullable();
        table.string("type").notNullable();
        table.float("amount").notNullable();
        table.date("date").notNullable();
        table.text("description");
        table.boolean("is_recurring").notNullable();

        // relations
        table.bigInteger("organization_id").notNullable();
        table.bigInteger("category_id").notNullable();
        table.bigInteger("user_id").notNullable();

        // timestamps
        table.timestamp('created_at', true);
        table.timestamp('updated_at', true);
        table.timestamp('deleted_at', true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("transaction");
};

