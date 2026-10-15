import Link from "next/link";

export interface FeaturedProgramItem {
  id: string;
  title: string;
  category: string;
  date?: string;
  description: string;
  attribution?: string;
  icon: string;
  // NOTE: For Grand Opening, the final image will be selected by the user.
  // Do NOT automatically choose or insert Ribbon Cutting.jpeg or any other photo.
  image?: string;
  isPlaceholderImage?: boolean;
  link: string;
  linkText?: string;
}

interface HomeProgramCardProps {
  program: FeaturedProgramItem;
}

export default function HomeProgramCard({ program }: HomeProgramCardProps) {
  const displayImage = program.image;
  const altText = `${program.title} - West Hill Community Centre`;
  const isMilestone = program.category.toUpperCase().includes("MILESTONE");

  return (
    <article className="program-card home-program-card active" style={{ opacity: 1, transform: "none" }}>
      <div className="program-card-accent-bar" aria-hidden="true"></div>
      <div className="program-img-wrapper">
        <span className={`program-category ${isMilestone ? "category-milestone" : ""}`}>
          {program.category}
        </span>
        {!displayImage ? (
          <div className="program-card-graphic-media">
            <div className="program-card-graphic-icon">
              <i className={program.icon}></i>
            </div>
            <span className="program-card-graphic-title">{program.title}</span>
            {program.isPlaceholderImage && (
              <span className="program-card-placeholder-badge">
                <i className="fas fa-camera"></i> Photo Selection Pending
              </span>
            )}
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={displayImage}
            alt={altText}
            loading="lazy"
          />
        )}
      </div>
      <div className="program-card-body">
        <div>
          <div className="program-card-header-row">
            <div className="program-card-icon-pill">
              <i className={program.icon}></i>
            </div>
            <div>
              <h3>{program.title}</h3>
              {program.date && (
                <div className="program-card-date-badge">
                  <i className="far fa-calendar-alt"></i>
                  <span>{program.date}</span>
                </div>
              )}
            </div>
          </div>

          {program.attribution && (
            <div className="program-card-attribution">
              <i className="fas fa-handshake"></i>
              <span>{program.attribution}</span>
            </div>
          )}

          <p>{program.description}</p>
        </div>

        <div className="program-card-footer">
          <Link href={program.link} className="program-card-link">
            <span>{program.linkText || "Learn More"}</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}
