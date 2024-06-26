import { TSV } from "./types/index";

/**
 * Définition du schéma de l'utilisateur
 */

const demoUserSchema = TSV.Construct({
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
