import { describe, expect, it } from "vitest";

import { TSV } from "../types";

describe("Schema", () => {
  describe("String", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a string", () => {
        const stringSchema = TSV.string();
        expect(() => stringSchema.parse(12)).toThrow();
      });
      it("Should return the string when the variable is a string", () => {
        const stringSchema = TSV.string();
        expect(stringSchema.parse("12")).toBeTypeOf("string");
        expect(stringSchema.parse("12")).toBe("12");
      });
    });
  });
  describe("Number", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a number", () => {
        const numberSchema = TSV.number();
        expect(() => numberSchema.parse("12")).toThrow();
      });
      it("Should return the number when the variable is a number", () => {
        const numberSchema = TSV.number();
        expect(numberSchema.parse(12)).toBeTypeOf("number");
        expect(numberSchema.parse(12)).toBe(12);
      });
    });
  });
  describe("Boolean", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt a boolean", () => {
        const booleanSchema = TSV.boolean();
        expect(() => booleanSchema.parse("true")).toThrow();
      });
      it("Should return the boolean when the variable is a boolean", () => {
        const booleanSchema = TSV.boolean();
        expect(booleanSchema.parse(true)).toBeTypeOf("boolean");
        expect(booleanSchema.parse(true)).toBe(true);
      });
    });
  });
  describe("Construct", () => {
    describe("Parse Method", () => {
      it("Should throw an error when the variable isnt an object", () => {
        const constructSchema = TSV.construct({
          name: TSV.string(),
          postalCode: TSV.number(),
          adress: TSV.construct({
            city: TSV.string(),
          }),
        });

        expect(() =>
          constructSchema.parse({
            name: "12",
            postalCode: 12,
            adress: {
              city: 12,
            },
          }),
        ).toThrow();
      });
      it("Should return the object when the variable is an object of correct format", () => {
        const constructSchema = TSV.construct({
          name: TSV.string(),
          postalCode: TSV.number(),
        });

        expect(
          constructSchema.parse({ name: "12", postalCode: 12 }),
        ).toBeTypeOf("object");

        expect(
          constructSchema.parse({ name: "12", postalCode: 12 }),
        ).toStrictEqual({
          name: "12",
          postalCode: 12,
        });
      });
    });
  });
});
