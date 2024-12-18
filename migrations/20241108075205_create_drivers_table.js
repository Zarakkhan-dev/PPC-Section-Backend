/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("drivers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("license").notNullable();
    table.string("identity_card");
    table.string("phone_number");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("drivers");
};
