import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";
import { db } from "~/db";

const loadVisitorId = async () => {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
};

export const useOpportunity = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const visitorId = await loadVisitorId();
      setVisitorId(visitorId);
    })();
  }, []);

  const opportunity = useLiveQuery(() => {
    if (!visitorId) return;
    return db.opportunity.where("id").equals(visitorId).first();
  }, [visitorId]);

  const decreaseOpportunityCount = useCallback(() => {
    if (!visitorId) return;

    db.opportunity
      .where("id")
      .equals(visitorId)
      .modify((opportunity) => {
        opportunity.count--;
      });
  }, [visitorId]);

  useEffect(() => {
    if (!visitorId) return;

    if (!opportunity) {
      db.opportunity.add({
        id: visitorId,
        count: 1,
      });
    }
  }, [visitorId, opportunity]);

  return { opportunity, decreaseOpportunityCount };
};
