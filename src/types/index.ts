import { TSValidationError } from "../error/error";

import { PrettifyObject } from "../utils";

export namespace TSV {
  /**
   * Types
   */

  export type TypeString = "string";
  export type TypeNumber = "number";
  export type TypeBoolean = "boolean";
  export type TypeObject = "object";

  export type TypeOptional = "optional";
  export type TypeNullable = "nullable";

  export type TypeArray = "array";

  export type Type =
    | TypeString
    | TypeNumber
    | TypeBoolean
    | TypeObject
    | TypeArray
    | TypeOptional
    | TypeNullable;

  /**
   * Base
   */

  export type BaseSchema<T extends Type> = {
    _type: T;
  };

  /**
   * Nullable
   */

  export type NullableSchema<
    S extends PrimitiveSchema<Type, C>,
    C extends ChildrenObjectSchema = {},
  > = BaseSchema<TypeNullable> & {
    child: S;
    parse: (data: unknown) => Infer<S> | null;
  };

  export type NullableMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {},
  > = () => NullableSchema<PrimitiveSchema<T, C>>;

  /**
   * Optional
   */

  export type OptionalSchema<
    S extends PrimitiveSchema<Type, C>,
    C extends ChildrenObjectSchema = {},
  > = BaseSchema<TypeOptional> & {
    child: S;
    parse: (data: unknown) => Infer<S> | undefined;
  };

  export type OptionalMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {},
  > = () => OptionalSchema<PrimitiveSchema<T, C>>;

  /**
   * Array
   */

  export type ArraySchema<
    S extends PrimitiveSchema<Type, C>,
    C extends ChildrenObjectSchema = {},
  > = BaseSchema<TypeArray> & {
    child: S;
    parse: (data: unknown) => Array<Infer<S>>;
  };

  export type ArrayMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {},
  > = () => ArraySchema<PrimitiveSchema<T, C>>;

  /**
   * String
   */

  export type StringSchema = BaseSchema<TypeString> & {
    optional: OptionalMethod<TypeString>;
    nullable: NullableMethod<TypeString>;
    array: ArrayMethod<TypeString>;
    parse: (data: unknown) => Infer<PrimitiveSchema<TypeString>>;
  };

  /**
   * Number
   */

  export type NumberSchema = BaseSchema<TypeNumber> & {
    optional: OptionalMethod<TypeNumber>;
    nullable: NullableMethod<TypeNumber>;
    array: ArrayMethod<TypeNumber>;
    parse: (data: unknown) => Infer<PrimitiveSchema<TypeNumber>>;
  };

  /**
   * Boolean
   */

  export type BooleanSchema = BaseSchema<TypeBoolean> & {
    optional: OptionalMethod<TypeBoolean>;
    nullable: NullableMethod<TypeBoolean>;
    array: ArrayMethod<TypeBoolean>;
    parse: (data: unknown) => Infer<PrimitiveSchema<TypeBoolean>>;
  };

  /**
   * Object
   */

  export type ChildrenObjectSchema = Record<
    string,
    | PrimitiveSchema<Type>
    | OptionalSchema<PrimitiveSchema<Type>>
    | NullableSchema<PrimitiveSchema<Type>>
    | ArraySchema<PrimitiveSchema<Type>>
  >;

  export type ObjectSchema<C extends ChildrenObjectSchema> =
    BaseSchema<TypeObject> & {
      children: C;
      optional: OptionalMethod<TypeObject, C>;
      nullable: NullableMethod<TypeObject, C>;
      array: ArrayMethod<TypeObject, C>;
      parse: (data: unknown) => {};
    };

  /**
   * Schema
   */

  export type PrimitiveSchema<
    T extends Type,
    C extends ChildrenObjectSchema = {},
  > = T extends TypeString
    ? StringSchema
    : T extends TypeNumber
      ? NumberSchema
      : T extends TypeBoolean
        ? BooleanSchema
        : T extends TypeObject
          ? ObjectSchema<C>
          : never;

