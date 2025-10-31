import { useEffect } from "react";
import { db } from "@/lib/db";
import { queryClient } from "@/lib/queryClient";

export function useIndexedDBSync() {
  useEffect(() => {
    const syncFromIndexedDB = async () => {
      try {
        const jobs = await db.jobs.toArray();
        const candidates = await db.candidates.toArray();
        const assessments = await db.assessments.toArray();

        if (jobs.length > 0) {
          queryClient.setQueryData(["/api/jobs"], {
            jobs,
            total: jobs.length,
            page: 1,
            pageSize: 10,
          });
        }

        if (candidates.length > 0) {
          queryClient.setQueryData(["/api/candidates"], {
            candidates,
          });
        }

        if (assessments.length > 0) {
          queryClient.setQueryData(["/api/assessments"], {
            assessments,
          });
        }

        console.log("Synced data from IndexedDB:", {
          jobs: jobs.length,
          candidates: candidates.length,
          assessments: assessments.length,
        });
      } catch (error) {
        console.error("Failed to sync from IndexedDB:", error);
      }
    };

    syncFromIndexedDB();
  }, []);
}
