import Link from "next/link";
import Image from "next/image";
import { getPublishedPrograms, getPublishedEvents } from "@/lib/queries";
import ProgramsGrid from "@/components/ProgramsGrid";
import EventCalendar from "@/components/EventCalendar";
import EventsGrid from "@/components/EventsGrid";
import HopeSlider from "@/components/HopeSlider";
import OpeningCountdown from "@/components/OpeningCountdown";

export default async function HomePage() {
  const [programs, events] = await Promise.all([
    getPublishedPrograms(),
    getPublishedEvents(),
  ]);
  return (
    <>
      {/* 2. HERO SECTION */}
      <section className="hero" aria-label="Welcome Banner">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-container">
            <span className="hero-tagline">
              Building on a strong foundation of community engagement
            </span>
            <h1>
              Connecting Communities.<br />
              Supporting Families.<br />
              Building a Stronger West Hill.
            </h1>
            <p>
              West Hill Community Centre brings people together through community programs, family support services, youth development initiatives, volunteer opportunities, advocacy, and meaningful local partnerships.
            </p>
            <div className="hero-actions">
              <Link href="/programs" className="btn btn-primary">
                Explore Programs
              </Link>
              <Link href="/volunteer" className="btn btn-outline-white">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WELCOME SECTION (MISSION, VISION, VALUES & QUICK ACCESS) */}
      <section className="section Welcome-section" id="welcome-section" aria-label="Welcome and Introduction">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Welcome to West Hill</h2>
            <p>
              Created through community leadership and a shared commitment to a stronger, more connected neighbourhood.
            </p>
          </div>

          {/* Mission & Vision side-by-side */}
          <div className="mission-vision-wrapper active" style={{ marginBottom: "70px", opacity: 1, transform: "none" }}>
            <div>
              <div className="m-v-block">
                <h3>Our Mission</h3>
                <p>
                  To foster an inclusive, welcoming, and supportive community where residents of all ages can access resources, develop skills, build meaningful relationships, and thrive together.
                </p>
              </div>

              <div className="m-v-block" style={{ marginTop: "40px" }}>
                <h3>Our Vision</h3>
                <p>
                  A vibrant and connected West Hill community where every resident has the opportunity to belong, contribute, and thrive.
                </p>
              </div>
            </div>
            <div
              className="m-v-img"
              role="img"
              aria-label="Scarborough community gathering outdoor"
              style={{
                borderRadius: "var(--wh-radius-lg)",
                backgroundImage: "url('/images/hero_community.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "350px",
              }}
            ></div>
          </div>

          {/* Core Values */}
          <div className="grid-4 values-grid" style={{ marginBottom: "80px" }}>
            <div className="value-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="value-icon"><i className="fas fa-users"></i></div>
              <h3>Inclusion</h3>
              <p>Everyone belongs and has a place at our table.</p>
            </div>

            <div className="value-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="value-icon"><i className="fas fa-comments"></i></div>
              <h3>Respect</h3>
              <p>Every voice matters and contributes to our growth.</p>
            </div>

            <div className="value-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="value-icon"><i className="fas fa-handshake"></i></div>
              <h3>Collaboration</h3>
              <p>Working together with residents and local partners.</p>
            </div>

            <div className="value-card active" style={{ opacity: 1, transform: "none" }}>
              <div className="value-icon"><i className="fas fa-seedling"></i></div>
              <h3>Empowerment</h3>
              <p>Supporting residents to reach their full potential.</p>
            </div>
          </div>

          {/* Quick Access grid */}
          <div className="quick-access-wrapper active" style={{ opacity: 1, transform: "none" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "40px",
                color: "var(--wh-blue-primary)",
                fontFamily: "var(--wh-font-primary)",
                fontSize: "1.6rem",
              }}
            >
              How Can We Help You?
            </h3>
            <div className="quick-grid">
              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-hand-holding-hand"></i></div>
                <h3>Programs & Services</h3>
                <p>Find educational classes, support services, career coaching, and active recreation tailored for all ages.</p>
                <Link href="/programs" className="quick-card-btn">
                  Explore Programs <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-calendar-days"></i></div>
                <h3>Community Events</h3>
                <p>Attend our neighborhood bbq, job fairs, workshops, and planning committees in Scarborough.</p>
                <Link href="/events" className="quick-card-btn">
                  View Calendar <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-people-carry-box"></i></div>
                <h3>Volunteer</h3>
                <p>Share your skills and time to support youth mentoring, senior activities, and neighborhood food security.</p>
                <Link href="/volunteer" className="quick-card-btn">
                  Become a Volunteer <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-folder-open"></i></div>
                <h3>Resources</h3>
                <p>Download program guides, flyer schedules, settlement packets, and volunteer applications.</p>
                <Link href="/resources" className="quick-card-btn">
                  Access Resources <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-circle-dollar-to-slot"></i></div>
                <h3>Donate</h3>
                <p>Support the ongoing growth and vitality of West Hill by funding free community programs.</p>
                <Link href="/donate" className="quick-card-btn">
                  Support Us <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              <div className="quick-card">
                <div className="quick-icon"><i className="fas fa-envelope-open-text"></i></div>
                <h3>Contact Us</h3>
                <p>Reach out to our staff for program inquiries, partner proposals, or general inquiries.</p>
                <Link href="/contact" className="quick-card-btn">
                  Get In Touch <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRESIDENT'S MESSAGE SECTION */}
      <section className="section leadership-section section-alt" aria-label="Leadership Feature">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>President&apos;s Message</h2>
            <p>A vision brought to life through community leadership and a shared commitment to West Hill.</p>
          </div>

          <div className="leadership-wrapper grid-2 active" style={{ opacity: 1, transform: "none" }}>
            <div className="leadership-image-container">
              <Image
                src="/images/coach_john_emore.jpeg"
                alt="Coach John Emore - President of West Hill Community Association"
                width={500}
                height={500}
                className="leadership-img"
                style={{ width: "100%", height: "auto", borderRadius: "var(--wh-radius-lg)" }}
              />
              <div className="leadership-badge">
                <h4>Coach John Emore</h4>
                <p>President, West Hill Community Association</p>
              </div>
            </div>

            <div className="leadership-content">
              <div className="quote-block">
                <i className="fas fa-quote-left quote-icon-top"></i>
                <blockquote>
                  &ldquo;West Hill Community Centre was created to be a place where residents can connect, belong, and thrive. Together, we are building opportunities and strengthening our community for generations to come.&rdquo;
                </blockquote>
              </div>

              <div className="leadership-story">
                <p>
                  Through years of community leadership, advocacy, youth engagement, neighbourhood initiatives, and resident support, Coach John Emore has worked alongside community members and partners to help strengthen West Hill.
                </p>
                <p>
                  The opening of the West Hill Community Centre represents an important milestone in that journey—a dedicated space where residents can access services, build relationships, develop skills, and participate in community life.
                </p>
                <p>
                  This Centre reflects the collective efforts of local leaders, volunteers, organizations, and residents who believe in creating a stronger and more connected community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS SECTION */}
      <section className="section" id="programs-section" aria-label="Our Programs">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Featured Programs</h2>
            <p>Explore our core service lines built to connect residents, build skills, and provide vital support.</p>
          </div>

          <ProgramsGrid programs={programs} showFilters={true} />

          <div style={{ textAlign: "center", marginTop: "45px" }}>
            <Link href="/programs" className="btn btn-blue">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY ENGAGEMENT LEGACY SECTION */}
      <section className="section community-impact-section" aria-label="Legacy of Community Engagement">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Building on a Legacy of Community Engagement</h2>
            <p>
              The West Hill Community Centre builds upon a rich history of local leadership, resident advocacy, volunteerism, and neighbourhood partnerships in Scarborough. While our physical hub is a new space, our work is rooted in a long history of community engagement.
            </p>
          </div>

          {/* Qualitative Impact Grid */}
          <div className="grid-3 stats-grid active" style={{ marginBottom: "60px", rowGap: "40px", opacity: 1, transform: "none" }}>
            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-users-line" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Community Leadership</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Empowering local residents to lead neighbourhood initiatives and shape programs that address local needs.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-people-carry-box" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Volunteer Engagement</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Mobilizing dedicated volunteers who contribute their time, skills, and energy to support our community programs.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-bullhorn" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Resident Advocacy</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Creating spaces for residents to voice their ideas, champion local interests, and advocate for resources.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-seedling" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Youth Development</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Providing mentoring, academic tutoring, leadership skills, and recreational activities for local youth.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-handshake" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Local Partnerships</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Collaborating with schools, healthcare providers, and local organizations to coordinate and expand services.
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-bubble">
                <i className="fas fa-hand-holding-hand" style={{ fontSize: "2.2rem", color: "var(--wh-orange-accent)" }}></i>
              </div>
              <span className="stat-label">Neighbourhood Support</span>
              <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginTop: "12px", lineHeight: 1.6, maxWidth: "320px" }}>
                Fostering connections and offering vital support services to families, seniors, and newcomers in West Hill.
              </p>
            </div>
          </div>

          {/* Stories of Hope Testimonial Slider */}
          <div
            className="active"
            style={{
              marginTop: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--wh-radius-lg)",
              padding: "40px 20px",
              opacity: 1,
              transform: "none",
            }}
          >
            <h3 style={{ textAlign: "center", color: "var(--wh-bg-white)", fontFamily: "var(--wh-font-primary)", marginBottom: "30px" }}>
              Stories of Hope
            </h3>
            <HopeSlider />
          </div>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS & CALENDAR SECTION */}
      <section className="section section-alt" id="events-section" aria-label="Upcoming Events and Interactive Calendar">
        <div className="container">
          <div className="section-header active" style={{ opacity: 1, transform: "none" }}>
            <h2>Upcoming Events & Calendar</h2>
            <p>Participate in our local events, class schedules, resource sessions, and neighborhood activities.</p>
          </div>

          {/* Grand Opening Countdown Banner */}
          <div
            className="opening-banner-wrapper active"
            style={{
              marginBottom: "50px",
              backgroundColor: "var(--wh-blue-dark)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "var(--wh-radius-lg)",
              color: "var(--wh-bg-white)",
              opacity: 1,
              transform: "none",
            }}
          >
            <div className="opening-banner-grid">
              <div>
                <span
                  className="opening-tag"
                  style={{
                    backgroundColor: "rgba(43, 142, 86, 0.2)",
                    border: "1px solid var(--wh-green-primary)",
                    color: "var(--wh-green-light)",
                    padding: "4px 14px",
                    borderRadius: "var(--wh-radius-full)",
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    display: "inline-block",
                    marginBottom: "15px",
                  }}
                >
                  Grand Opening
                </span>
                <h3 style={{ color: "var(--wh-bg-white)", fontSize: "1.8rem", marginBottom: "15px" }}>
                  Official Opening & Ribbon Cutting
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--wh-bg-alt)", marginBottom: "20px" }}>
                  Join local residents, community leaders, and strategic partners as we celebrate the official opening of the West Hill Community Centre and look forward to building a stronger community together.
                </p>
                <div style={{ display: "flex", gap: "15px", fontSize: "0.88rem", color: "var(--wh-bg-alt)", flexWrap: "wrap" }}>
                  <span><i className="fas fa-calendar-alt" style={{ color: "var(--wh-orange-accent)", marginRight: "6px" }}></i> June 9, 2026 at 10:00 AM</span>
                  <span><i className="fas fa-map-marker-alt" style={{ color: "var(--wh-orange-accent)", marginRight: "6px" }}></i> 4234 Lawrence Ave East, Scarborough, ON</span>
                </div>
              </div>
              <div
                className="opening-countdown"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--wh-radius-md)",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <h4 style={{ color: "var(--wh-bg-white)", fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "15px", letterSpacing: "1px" }}>
                  Opening Ceremony Countdown
                </h4>
                <OpeningCountdown />
              </div>
            </div>
          </div>

          {/* Visual Events Grid */}
          <EventsGrid events={events} />

          {/* Interactive Calendar */}
          <EventCalendar events={events} />

          {/* West Hill Day Signature Block */}
          <div
            className="westhill-day-featured active"
            style={{
              marginTop: "50px",
              borderRadius: "var(--wh-radius-lg)",
              padding: "40px",
              boxShadow: "var(--wh-shadow-soft)",
              opacity: 1,
              transform: "none",
            }}
          >
            <div className="feat-banner-content">
              <h3 style={{ fontFamily: "var(--wh-font-primary)", fontSize: "1.8rem", color: "var(--wh-bg-white)", marginBottom: "8px" }}>
                West Hill Day
              </h3>
              <div
                className="feat-subtitle"
                style={{
                  fontWeight: 600,
                  color: "var(--wh-orange-accent)",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  letterSpacing: "1px",
                }}
              >
                Celebrating Community Together
              </div>
              <p className="feat-desc" style={{ lineHeight: 1.7, color: "var(--wh-bg-alt)", marginBottom: "30px" }}>
                West Hill Day brings together residents, partners, and local leaders to celebrate Scarborough&apos;s local culture, arts, and community strength. Participate in vendor booths, sports, food trucks, and children&apos;s activities.
              </p>

              <div className="feat-btn-group" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
                  Become a Vendor
                </Link>
                <Link href="/partners" className="btn btn-blue" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>
                  Become a Sponsor
                </Link>
                <Link
                  href="/volunteer"
                  className="btn btn-outline-white"
                  style={{ padding: "10px 20px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  Volunteer Opportunities
                </Link>
                <Link
                  href="/events"
                  className="btn btn-outline-white"
                  style={{ padding: "10px 20px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMMUNITY PARTNERS SECTION */}
      <section className="section" aria-label="Partnerships">
        <div className="container">
          <div className="partners-wrapper active" style={{ opacity: 1, transform: "none" }}>
            <div className="section-header" style={{ marginBottom: "40px" }}>
              <h2>Community Partners</h2>
              <p>Partnership announcements will be updated following the official opening of West Hill Community Centre.</p>
            </div>

            <div className="partners-showcase">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="partner-logo-item">
                  <div className="partner-logo-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" aria-hidden="true">
                      <circle cx="45" cy="25" r="5" fill="#0F3B6A" />
                      <circle cx="65" cy="15" r="4" fill="#2B8E56" />
                      <circle cx="65" cy="35" r="4" fill="#F4A222" />
                      <path d="M45 25 L65 15 M45 25 L65 35" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
                      <text x="82" y="27" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="11" fill="#0F3B6A">
                        WEST HILL
                      </text>
                      <text x="82" y="36" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="7" fill="#718096" letterSpacing="0.5">
                        PARTNER
                      </text>
                    </svg>
                  </div>
                  <span className="partner-logo-name">Partner Announcement Coming Soon</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/partners" className="btn btn-blue">
                Become a Community Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VOLUNTEER SECTION (VOLUNTEER CTA) */}
      <section className="section section-alt" aria-label="Volunteer Sign Up">
        <div className="container">
          <div
            className="vol-banner active"
            style={{
              backgroundColor: "var(--wh-blue-primary)",
              borderRadius: "var(--wh-radius-lg)",
              padding: "50px",
              textAlign: "center",
              color: "var(--wh-bg-white)",
              opacity: 1,
              transform: "none",
            }}
          >
            <h3 style={{ color: "var(--wh-bg-white)", fontFamily: "var(--wh-font-primary)", fontSize: "1.8rem", marginBottom: "15px" }}>
              Make a Difference in Your Community
            </h3>
            <p style={{ maxWidth: "800px", margin: "0 auto 30px", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--wh-bg-alt)" }}>
              There are multiple ways to share your skills and support local programs. Join our volunteer team to support youth mentoring, senior activities, and neighbourhood food security.
            </p>
            <div className="vol-btn-group" style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
              <Link href="/volunteer" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.88rem" }}>
                Become a Volunteer
              </Link>
              <Link href="/volunteer#opportunities" className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: "0.88rem" }}>
                Volunteer Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
