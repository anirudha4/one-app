module.exports.up = (knex) => {
    return knex.schema
        .createTable('organization', (table) => {
            /* Columns */

            table.bigInteger('id').primary().defaultTo(knex.raw('next_id()'));
            table.text('name').notNullable();
            table.boolean('is_parent_organization').notNullable();
            table.timestamp('created_at', true);
            table.timestamp('updated_at', true);
            table.timestamp('deleted_at', true);
        })
        .raw(
            'ALTER TABLE "organization" ADD CONSTRAINT "organization_name_unique" EXCLUDE ("name" WITH =) WHERE ("name" IS NOT NULL AND "deleted_at" IS NULL)',
        );
}

module.exports.down = (knex) => knex.schema.dropTable('organization');
