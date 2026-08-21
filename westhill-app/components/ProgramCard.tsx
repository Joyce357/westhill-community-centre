import Link from "next/link";
import { ProgramItem } from "@/lib/data";

interface ProgramCardProps {
  program: ProgramItem;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="program-card active" style={{ opacity: 1, transform: "none" }}>
      <div className="program-img-wrapper">
        <span className="program-category">{program.category}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt={`${program.title} - West Hill`}
          loading="lazy"
        />
      </div>
      <div className="program-card-body">
        <div className="program-card-icon">
          <i className={program.icon}></i>
        </div>
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        <Link href={program.link} className="program-card-link">
          Learn More <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
}
