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

const demoUserSchema = TSV.construct({
  ids: TSV.array(TSV.string())
  name: TSV.string(),
  age: TSV.nullable(TSV.number()),
  isSubscribed: TSV.optional(TSV.boolean()),
  address: TSV.construct({
    street: TSV.string(),
    city: TSV.string(),
    country: TSV.string(),
  }).optional(),
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
