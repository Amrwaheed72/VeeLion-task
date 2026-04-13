import { FILTERS } from "@/lib/constants";
import { StatusFilterProps } from "@/types/Props.types";

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <section aria-label="Filter tasks by status" className="card">
      <div className="filters-wrapper">
        {FILTERS.map((filter) => {
          const active = filter.value === value;

          return (
            <button
              key={filter.value}
              type="button"
              className={active ? "button primary" : "button"}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