  /**
   *  Nullable Function
   */

  export const nullable = <S extends PrimitiveSchema<Type>>(
    schema: S,
  ): NullableSchema<S> => {
    return {
      _type: "nullable",
      child: schema,
      parse: (data) => {
        if (data !== null) {
          throw new TSValidationError([]);
        }

        return data;
      },
    };
  };

  /**
   * Optional Function
   */

  export const optional = <S extends PrimitiveSchema<Type>>(
    schema: S,
  ): OptionalSchema<S> => {
    return {
      _type: "optional",
      child: schema,
      parse: (data) => {
        if (data !== undefined) {
          throw new TSValidationError([]);
        }

        return data;
      },
    };
  };

  /**
   * Array Function
   */

  export const array = <S extends PrimitiveSchema<Type>>(
    schema: S,
  ): ArraySchema<S> => {
    return {
      _type: "array",
      child: schema,
      parse: (data) => {
        if (!Array.isArray(data)) {
          throw new TSValidationError([]);
        }

        return data;
      },
    };
  };

  /**
   * String Function
   */

  export const string = (): StringSchema => {
    return {
      _type: "string",
      optional: () => optional(string()),
      nullable: () => nullable(string()),
      array: () => array(string()),
      parse: (data) => {
        if (typeof data !== "string") {
          throw new TSValidationError([
            {
              code: "invalid_type",
              expected: "string",
              received: typeof data,
            },
          ]);
        }

        return data;
      },
    };
  };

  /**
   * Number Function
   */

  export const number = (): NumberSchema => {
    return {
      _type: "number",
      optional: () => optional(number()),
      nullable: () => nullable(number()),
      array: () => array(number()),
      parse: (data) => {
        if (typeof data !== "number") {
          throw new TSValidationError([
            {
              code: "invalid_type",
              expected: "number",
              received: typeof data,
            },
          ]);
        }

        return data;
      },
    };
  };

  /**
   * Boolean Function
   */

  export const boolean = (): BooleanSchema => {
    return {
      _type: "boolean",
      optional: () => optional(boolean()),
      nullable: () => nullable(boolean()),
      array: () => array(boolean()),
      parse: (data) => {
        if (typeof data !== "boolean") {
          throw new TSValidationError([
            {
              code: "invalid_type",
              expected: "boolean",
              received: typeof data,
            },
          ]);
        }

        return data;
      },
    };
  };

  /**
   * Object Function
   */

  export const construct = <C extends ChildrenObjectSchema>(
    children: C,
  ): PrimitiveSchema<TypeObject, C> => {
    return {
      _type: "object",
      children,
      optional: () => optional(construct(children)),
      nullable: () => nullable(construct(children)),
      array: () => array(construct(children)),
    };
  };

  /**
   * Infer Type
   */

  export type Infer<
    S extends
      | PrimitiveSchema<Type>
      | OptionalSchema<PrimitiveSchema<Type>>
      | NullableSchema<PrimitiveSchema<Type>>
      | ArraySchema<PrimitiveSchema<Type>>,
  > = PrettifyObject<
    S extends PrimitiveSchema<Type>
      ? PrimitiveInfer<S>
      : S extends ArraySchema<infer SC>
        ? Array<PrimitiveInfer<SC>>
        : S extends NullableSchema<infer SC>
          ? PrimitiveInfer<SC> | null
          : S extends OptionalSchema<infer SC>
            ? PrimitiveInfer<SC> | undefined
            : never
  >;

  type PrimitiveInfer<S extends PrimitiveSchema<Type>> = S extends StringSchema
    ? string
    : S extends NumberSchema
      ? number
      : S extends BooleanSchema
        ? boolean
        : S extends ObjectSchema<infer C>
          ? {
              [K in keyof C as C[K] extends OptionalSchema<infer T>
                ? never
                : K]: Infer<C[K]>;
            } & {
              [K in keyof C as C[K] extends OptionalSchema<infer T>
                ? K
                : never]?: Infer<C[K]>;
            }
          : never;
}
