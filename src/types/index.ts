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
  };

  export type ArrayMethod<
    T extends Type,
    C extends ChildrenObjectSchema = {},
  > = () => ArraySchema<PrimitiveSchema<T, C>>;

  /**
   * String
   */

  export type StringSchema = BaseSchema<TypeString> & {
    Optional: OptionalMethod<TypeString>;
    Nullable: NullableMethod<TypeString>;
    Array: ArrayMethod<TypeString>;
  };

  /**
   * Number
   */

  export type NumberSchema = BaseSchema<TypeNumber> & {
    Optional: OptionalMethod<TypeNumber>;
    Nullable: NullableMethod<TypeNumber>;
    Array: ArrayMethod<TypeNumber>;
  };

  /**
   * Boolean
   */

  export type BooleanSchema = BaseSchema<TypeBoolean> & {
    Optional: OptionalMethod<TypeBoolean>;
    Nullable: NullableMethod<TypeBoolean>;
    Array: ArrayMethod<TypeBoolean>;
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
      Optional: OptionalMethod<TypeObject, C>;
      Nullable: NullableMethod<TypeObject, C>;
      Array: ArrayMethod<TypeObject, C>;
      children: C;
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

  export const Nullable = <S extends PrimitiveSchema<Type>>(
    schema: S,
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
    schema: S,
  ): OptionalSchema<S> => {
    return {
      _type: "optional",
      child: schema,
    };
  };

  /**
   * Array Function
   */

  export const Array = <S extends PrimitiveSchema<Type>>(
    schema: S,
  ): ArraySchema<S> => {
    return {
      _type: "array",
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
      Array: () => Array(String()),
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
      Array: () => Array(Number()),
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
      Array: () => Array(Boolean()),
    };
  };

  /**
   * Object Function
   */

  export const Construct = <C extends ChildrenObjectSchema>(
    children: C,
  ): PrimitiveSchema<TypeObject, C> => {
    return {
      _type: "object",
      children,
      Optional: () => Optional(Construct(children)),
      Nullable: () => Nullable(Construct(children)),
      Array: () => Array(Construct(children)),
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
  > = PrettifyInferObject<BaseInfer<S>>;

  export type PrettifyInferObject<O> = {
    [K in keyof O]: O[K];
  } & {};

  type PrimitiveInfer<S extends PrimitiveSchema<Type>> = S extends StringSchema
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
          : never;

  export type BaseInfer<
    S extends
      | PrimitiveSchema<Type>
      | OptionalSchema<PrimitiveSchema<Type>>
      | NullableSchema<PrimitiveSchema<Type>>
      | ArraySchema<PrimitiveSchema<Type>>,
  > =
    S extends PrimitiveSchema<Type>
      ? PrimitiveInfer<S>
      : S extends ArraySchema<infer SC>
        ? Array<PrimitiveInfer<SC>>
        : S extends NullableSchema<infer SC>
          ? PrimitiveInfer<SC> | null
          : S extends OptionalSchema<infer SC>
            ? PrimitiveInfer<SC> | undefined
            : never;
}
