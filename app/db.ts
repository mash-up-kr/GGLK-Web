import Dexie, { type EntityTable } from "dexie";

interface Opportunity {
  id: string;
  count: number;
}

const db = new Dexie("GGLK_DB") as Dexie & {
  opportunity: EntityTable<Opportunity, "id">;
};

db.version(1).stores({
  opportunity: "++id, count",
});

export { db };
export type { Opportunity };
