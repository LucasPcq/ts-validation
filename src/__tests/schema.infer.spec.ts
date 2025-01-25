import { describe, it } from "vitest";
import { Equal, Expect } from "./utils";

import { TSV } from "../types";

/**
 * Type Testing - Infer Schema
 */

describe("Infer Schema", () => {
  describe("String", () => {
    it("Should be a string when infer schema string", () => {
      const stringSchema = TSV.string();
      type StringSchemaInfer = TSV.Infer<typeof stringSchema>;
      type ResultStringSchemaInfer = Expect<Equal<StringSchemaInfer, string>>;
    });
  });
  describe("Number", () => {
    it("Should be a number when infer schema number", () => {
      const numberSchema = TSV.number();
      type NumberSchemaInfer = TSV.Infer<typeof numberSchema>;
      type ResultNumberSchemaInfer = Expect<Equal<NumberSchemaInfer, number>>;
    });
  });
  describe("Boolean", () => {
    it("Should be a boolean when infer schema boolean", () => {
      const booleanSchema = TSV.boolean();
      type BooleanSchemaInfer = TSV.Infer<typeof booleanSchema>;
      type ResultBooleanSchemaInfer = Expect<
        Equal<BooleanSchemaInfer, boolean>
      >;
    });
  });
  describe("Array", () => {
    it("Should be a string[] when infer schema array string", () => {
      const arrayStringSchema = TSV.array(TSV.string());
      type ArrayStringSchemaInfer = TSV.Infer<typeof arrayStringSchema>;
      type ResultArrayStringSchemaInfer = Expect<
        Equal<ArrayStringSchemaInfer, string[]>
      >;
    });
    it("Should be a number[] when infer schema array number", () => {
      const arrayNumberSchema = TSV.array(TSV.number());
      type ArrayNumberSchemaInfer = TSV.Infer<typeof arrayNumberSchema>;
      type ResultArrayNumberSchemaInfer = Expect<
        Equal<ArrayNumberSchemaInfer, number[]>
      >;
    });
    it("Should be a boolean[] when infer schema array boolean", () => {
      const arrayBooleanSchema = TSV.array(TSV.boolean());
      type ArrayBooleanSchemaInfer = TSV.Infer<typeof arrayBooleanSchema>;
      type ResultArrayBooleanSchemaInfer = Expect<
        Equal<ArrayBooleanSchemaInfer, boolean[]>
      >;
    });
    it("Should be a object[] when infer schema array construct", () => {
      const arrayConstructSchema = TSV.array(TSV.construct({}));
      type ArrayConstructSchemaInfer = TSV.Infer<typeof arrayConstructSchema>;
      type ResultArrayConstructSchemaInfer = Expect<
        Equal<ArrayConstructSchemaInfer, {}[]>
      >;
    });
  });
  describe("Optional", () => {
    it("Should be a string | undefined when infer schema optional string", () => {
      const optionalStringSchema = TSV.optional(TSV.string());
      type OptionalStringSchemaInfer = TSV.Infer<typeof optionalStringSchema>;
      type ResultOptionalStringSchemaInfer = Expect<
        Equal<OptionalStringSchemaInfer, string | undefined>
      >;
    });
    it("Should be a number | undefined when infer schema optional number", () => {
      const optionalNumberSchema = TSV.optional(TSV.number());
      type OptionalNumberSchemaInfer = TSV.Infer<typeof optionalNumberSchema>;
      type ResultOptionalNumberSchemaInfer = Expect<
        Equal<OptionalNumberSchemaInfer, number | undefined>
      >;
    });
    it("Should be a boolean | undefined when infer schema optional boolean", () => {
      const optionalBooleanSchema = TSV.optional(TSV.boolean());
      type OptionalBooleanSchemaInfer = TSV.Infer<typeof optionalBooleanSchema>;
      type ResultOptionalBooleanSchemaInfer = Expect<
        Equal<OptionalBooleanSchemaInfer, boolean | undefined>
      >;
    });
    it("Should be a {} | undefined when infer schema optional construct", () => {
      const optionalConstructSchema = TSV.optional(TSV.construct({}));
      type OptionalConstructSchemaInfer = TSV.Infer<
        typeof optionalConstructSchema
      >;
      type ResultOptionalConstructSchemaInfer = Expect<
        Equal<OptionalConstructSchemaInfer, {} | undefined>
      >;
    });
  });
  describe("Nullable", () => {
    it("Should be a string | null when infer schema nullable string", () => {
      const nullableStringSchema = TSV.nullable(TSV.string());
      type NullableStringSchemaInfer = TSV.Infer<typeof nullableStringSchema>;
      type ResultNullableStringSchemaInfer = Expect<
        Equal<NullableStringSchemaInfer, string | null>
      >;
    });
    it("Should be a number | null when infer schema nullable number", () => {
      const nullableNumberSchema = TSV.nullable(TSV.number());
      type NullableNumberSchemaInfer = TSV.Infer<typeof nullableNumberSchema>;
      type ResultNullableNumberSchemaInfer = Expect<
        Equal<NullableNumberSchemaInfer, number | null>
      >;
    });
    it("Should be a boolean | null when infer schema nullable boolean", () => {
      const nullableBooleanSchema = TSV.nullable(TSV.boolean());
      type NullableBooleanSchemaInfer = TSV.Infer<typeof nullableBooleanSchema>;
      type ResultNullableBooleanSchemaInfer = Expect<
        Equal<NullableBooleanSchemaInfer, boolean | null>
      >;
    });
    it("Should be a {} | null when infer schema nullable construct", () => {
      const nullableConstructSchema = TSV.nullable(TSV.construct({}));
      type NullableConstructSchemaInfer = TSV.Infer<
        typeof nullableConstructSchema
      >;
      type ResultNullableConstructSchemaInfer = Expect<
        Equal<NullableConstructSchemaInfer, {} | null>
      >;
    });
  });
  describe("Construct", () => {
    it("Should be a {} when infer schema construct", () => {
      const constructSchema = TSV.construct({});
      type ConstructSchemaInfer = TSV.Infer<typeof constructSchema>;
      type ResultConstructSchemaInfer = Expect<Equal<ConstructSchemaInfer, {}>>;
    });
    it("Should be an object with properties when infer schema construct", () => {
      const constructSchema = TSV.construct({
        name: TSV.string(),
      });
      type ConstructSchemaInfer = TSV.Infer<typeof constructSchema>;
      type ResultConstructSchemaInfer = Expect<
        Equal<ConstructSchemaInfer, { name: string }>
      >;
    });
    it("Should be an object with properties sub object when infer schema construct", () => {
      const constructSchema = TSV.construct({
        name: TSV.string(),
        address: TSV.construct({
          city: TSV.string(),
          country: TSV.string(),
        }),
      });
      type ConstructSchemaInfer = TSV.Infer<typeof constructSchema>;
      type ResultConstructSchemaInfer = Expect<
        Equal<
          ConstructSchemaInfer,
          { name: string; address: { city: string; country: string } }
        >
      >;
    });
    it("Should be a optional key when infer schema construct with property optional", () => {
      const constructSchema = TSV.construct({
        name: TSV.string().optional(),
      });
      type ConstructSchemaInfer = TSV.Infer<typeof constructSchema>;
      type ResultOptionalConstructSchemaInfer = Expect<
        Equal<ConstructSchemaInfer, { name?: string }>
      >;
    });
  });
});
