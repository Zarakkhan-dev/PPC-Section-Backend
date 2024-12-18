/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("fueling", (table) => {
    table.increments("id").primary();
    table
      .integer("booking_id")
      .unsigned()
      .references("id")
      .inTable("bookings")
      .onDelete("CASCADE");
    table.boolean("customer_paid").defaultTo(false);
    table.boolean("verified").defaultTo(false);
    table.decimal("total_amount_paid", 10, 2).defaultTo(0.0);
    table.decimal("remaining_amount_left", 10, 2).defaultTo(0.0);
    table.boolean("bill_paid").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("fueling");
};
