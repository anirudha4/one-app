/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('category', (table) => {
            // attibutes
            table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
            table.text('name').notNullable();
            table.text('type').notNullable();
            // relations
            table.bigInteger('created_by').notNullable();
            table.bigInteger('organization_id').notNullable();
            // timestamps
            table.timestamp('created_at', true);
            table.timestamp('updated_at', true);
            table.timestamp('deleted_at', true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('category')
};
