/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("bookings", (table) => {
    table.increments("id").primary();
    table
      .integer("id")
      .unsigned()
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE");
    table.string("username").notNullable();
    table.string("company_name").notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.decimal("price_per_day", 10, 2).notNullable();
    table.decimal("price_per_month", 10, 2);
    table.string("agreement");
    table.jsonb("car_pictures");
    table.boolean("with_driver").defaultTo(false);
    table
      .integer("driver_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("drivers")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("bookings");
};
