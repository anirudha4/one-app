module.exports.up = (knex) =>
    knex.schema.alterTable('user_account', (table) => {
        /* Columns */
        table.text('name', true).nullable().alter()
    });

module.exports.down = (knex) =>
    knex.schema.table('user_account', (table) => {
        table.dropColumn('name');
    });
