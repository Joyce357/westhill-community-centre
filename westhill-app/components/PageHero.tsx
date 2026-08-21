interface PageHeroProps {
  title: string;
  subtitle: string;
  theme?: "dark" | "light";
}

export default function PageHero({
  title,
  subtitle,
  theme = "dark",
}: PageHeroProps) {
  if (theme === "light") {
    return (
      <section
        className="section"
        style={{
          backgroundColor: "var(--wh-bg-white)",
          padding: "70px 0 20px",
          textAlign: "center",
        }}
        aria-label="Page Title"
      >
        <div className="container">
          <h1
            style={{
              color: "#0E3590",
              fontSize: "2.5rem",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: "10px",
              fontFamily: "var(--wh-font-primary)",
              position: "relative",
              display: "inline-block",
              letterSpacing: "0.5px",
            }}
          >
            {title}
            <span
              style={{
                display: "block",
                width: "85px",
                height: "3px",
                backgroundColor: "#0E3590",
                margin: "12px auto 0",
              }}
            ></span>
          </h1>
          <p
            style={{
              color: "var(--wh-text-muted)",
              fontSize: "1.2rem",
              fontWeight: 500,
              maxWidth: "800px",
              margin: "15px auto 0",
              fontFamily: "var(--wh-font-secondary)",
            }}
          >
            {subtitle}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section"
      style={{
        backgroundColor: "var(--wh-blue-dark)",
        color: "var(--wh-bg-white)",
        padding: "50px 0",
        textAlign: "center",
      }}
      aria-label="Page Title"
    >
      <div className="container">
        <h1
          style={{
            color: "var(--wh-bg-white)",
            fontSize: "2.5rem",
            marginBottom: "10px",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "var(--wh-bg-alt)",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
