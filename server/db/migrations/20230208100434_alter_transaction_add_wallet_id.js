module.exports.up = (knex) =>
    knex.schema.alterTable('transaction', (table) => {
        /* Columns */
        table.bigint('wallet_id', true);
    });

module.exports.down = (knex) =>
    knex.schema.table('transaction', (table) => {
        table.dropColumn('wallet_id');
    });
