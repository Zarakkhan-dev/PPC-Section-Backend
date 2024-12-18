/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("maintenance", (table) => {
    table.increments("id").primary();
    table
      .integer("car_id")
      .unsigned()
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE");
    table.date("date").notNullable();
    table.string("chassis_no");
    table.string("engine");
    table.string("cell");
    table.string("type");
    table.string("labour");
    table.decimal("total_labour_cost", 10, 2).notNullable();
    table.decimal("total_parts_cost", 10, 2).notNullable();
    table.decimal("grand_total", 10, 2).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("maintenance");
};
