export namespace TSV {
  /**
   * Types
   */

  export type TypeString = "string";
  export type TypeNumber = "number";
  export type TypeBoolean = "boolean";
  export type TypeObject = "object";

  export type TypeOptional = "optional";

  export type Type =
    | TypeString
    | TypeNumber
    | TypeBoolean
    | TypeObject
    | TypeOptional;

  /**
   * Base
   */

  export type BaseSchema<T extends Type> = {
    _type: T;
  };

  /**
   * Optional
   */

  export type OptionalSchema<
    T extends Type,
    C extends ChildrenObjectSchema = {}
  > = BaseSchema<TypeOptional> & {
    child: Omit<Schema<T, C>, "Optional">;
  };

  export type OptionalMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {}
  > = () => OptionalSchema<T, C>;

  /**
   * String
   */

  export type StringSchema = BaseSchema<TypeString> & {
    Optional: OptionalMethod<TypeString>;
  };

  /**
   * Number
   */

  export type NumberSchema = BaseSchema<TypeNumber> & {
    Optional: OptionalMethod<TypeNumber>;
  };

  /**
   * Boolean
   */

  export type BooleanSchema = BaseSchema<TypeBoolean> & {
    Optional: OptionalMethod<TypeBoolean>;
  };

  /**
   * Object
   */

  export type ChildrenObjectSchema = Record<
    string,
    Schema<Type> | OptionalSchema<Type>
  >;

  export type ObjectSchema<C extends ChildrenObjectSchema> =
    BaseSchema<TypeObject> & {
      Optional: OptionalMethod<TypeObject, C>;
      children: C;
    };

  /**
   * Schema
   */

  export type Schema<
    T extends Type,
    C extends ChildrenObjectSchema = {}
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
   * String Function
   */

  export const String = (): Schema<TypeString> => {
    return {
      _type: "string",
      Optional: () => {
        return {
          _type: "optional",
          child: {
            _type: "string",
          },
        };
      },
    };
  };

  /**
   * Number Function
   */

  export const Number = (): Schema<TypeNumber> => {
    return {
      _type: "number",
      Optional: () => {
        return {
          _type: "optional",
          child: {
            _type: "number",
          },
        };
      },
    };
  };

  /**
   * Boolean Function
   */

  export const Boolean = (): Schema<TypeBoolean> => {
    return {
      _type: "boolean",
      Optional: () => {
        return {
          _type: "optional",
          child: {
            _type: "boolean",
          },
        };
      },
    };
  };

  /**
   * Object Function
   */

  export const Construct = <C extends ChildrenObjectSchema>(
    children: C
  ): Schema<TypeObject, C> => {
    return {
      _type: "object",
      children,
      Optional: () => {
        return {
          _type: "optional",
          child: {
            _type: "object",
            children,
          },
        };
      },
    };
  };

  /**
   * Infer Type
   */

  export type InferValue<S extends Schema<Type>> = S extends StringSchema
    ? string
    : S extends NumberSchema
    ? number
    : S extends BooleanSchema
    ? boolean
    : never;

  export type Infer<S extends Schema<Type> | OptionalSchema<Type>> =
    PrettifyInferObject<BaseInfer<S>>;

  export type PrettifyInferObject<O> = {
    [K in keyof O]: O[K];
  } & {};

  export type BaseInfer<S extends Schema<Type> | OptionalSchema<Type>> =
    S extends StringSchema
      ? string
      : S extends NumberSchema
      ? number
      : S extends BooleanSchema
      ? boolean
      : S extends ObjectSchema<infer C>
      ? PrettifyInferObject<
          {
            [K in keyof C as C[K] extends OptionalSchema<infer T>
              ? never
              : K]: BaseInfer<C[K]>;
          } & {
            [K in keyof C as C[K] extends OptionalSchema<infer T>
              ? K
              : never]?: BaseInfer<C[K]>;
          }
        >
      : S extends OptionalSchema<infer T, infer C>
      ? T extends TypeString
        ? string | undefined
        : T extends TypeNumber
        ? number | undefined
        : T extends TypeBoolean
        ? boolean | undefined
        : T extends TypeObject
        ?
            | PrettifyInferObject<
                {
                  [K in keyof C as C[K] extends OptionalSchema<infer T>
                    ? never
                    : K]: BaseInfer<C[K]>;
                } & {
                  [K in keyof C as C[K] extends OptionalSchema<infer T>
                    ? K
                    : never]?: BaseInfer<C[K]>;
                }
              >
            | undefined
        : never
      : never;
}

const userSchema = TSV.Construct({
  id: TSV.Number(),
  first_name: TSV.String().Optional(),
  location: TSV.Construct({
    postal_code: TSV.Number().Optional(),
    road: TSV.String(),
    address_1: TSV.Construct({
      city: TSV.String().Optional(),
    }).Optional(),
  }).Optional(),
});

type User = TSV.Infer<typeof userSchema>;
