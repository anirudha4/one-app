module.exports.up = (knex) =>
    knex.schema.alterTable('user_account', (table) => {
        /* Columns */
        table.boolean('is_email_verified', true);
    });

module.exports.down = (knex) =>
    knex.schema.table('user_account', (table) => {
        table.dropColumn('is_email_verified');
    });
