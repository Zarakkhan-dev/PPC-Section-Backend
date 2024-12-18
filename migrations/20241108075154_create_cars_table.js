/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.string("variant");
    table.string("registration_no").notNullable().unique();
    table.jsonb("documents");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("cars");
};
