export namespace TSV {
  export type TypeObject = "object";
  export type TypeString = "string";
  export type TypeNumber = "number";

  export type Type = TypeObject | TypeString | TypeNumber;

  export type Schema<
    T extends Type,
    C extends Record<string, Schema<Type>> = {}
  > = T extends TypeObject
    ? {
        _type: T;
        children: C;
      }
    : {
        _type: T;
      };

  export type Infer<S extends Schema<Type>> = S extends Schema<infer T>
    ? T extends TypeString
      ? string
      : T extends TypeNumber
      ? number
      : T extends TypeObject
      ? S extends Schema<TypeObject, infer Children>
        ? {
            [K in keyof Children & string]: Infer<Children[K]>;
          }
        : never
      : never
    : never;

  export const String: Schema<TypeString> = {
    _type: "string",
  };

  export const Number: Schema<TypeNumber> = {
    _type: "number",
  };

  export const Construct = <S extends Record<string, Schema<Type>>>(
    children: S
  ): Schema<TypeObject, S> => ({
    _type: "object",
    children,
  });
}

const user = TSV.Construct({
  id: TSV.Number,
  name: TSV.String,
  location: TSV.Construct({
    address_1: TSV.String,
  }),
});

type User = TSV.Infer<typeof user>;
