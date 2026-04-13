import ActivityFeedContent from "@/features/activity-feed/components/ActivityFeedContent";
import ActivitySkeleton from "@/features/activity-feed/components/ActivitySkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default async function ActivityPage() {
  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>
      <section className="card">
        <h1 className="activity-header">Activity Feed</h1>
      </section>
      <Suspense fallback={<ActivitySkeleton />}>
        <ActivityFeedContent />
      </Suspense>
    </main>
  );
}
