import Link from "next/link";
import TaskDashboardContent from "@/features/dashboard-tasks/components/TaskDashboardContent";
import { Suspense } from "react";

export default function TasksPage() {
  return (
    <main className="stack">
      <nav>
        <Link href="/" className="button">
          Back
        </Link>
      </nav>
      <section className="card">
        <h1 className="activity-header">Task Dashboard</h1>
      </section>
      <Suspense fallback={<p>loading...</p>}>
        <TaskDashboardContent />
      </Suspense>
    </main>
  );
}
