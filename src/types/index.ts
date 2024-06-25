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

  export type Type =
    | TypeString
    | TypeNumber
    | TypeBoolean
    | TypeObject
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
    C extends ChildrenObjectSchema = {}
  > = BaseSchema<TypeNullable> & {
    child: S;
  };

  export type NullableMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {}
  > = () => NullableSchema<PrimitiveSchema<T, C>>;

  /**
   * Optional
   */

  export type OptionalSchema<
    S extends PrimitiveSchema<Type, C>,
    C extends ChildrenObjectSchema = {}
  > = BaseSchema<TypeOptional> & {
    child: S;
  };

  export type OptionalMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {}
  > = () => OptionalSchema<PrimitiveSchema<T, C>>;

  /**
   * String
   */

  export type StringSchema = BaseSchema<TypeString> & {
    Optional: OptionalMethod<TypeString>;
    Nullable: NullableMethod<TypeString>;
  };

  /**
   * Number
   */

  export type NumberSchema = BaseSchema<TypeNumber> & {
    Optional: OptionalMethod<TypeNumber>;
    Nullable: NullableMethod<TypeNumber>;
  };

  /**
   * Boolean
   */

  export type BooleanSchema = BaseSchema<TypeBoolean> & {
    Optional: OptionalMethod<TypeBoolean>;
    Nullable: NullableMethod<TypeBoolean>;
  };

  /**
   * Object
   */

  export type ChildrenObjectSchema = Record<
    string,
    | PrimitiveSchema<Type>
    | OptionalSchema<PrimitiveSchema<Type>>
    | NullableSchema<PrimitiveSchema<Type>>
  >;

  export type ObjectSchema<C extends ChildrenObjectSchema> =
    BaseSchema<TypeObject> & {
      Optional: OptionalMethod<TypeObject, C>;
      Nullable: NullableMethod<TypeObject, C>;
      children: C;
    };

  /**
   * Schema
   */

  export type PrimitiveSchema<
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
   *  Nullable Function
   */

  export const Nullable = <S extends PrimitiveSchema<Type>>(
    schema: S
  ): NullableSchema<S> => {
    return {
      _type: "nullable",
      child: schema,
    };
  };

  /**
   * Optional Function
   */

  export const Optional = <S extends PrimitiveSchema<Type>>(
    schema: S
  ): OptionalSchema<S> => {
    return {
      _type: "optional",
      child: schema,
    };
  };

  /**
   * String Function
   */

  export const String = (): StringSchema => {
    return {
      _type: "string",
      Optional: () => Optional(String()),
      Nullable: () => Nullable(String()),
    };
  };

  /**
   * Number Function
   */

  export const Number = (): NumberSchema => {
    return {
      _type: "number",
      Optional: () => Optional(Number()),
      Nullable: () => Nullable(Number()),
    };
  };

  /**
   * Boolean Function
   */

  export const Boolean = (): BooleanSchema => {
    return {
      _type: "boolean",
      Optional: () => Optional(Boolean()),
      Nullable: () => Nullable(Boolean()),
    };
  };

  /**
   * Object Function
   */

  export const Construct = <C extends ChildrenObjectSchema>(
    children: C
  ): PrimitiveSchema<TypeObject, C> => {
    return {
      _type: "object",
      children,
      Optional: () => Optional(Construct(children)),
      Nullable: () => Nullable(Construct(children)),
    };
  };

  /**
   * Infer Type
   */

  export type InferValue<S extends PrimitiveSchema<Type>> =
    S extends StringSchema
      ? string
      : S extends NumberSchema
      ? number
      : S extends BooleanSchema
      ? boolean
      : never;

  export type Infer<
    S extends
      | PrimitiveSchema<Type>
      | OptionalSchema<PrimitiveSchema<Type>>
      | NullableSchema<PrimitiveSchema<Type>>
  > = PrettifyInferObject<BaseInfer<S>>;

  export type PrettifyInferObject<O> = {
    [K in keyof O]: O[K];
  } & {};

  export type BaseInfer<
    S extends
      | PrimitiveSchema<Type>
      | OptionalSchema<PrimitiveSchema<Type>>
      | NullableSchema<PrimitiveSchema<Type>>
  > = S extends StringSchema
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
    : S extends NullableSchema<infer SC>
    ? SC extends StringSchema
      ? string | null
      : SC extends NumberSchema
      ? number | null
      : SC extends BooleanSchema
      ? boolean | null
      : SC extends ObjectSchema<infer C>
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
        > | null
      : S extends OptionalSchema<infer SC>
      ? SC extends StringSchema
        ? string | undefined
        : SC extends NumberSchema
        ? number | undefined
        : SC extends BooleanSchema
        ? boolean | undefined
        : SC extends ObjectSchema<infer C>
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
      : never
    : never;
}

const nullableStringSchema = TSV.Nullable(
  TSV.Construct({
    name: TSV.String(),
    age: TSV.Nullable(TSV.Number()),
  })
);

type StringNullable = TSV.Infer<typeof nullableStringSchema>;
