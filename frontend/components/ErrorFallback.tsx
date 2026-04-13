"use client";
import Link from "next/link";
import { useTransition } from "react";

const ErrorFallback = ({
  error,
  reset,
}: {
  error: string;
  reset: () => Promise<void> | void;
}) => {
  const [isPending, startTransition] = useTransition();
  const handleReset = () => {
    startTransition(async () => {
      await reset();
    });
  };

  return (
    <section className="error-fallback">
      <div className="error-icon">⚠️</div>
      <h2 className="sorry">Sorry, something went wrong</h2>
      <p className="error-msg">{error}</p>
      <div className="btn-container">
        <Link href="/" className="button">
          &larr; Go Home
        </Link>
        <button
          type="button"
          onClick={handleReset}
          className="button primary"
          disabled={isPending}
        >
          {isPending ? "Trying..." : "Try Again"}
        </button>
      </div>
    </section>
  );
};

export default ErrorFallback;
