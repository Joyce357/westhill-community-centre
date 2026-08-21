"use client";

import { useState } from "react";
import { ProgramItem } from "@/lib/data";
import ProgramCard from "./ProgramCard";

interface ProgramsGridProps {
  programs: ProgramItem[];
  showFilters?: boolean;
}

const CATEGORIES = [
  "All",
  "Youth Services",
  "Support Services",
  "Family Services",
  "Career Services",
  "Advocacy",
];

export default function ProgramsGrid({
  programs,
  showFilters = true,
}: ProgramsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <div>
      {showFilters && (
        <div
          className="filter-menu active"
          role="tablist"
          aria-label="Filter programs by category"
          style={{ marginBottom: "45px" }}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" ? "All Programs" : category}
            </button>
          ))}
        </div>
      )}

      <div
        className="grid-3 programs-grid"
        id="dynamic-programs-grid"
        style={{ marginBottom: "70px" }}
      >
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
