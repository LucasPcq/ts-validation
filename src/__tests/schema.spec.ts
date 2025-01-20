import { describe, expect, it, test } from "vitest";

import { TSV } from "../types";

describe("Schema", () => {
  describe("String", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a string", () => {
        const stringSchema = TSV.String();
        expect(() => stringSchema.parse(12)).toThrow();
      });
      it("Should return the string when the variable is a string", () => {
        const stringSchema = TSV.String();
        expect(stringSchema.parse("12")).toBeTypeOf("string");
        expect(stringSchema.parse("12")).toBe("12");
      });
    });
  });
  describe("Number", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a number", () => {
        const numberSchema = TSV.Number();
        expect(() => numberSchema.parse("12")).toThrow();
      });
      it("Should return the number when the variable is a number", () => {
        const numberSchema = TSV.Number();
        expect(numberSchema.parse(12)).toBeTypeOf("number");
        expect(numberSchema.parse(12)).toBe(12);
      });
    });
  });
  describe("Boolean", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a boolean", () => {
        const booleanSchema = TSV.Boolean();
        expect(() => booleanSchema.parse("true")).toThrow();
      });
      it("Should return the boolean when the variable is a boolean", () => {
        const booleanSchema = TSV.Boolean();
        expect(booleanSchema.parse(true)).toBeTypeOf("boolean");
        expect(booleanSchema.parse(true)).toBe(true);
      });
    });
  });
});
