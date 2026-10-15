import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Initial Admin User
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@westhillcommunitycentre.ca";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "WestHill2026!Admin";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: Role.ADMIN,
    },
    create: {
      name: "West Hill Administrator",
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      organizationName: "West Hill Community Centre",
      primaryEmail: "info@westhillcommunitycentre.ca",
      volunteerEmail: "volunteer@westhillcommunity.org",
      phone: "(416) 555-0199",
      streetAddress: "4234 Lawrence Avenue East",
      unit: "Unit 4",
      city: "Scarborough",
      province: "Ontario",
      postalCode: "M1E 4R4",
      hoursWeekday: "Mon – Fri: 9:00 AM – 6:00 PM",
      hoursSaturday: "Saturday: By Program Schedule",
      hoursSunday: "Sunday: Closed",
      facebookUrl: "https://facebook.com/westhill",
      instagramUrl: "https://instagram.com/westhill",
      linkedinUrl: "https://linkedin.com/company/westhill",
      youtubeUrl: "https://youtube.com/westhill",
    },
  });

  // 3. Announcements
  const countAnnouncements = await prisma.announcement.count();
  if (countAnnouncements === 0) {
    await prisma.announcement.create({
      data: {
        message: "Summer Youth Programs registration is now open!",
        ctaText: "Register today",
        ctaUrl: "/programs",
        isActive: true,
      },
    });
  }

  // 4. Program Categories & Programs
  const categories = [
    { name: "Youth Services", slug: "youth-services", displayOrder: 1 },
    { name: "Support Services", slug: "support-services", displayOrder: 2 },
    { name: "Family Services", slug: "family-services", displayOrder: 3 },
    { name: "Career Services", slug: "career-services", displayOrder: 4 },
    { name: "Advocacy", slug: "advocacy", displayOrder: 5 },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.programCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, displayOrder: cat.displayOrder },
      create: cat,
    });
    categoryMap.set(cat.name, created.id);
  }

  const initialPrograms = [
    {
      id: "youth-hub",
      slug: "youth-hub",
      title: "Youth Hub",
      categoryName: "Youth Services",
      shortDescription: "A welcoming drop-in space for Scarborough youth to study, access technology, and build positive peer relationships.",
      fullDescription: "Our Youth Hub offers structured homework help, coding workshops, leadership circles, and recreational activities in a safe, supportive environment for Scarborough youth.",
      icon: "fas fa-laptop-code",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
      schedule: "Mon - Fri: 3:30 PM - 6:00 PM",
      eligibility: "Youth aged 12–18 residing in East Scarborough",
      location: "Youth Hub Lounge, Unit 4, 4234 Lawrence Ave E",
      registrationInfo: "Free drop-in. Parent/guardian emergency contact form required upon first visit.",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "seniors-support",
      slug: "seniors-support",
      title: "West Hill Seniors Program",
      categoryName: "Support Services",
      shortDescription: "Weekly community program for older adults featuring chair exercise, digital skills, Housing Tuesday, health talks, wellness, safety, and social connection.",
      fullDescription: "A welcoming weekly program for older adults featuring Chair Exercise, Digital Skills for Seniors, Housing Tuesday, Health Talks, Special Guest sessions, Seniors Wellness activities, fraud, phone, and digital safety learning, and social engagement.",
      icon: "fas fa-heartbeat",
      imageUrl: "/assets/images/gallery/Senoirs-Program-incolaboration-with-Toronto-public-Library-04.jpeg",
      schedule: "Tuesdays: 9:00 AM – 11:30 AM",
      eligibility: "Seniors 55+ and their caregivers",
      location: "Main Community Room, Unit 4, 4234 Lawrence Ave E",
      registrationInfo: "Free registration. Please call ahead for dietary accommodations.",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "youth-leadership",
      slug: "youth-leadership",
      title: "Youth Development & Leadership",
      categoryName: "Youth Services",
      shortDescription: "Empowering young leaders with formal leadership workshops, community service opportunities, and peer tutoring roles.",
      fullDescription: "Build resume-ready leadership skills, track high school volunteer service hours, and collaborate on real community impact projects guided by experienced mentors.",
      icon: "fas fa-graduation-cap",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
      schedule: "Wednesdays: 4:30 PM - 6:30 PM",
      eligibility: "High school students seeking leadership roles and volunteer hours",
      location: "Seminar Room A",
      registrationInfo: "Enrollment per term. Register via our online assistance form.",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
    {
      id: "women-family",
      slug: "women-family",
      title: "Women’s Wellness Program",
      categoryName: "Family Services",
      shortDescription: "A welcoming community program focused on wellness, health education, and social connection for women.",
      fullDescription: "A supportive and welcoming community space focused on wellness, health education, and social connection for local women.",
      icon: "fas fa-child",
      imageUrl: "/images/family_support.png",
      schedule: null,
      eligibility: "Women and community members seeking wellness and health connection",
      location: null,
      registrationInfo: "Drop-ins welcome.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 4,
    },
    {
      id: "disability-services",
      slug: "disability-services",
      title: "Disability Support Services",
      categoryName: "Support Services",
      shortDescription: "Customized, inclusive life-skill sessions and social recreation designed to empower individuals with special needs.",
      fullDescription: "Inclusive life-skill development, adaptive recreation, sensory-friendly activities, and caregiver support networks.",
      icon: "fas fa-wheelchair",
      imageUrl: "/images/disability_support.png",
      schedule: "Thursdays: 1:00 PM - 3:00 PM",
      eligibility: "Residents with developmental or physical disabilities and support workers",
      location: "Accessible Activity Suite",
      registrationInfo: "Pre-registration requested to ensure customized accessibility accommodations.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 5,
    },
    {
      id: "benefits-support",
      slug: "benefits-support",
      title: "Benefits Support",
      categoryName: "Support Services",
      shortDescription: "Assisting residents with navigating government benefits applications, taxation queries, child benefits, and pensions.",
      fullDescription: "One-on-one confidential assistance navigating Ontario Works, ODSP, Canada Child Benefit (CCB), OAS/GIS pension forms, and annual tax clinics.",
      icon: "fas fa-file-invoice-dollar",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
      schedule: "By appointment: Mon, Wed, Fri",
      eligibility: "All Scarborough residents needing government program navigation",
      location: "Consultation Office 2",
      registrationInfo: "Book confidential appointment via contact form or reception desk.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 6,
    },
    {
      id: "housing-support",
      slug: "housing-support",
      title: "Housing Referrals & Support",
      categoryName: "Support Services",
      shortDescription: "Guiding families in housing crises with emergency shelter referrals, landlord dispute info, and social housing forms.",
      fullDescription: "Emergency housing placement support, social housing application guidance, tenant rights resources, and advocacy connections.",
      icon: "fas fa-home",
      imageUrl: "/images/housing_support.png",
      schedule: "Mon - Thu: 9:30 AM - 4:00 PM",
      eligibility: "Individuals and families seeking housing stability in Scarborough",
      location: "Housing Resource Desk",
      registrationInfo: "Walk-ins welcome or submit inquiry online.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 7,
    },
    {
      id: "employment-resume",
      slug: "employment-resume",
      title: "Employment & Resume Support",
      categoryName: "Career Services",
      shortDescription: "One-on-one employment counselling, resume writing clinics, cover letter reviews, and mock interview practice.",
      fullDescription: "Resume enhancement workshops, LinkedIn profile optimization, interview preparation, and direct connection to local Scarborough employers.",
      icon: "fas fa-briefcase",
      imageUrl: "/images/employment_support.png",
      schedule: "Tuesdays: 2:00 PM - 5:00 PM",
      eligibility: "Job seekers of all experience levels and backgrounds",
      location: "Career Lab",
      registrationInfo: "Free drop-in or scheduled one-on-one mock interviews.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 8,
    },
    {
      id: "community-engagement",
      slug: "community-engagement",
      title: "Community Engagement",
      categoryName: "Advocacy",
      shortDescription: "Organizing clean-up days, Scarborough block parties, community asset mapping, and positive civic participation projects.",
      fullDescription: "Resident-led grassroots organizing, seasonal park clean-up initiatives, community art projects, and neighborhood block celebrations.",
      icon: "fas fa-bullhorn",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
      schedule: "Monthly planning meetings + weekend community days",
      eligibility: "Open to all residents, youth, and local organizations",
      location: "Central Courtyard & Community Rooms",
      registrationInfo: "Open participation.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 9,
    },
    {
      id: "community-advocacy",
      slug: "community-advocacy",
      title: "Community Advocacy",
      categoryName: "Advocacy",
      shortDescription: "Empowering Scarborough residents to advocate for transit equity, tenant rights, local jobs, and neighborhood resources.",
      fullDescription: "Civic education workshops, tenant rights legal education clinics, transit equity forums, and community deputation support.",
      icon: "fas fa-users",
      imageUrl: "/images/community_advocacy.png",
      schedule: "First Thursday of each month: 6:30 PM - 8:30 PM",
      eligibility: "All West Hill community members and civic champions",
      location: "Main Gymnasium / Virtual Option",
      registrationInfo: "Free registration. Refreshments provided.",
      isFeatured: false,
      isPublished: true,
      displayOrder: 10,
    },
  ];

  for (const prog of initialPrograms) {
    const categoryId = categoryMap.get(prog.categoryName);
    if (!categoryId) continue;

    await prisma.program.upsert({
      where: { slug: prog.slug },
      update: {
        title: prog.title,
        shortDescription: prog.shortDescription,
        fullDescription: prog.fullDescription,
        categoryId,
        icon: prog.icon,
        imageUrl: prog.imageUrl,
        schedule: prog.schedule,
        eligibility: prog.eligibility,
        location: prog.location,
        registrationInfo: prog.registrationInfo,
        isFeatured: prog.isFeatured,
        isPublished: prog.isPublished,
        displayOrder: prog.displayOrder,
      },
      create: {
        slug: prog.slug,
        title: prog.title,
        shortDescription: prog.shortDescription,
        fullDescription: prog.fullDescription,
        categoryId,
        icon: prog.icon,
        imageUrl: prog.imageUrl,
        schedule: prog.schedule,
        eligibility: prog.eligibility,
        location: prog.location,
        registrationInfo: prog.registrationInfo,
        isFeatured: prog.isFeatured,
        isPublished: prog.isPublished,
        displayOrder: prog.displayOrder,
      },
    });
  }

  // 5. Events
  const initialEvents = [
    {
      slug: "westhill-day",
      title: "West Hill Day: Celebrating Community Together",
      description: "Our signature annual celebration featuring local vendor booths, children's zone, cultural dances, live music, and local support services.",
      eventDate: new Date("2026-06-20T11:00:00-04:00"),
      startTime: "11:00 AM",
      endTime: "5:00 PM",
      location: "Morningside Park",
      category: "Community Events",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
      isFeatured: true,
      isPublished: true,
      rsvpEnabled: true,
    },
    {
      slug: "job-fair",
      title: "Community Job Fair & Networking",
      description: "Meet hiring managers from local Scarborough businesses in hospitality, customer support, warehousing, and retail sectors.",
      eventDate: new Date("2026-06-22T10:00:00-04:00"),
      startTime: "10:00 AM",
      endTime: "3:00 PM",
      location: "Main Gymnasium",
      category: "Career Services",
      imageUrl: "https://images.unsplash.com/photo-1521791136368-1a8df3d95b35?auto=format&fit=crop&q=80&w=600",
      isFeatured: true,
      isPublished: true,
      rsvpEnabled: true,
    },
    {
      slug: "youth-leadership-workshop",
      title: "Youth Development & Leadership Workshop",
      description: "Interactive session focusing on communication skills, community project planning, and collaborative teamwork for youth.",
      eventDate: new Date("2026-06-12T16:00:00-04:00"),
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      location: "Youth Hub Lounge",
      category: "Youth Services",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
      isFeatured: false,
      isPublished: true,
      rsvpEnabled: true,
    },
    {
      slug: "community-bbq",
      title: "Welcome Neighborhood Summer BBQ",
      description: "Meet your neighbors and learn about our upcoming summer programs. Free burgers, halal options, and games for kids.",
      eventDate: new Date("2026-06-15T12:00:00-04:00"),
      startTime: "12:00 PM",
      endTime: "4:00 PM",
      location: "Central Courtyard",
      category: "Community Events",
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
      isFeatured: false,
      isPublished: true,
      rsvpEnabled: true,
    },
    {
      slug: "volunteer-orientation",
      title: "Volunteer Orientation & Information Session",
      description: "Find out how you can support our upcoming programs and events. Learn about open roles, safety checks, and guidelines.",
      eventDate: new Date("2026-06-08T18:00:00-04:00"),
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      location: "Community Room B",
      category: "Meetings",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600",
      isFeatured: false,
      isPublished: true,
      rsvpEnabled: true,
    },
  ];

  for (const ev of initialEvents) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: ev,
      create: ev,
    });
  }

  // 6. Gallery Items
  const initialGalleryMedia = [
    { type: "VIDEO", src: "/assets/images/westhillcenterOpening/WhatsApp Video 2026-06-09 at 11.10.50 PM.mp4", title: "Grand Opening Ceremony Video Highlight" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/Ribbon Cutting.jpeg", title: "Grand Opening Ceremony 2026 - Ribbon Cutting" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/Coach Rejoice.jpeg", title: "Grand Opening Ceremony 2026 - Coach Rejoice" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/Donna Cardoza From Toronto District School Board giving a Speech.jpeg", title: "Grand Opening Ceremony 2026 - TDSB Speech" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/President of West Hill giving a speech.jpeg", title: "Grand Opening Ceremony 2026 - President Speech" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/43 Division police giving a Speech.jpeg", title: "Grand Opening Ceremony 2026 - 43 Division Speech" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM.jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (1).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (2).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (3).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (4).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (5).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (6).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (7).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (8).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (9).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (10).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM.jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (1).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (2).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (4).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (5).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (6).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (7).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (8).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (9).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM.jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (1).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (2).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (4).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (5).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (6).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (7).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM.jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (1).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (3).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (4).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (5).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (6).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (7).jpeg", title: "Grand Opening Ceremony 2026" },
    { type: "IMAGE", src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (8).jpeg", title: "Grand Opening Ceremony 2026" },
  ];

  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    for (let i = 0; i < initialGalleryMedia.length; i++) {
      const item = initialGalleryMedia[i];
      await prisma.galleryItem.create({
        data: {
          title: item.title,
          mediaType: item.type === "VIDEO" ? "VIDEO" : "IMAGE",
          mediaUrl: item.src,
          displayOrder: i + 1,
          isPublished: true,
          category: "Grand Opening Ceremony 2026",
          altText: item.title,
        },
      });
    }
  }

  // 7. Resource Items (Downloads & Helpful Community Connections)
  const initialResources = [
    {
      title: "Volunteer Handbook",
      description: "Official guide and volunteer orientation packet for West Hill Community Centre.",
      resourceType: "DOCUMENT" as const,
      url: "/assets/documents/Volunteer-Handbook-West-Hill-Community-Centre.pdf",
      fileSize: "PDF | 153 KB | Official Guide",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 1,
      isPublished: true,
    },
    {
      title: "Program Registration Guide",
      description: "Detailed step-by-step registration instructions for youth, seniors, and family programs.",
      resourceType: "GUIDE" as const,
      url: "/programs",
      fileSize: "PDF | Document Info",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 2,
      isPublished: true,
    },
    {
      title: "Community Partnership Package",
      description: "Information on organizational sponsorships, joint initiatives, and community impact tiers.",
      resourceType: "GUIDE" as const,
      url: "/partners",
      fileSize: "PDF | Partnership Info",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 3,
      isPublished: true,
    },
    {
      title: "Summer Program Information",
      description: "Upcoming summer schedules, sports leagues, and camp registration details.",
      resourceType: "DOCUMENT" as const,
      url: "#",
      fileSize: "Coming Soon",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 4,
      isPublished: true,
    },
    {
      title: "Event Participation Guide",
      description: "Calendar and participation guidelines for upcoming community celebrations and workshops.",
      resourceType: "GUIDE" as const,
      url: "/events",
      fileSize: "PDF | Events Calendar",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 5,
      isPublished: true,
    },
    {
      title: "Toronto 211",
      description: "Free, confidential service connecting you to government and community programs across Toronto.",
      resourceType: "EXTERNAL_LINK" as const,
      url: "https://211toronto.ca",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-landmark",
      displayOrder: 6,
      isPublished: true,
    },
    {
      title: "Toronto Public Library",
      description: "The Morningside and Port Union library branches provide book lending, study spaces, and child learning groups.",
      resourceType: "EXTERNAL_LINK" as const,
      url: "https://www.torontopubliclibrary.ca",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-book-open",
      displayOrder: 7,
      isPublished: true,
    },
    {
      title: "Settlement Services",
      description: "Connect with settlement counseling, English language learning (LINC), and housing referral helpers in Scarborough.",
      resourceType: "EXTERNAL_LINK" as const,
      url: "https://settlement.org",
      fileSize: null,
      category: "Community Connections",
      icon: "fas fa-hands-holding",
      displayOrder: 8,
      isPublished: true,
    },
  ];

  const resourceCount = await prisma.resourceItem.count();
  if (resourceCount === 0) {
    for (const res of initialResources) {
      await prisma.resourceItem.create({
        data: res,
      });
    }
  }

  // 8. Partner Organizations & Community Collaborators
  const initialPartners = [
    {
      name: "Toronto District School Board (TDSB)",
      description: "Collaborating on educational programs, youth tutoring, and community school initiatives across East Scarborough.",
      logoUrl: null,
      websiteUrl: "https://www.tdsb.on.ca",
      tier: "Community Builder",
      category: "Education",
      displayOrder: 1,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "Toronto Public Health",
      description: "Providing community wellness clinics, health workshops, immunization advice, and family wellness guidelines.",
      logoUrl: null,
      websiteUrl: "https://www.toronto.ca/community-people/health-wellness-care/",
      tier: "Cornerstone Partner",
      category: "Health & Wellness",
      displayOrder: 2,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "West Hill Collegiate Institute",
      description: "Connecting local students with volunteer opportunities, athletic tournaments, and youth development circles.",
      logoUrl: null,
      websiteUrl: "https://schoolweb.tdsb.on.ca/westhill",
      tier: "Youth Advocate",
      category: "Education",
      displayOrder: 3,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "Jays Care Foundation",
      description: "Supporting inclusive youth baseball and athletic recreation leagues for neighborhood children in Scarborough.",
      logoUrl: null,
      websiteUrl: "https://www.mlb.com/bluejays/community/jays-care",
      tier: "Youth Advocate",
      category: "Sports & Recreation",
      displayOrder: 4,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "Code Ninjas Scarborough",
      description: "Delivering introductory coding camps, STEM workshops, and digital literacy for youth hub members.",
      logoUrl: null,
      websiteUrl: "https://www.codeninjas.com",
      tier: "Youth Advocate",
      category: "STEM & Technology",
      displayOrder: 5,
      isFeatured: false,
      isPublished: true,
    },
    {
      name: "West Hill Community Association",
      description: "Collaborating on neighborhood events, civic engagement, and community advocacy across Scarborough-West Hill.",
      logoUrl: null,
      websiteUrl: "https://www.westhillcommunityassociation.com",
      tier: "Community Builder",
      category: "Community & Civic",
      displayOrder: 6,
      isFeatured: false,
      isPublished: true,
    },
  ];

  const partnerCount = await prisma.partner.count();
  if (partnerCount === 0) {
    for (const partner of initialPartners) {
      await prisma.partner.create({
        data: partner,
      });
    }
  }

  console.log("Database seeded successfully!");
}



main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
