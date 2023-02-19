module.exports.up = (knex) =>
    knex.schema.alterTable('splitwise_integration', (table) => {
        /* Columns */
        table.jsonb('splitwise_user', {});
    });

module.exports.down = (knex) =>
    knex.schema.table('splitwise_integration', (table) => {
        table.dropColumn('splitwise_user');
    });
