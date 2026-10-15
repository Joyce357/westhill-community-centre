import HomeProgramCard, { FeaturedProgramItem } from "./HomeProgramCard";

interface HomeProgramsGridProps {
  programs: FeaturedProgramItem[];
}

export default function HomeProgramsGrid({ programs }: HomeProgramsGridProps) {
  return (
    <div
      className="home-programs-grid home-programs-four-grid"
      id="homepage-featured-programs-grid"
    >
      {programs.map((program) => (
        <HomeProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
