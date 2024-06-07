import { OmitStrict } from "./utils/index.js";

type TSVString = "string";
type TSVNumber = "number";
type TSVBoolean = "boolean";

type TSVTypes = TSVString | TSVNumber | TSVBoolean;

type TSVInternSchema<Type extends TSVTypes> = {
  type: Type;
  optional: boolean;
};

type TSVSchema<Type extends TSVTypes> = {
  optional: () => TSVOptional<Type>;
  isOptional: () => TSVInternSchema<Type>["optional"];
  getSchema: () => TSVInternSchema<Type>;
};

type TSVOptional<Type extends TSVTypes> = OmitStrict<
  TSVSchema<Type>,
  "optional"
>;

type InferTypeTSV<T extends TSVSchema<TSVTypes> | TSVOptional<TSVTypes>> =
  T extends TSVSchema<infer Type>
    ? Type extends TSVString
      ? string
      : Type extends TSVNumber
      ? number
      : Type extends TSVBoolean
      ? boolean
      : never
    : T extends TSVOptional<infer Type>
    ? Type extends TSVString
      ? string | undefined
      : Type extends TSVNumber
      ? number | undefined
      : Type extends TSVBoolean
      ? boolean | undefined
      : never
    : never;

const createDefaultInternSchema = <Type extends TSVTypes>(
  type: Type
): TSVInternSchema<Type> => {
  return {
    type,
    optional: false,
  };
};

const createBuilderSchema = <Type extends TSVTypes>(
  internSchema: TSVInternSchema<Type>
): TSVSchema<Type> => {
  const getters = {
    getSchema: () => internSchema,
    isOptional: () => internSchema.optional,
  };

  return {
    optional: () => {
      internSchema.optional = true;
      return {
        ...getters,
      };
    },
    ...getters,
  };
};

const string = (): TSVSchema<"string"> => {
  const schema = createDefaultInternSchema("string");

  return createBuilderSchema(schema);
};

const number = (): TSVSchema<"number"> => {
  const schema = createDefaultInternSchema("number");

  return createBuilderSchema(schema);
};

const boolean = (): TSVSchema<"boolean"> => {
  const schema = createDefaultInternSchema("boolean");

  return createBuilderSchema(schema);
};

const name = string();
const age = number();
const isAdult = boolean().optional();

type Name = InferTypeTSV<typeof name>;
type Age = InferTypeTSV<typeof age>;
type IsAdult = InferTypeTSV<typeof isAdult>;
