export namespace TSV {
  export type TypeString = "string";
  export type TypeNumber = "number";
  export type TypeBoolean = "boolean";
  export type TypeObject = "object";

  export type Type = TypeString | TypeNumber | TypeBoolean | TypeObject;

  export type OptionalSchema<
    T extends Type,
    C extends Record<string, Schema<Type> | OptionalSchema<Type>> = {}
  > = T extends TypeObject
    ? {
        _type: T;
        isOptional: boolean;
        children: C;
      }
    : {
        _type: T;
        isOptional: boolean;
      };

  export type Schema<
    T extends Type,
    C extends Record<string, Schema<Type> | OptionalSchema<Type>> = {}
  > = T extends TypeObject
    ? {
        _type: T;
        isOptional: boolean;
        Optional: () => OptionalSchema<T, C>;
        children: C;
      }
    : {
        _type: T;
        isOptional: boolean;
        Optional: () => OptionalSchema<T, C>;
      };

  export type Infer<S extends Schema<Type> | OptionalSchema<Type>> =
    S extends Schema<infer T, infer C>
      ? T extends TypeString
        ? string
        : T extends TypeNumber
        ? number
        : T extends TypeBoolean
        ? boolean
        : T extends TypeObject
        ? {
            [K in keyof C]: Infer<C[K]>;
          }
        : never
      : S extends OptionalSchema<infer T, infer C>
      ? T extends TypeString
        ? string | undefined
        : T extends TypeNumber
        ? number | undefined
        : T extends TypeBoolean
        ? boolean | undefined
        : T extends TypeObject
        ?
            | {
                [K in keyof C]: Infer<C[K]>;
              }
            | undefined
        : never
      : never;

  export const String = (): Schema<TypeString> => {
    const defaultSchema: Pick<Schema<TypeString>, "_type" | "isOptional"> = {
      _type: "string",
      isOptional: false,
    };

    return {
      ...defaultSchema,
      Optional: () => {
        defaultSchema.isOptional = true;
        return {
          ...defaultSchema,
        };
      },
    };
  };

  export const Number = (): Schema<TypeNumber> => {
    const defaultSchema: Pick<Schema<TypeNumber>, "_type" | "isOptional"> = {
      _type: "number",
      isOptional: false,
    };

    return {
      ...defaultSchema,
      Optional: () => {
        defaultSchema.isOptional = true;
        return {
          ...defaultSchema,
        };
      },
    };
  };

  export const Boolean = (): Schema<TypeBoolean> => {
    const defaultSchema: Pick<Schema<TypeBoolean>, "_type" | "isOptional"> = {
      _type: "boolean",
      isOptional: false,
    };

    return {
      ...defaultSchema,
      Optional: () => {
        defaultSchema.isOptional = true;
        return {
          ...defaultSchema,
        };
      },
    };
  };

  export const Construct = <
    S extends Record<string, Schema<Type> | OptionalSchema<Type>>
  >(
    children: S
  ): Schema<TypeObject, S> => {
    return {
      _type: "object",
      isOptional: false,
      children: children,
      Optional: () => {
        return {
          _type: "object",
          isOptional: true,
          children,
        };
      },
    };
  };
}

const user = TSV.Construct({
  id: TSV.Number(),
  first_name: TSV.String().Optional(),
  last_name: TSV.String(),
  confirmed: TSV.Boolean().Optional(),
  location: TSV.Construct({
    address_1: TSV.Construct({
      number: TSV.Number(),
      road: TSV.String(),
      city: TSV.String(),
      postal_code: TSV.Number(),
    }).Optional(),
    address_2: TSV.String(),
  }),
});

type User = TSV.Infer<typeof user>;

const user2: User = {
  id: 1,
  last_name: "PICQUE",
  confirmed: undefined,
  location: {
    address_1: undefined,
    address_2: "test",
  },
};
