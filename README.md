# TS Validation - Zod Clone

Building Zod from zero to improve my expertise in TypeScript

## Completed

- [x] String (w/ only Optional & Nullable)
- [x] Boolean (w/ only Optional & Nullable)
- [x] Number (w/ only Optional & Nullable)
- [x] Object (w/ Optional & Nullable)
- [x] Nullable
- [x] Optional
- [x] Infer (String, Boolean, Number, Object, Optional, Nullable, Arrray)
- [x] Array

## Todo
- [ ] Parse
- [ ] Min / Max / Length
- [ ] Combine Optional / Nullable / Array

### Example

```ts
/**
 * Définition du schéma de l'utilisateur
 */

const demoUserSchema = TSV.Construct({
  ids: TSV.Array(TSV.String())
  name: TSV.String(),
  age: TSV.Nullable(TSV.Number()),
  isSubscribed: TSV.Optional(TSV.Boolean()),
  address: TSV.Construct({
    street: TSV.String(),
    city: TSV.String(),
    country: TSV.String(),
  }).Optional(),
});

/**
 * Récupération du type de l'utilisateur depuis le schéma
 */

type DemoUser = TSV.Infer<typeof demoUserSchema>;

/**
 * Format du type infer depuis le schéma
 *
 * type DemoUser = {
 *  ids: string[]
 *  name: string;
 *  age: number | null;
 *  isSubscribed?: boolean | undefined;
 *  address?: {
 *   street: string;
 *   city: string;
 *   country: string;
 *  } | undefined;
 * }
 *
 */
```

### Inspired by

- [Zod](https://zod.dev/)
