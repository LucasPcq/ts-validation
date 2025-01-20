import { TSV } from "./types/index";

/**
 * Définition du schéma de l'utilisateur
 */

const demoUserSchema = TSV.construct({
  ids: TSV.array(TSV.string()),
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
