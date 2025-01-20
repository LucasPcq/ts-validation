type PrimitiveType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

export type TSVError = {
  code: "invalid_type";
  expected: PrimitiveType;
  received: PrimitiveType;
};

export class TSValidationError extends Error {
  errors: TSVError[];

  constructor(errors: TSVError[]) {
    super();
    this.errors = errors;
  }
}
