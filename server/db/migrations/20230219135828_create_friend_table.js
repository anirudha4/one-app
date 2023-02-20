/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('friend', (table) => {
            // attibutes
            table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
            table.text('name').notNullable();
            table.text('color').notNullable();

            table.jsonb('source').nullable();
            table.bigInteger('reference_id').nullable();


            // relations
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
    return knex.schema.dropTable('friend')
};
