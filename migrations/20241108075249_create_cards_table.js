/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("cards", (table) => {
    table.increments("card_id").primary();
    table.string("bank_name").notNullable();
    table.string("holder_name").notNullable();
    table.string("card_number").notNullable();
    table.decimal("card_charge", 10, 2);
    table.date("due_date");
    table.decimal("year_fee", 10, 2);
    table.enum("status", ["paid", "pending", "overdue"]).defaultTo("pending");
    table.decimal("paid_amount", 10, 2);
    table.decimal("extra_pay", 10, 2);
    table.decimal("less_pay", 10, 2);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists("cards");
};
