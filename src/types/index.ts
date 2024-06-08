export namespace TSV {
  export type TypeObject = "object";
  export type TypeString = "string";
  export type TypeNumber = "number";

  export type Type = TypeObject | TypeString | TypeNumber;

  export type Schema<T extends Type> = T extends TypeObject
    ? {
        _type: T;
        children: Record<string, Schema<Type>>;
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
      ? S extends Schema<TypeObject>
        ? { [K in keyof S["children"]]: Infer<S["children"][K]> }
        : never
      : never
    : never;

  export const String = (): Schema<TypeString> => {
    return {
      _type: "string",
    };
  };

  export const Number = (): Schema<TypeNumber> => {
    return {
      _type: "number",
    };
  };

  export const Object = <S extends Schema<TypeObject>>(
    children: S["children"]
  ): Schema<TypeObject> => {
    return {
      _type: "object",
      children,
    };
  };

  export type KeysChildren<S extends Schema<TypeObject>> = {
    [K in keyof S["children"]]: string;
  };
}

const user = TSV.Object({
  id: TSV.Number(),
  name: TSV.String(),
});

type UserType = typeof user;
