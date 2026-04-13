import ReportsContent from "@/features/reports/components/ReportsContent";
import ReportsSkeleton from "@/features/reports/components/ReportsSkeleton";
import Link from "next/link";
import { Suspense } from "react";

const ReportsPage = () => {
  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>
      <section className="card">
        <h1 className="activity-header">Reports</h1>
      </section>
      <Suspense fallback={<ReportsSkeleton />}>
        <ReportsContent />
      </Suspense>
    </main>
  );
};

export default ReportsPage;
