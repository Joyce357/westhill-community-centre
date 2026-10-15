export interface ProgramItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  categorySlug?: string;
  description: string;
  fullDescription?: string;
  icon: string;
  image: string;
  link: string;
  displayLabel?: string | null;
  schedule?: string | null;
  location?: string | null;
  eligibility?: string | null;
  registrationInfo?: string | null;
  isFeatured?: boolean;
  isPublished?: boolean;
  displayOrder?: number;
}

export interface EventItem {
  id: string;
  title: string;
  day: string;
  month: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  program: string;
}

export interface GalleryMediaItem {
  type: "image" | "video";
  src: string;
  title: string;
  category?: string;
  thumbnail?: string;
}

export const SITE_SETTINGS = {
  orgName: "West Hill Community Centre",
  address: "Unit 4, 4234 Lawrence Avenue East, Scarborough, Ontario M1E 4R4",
  phone: "(416) 555-0199",
  primaryEmail: "info@westhillcommunitycentre.ca",
  volunteerEmail: "volunteer@westhillcommunity.org",
  weekdayHours: "Mon – Fri: 9:00 AM – 6:00 PM",
  saturdayHours: "Saturday: By Program Schedule",
  sundayHours: "Sunday: Closed",
  socials: {
    facebook: "https://facebook.com/westhill",
    instagram: "https://instagram.com/westhill",
    linkedin: "https://linkedin.com/company/westhill",
    youtube: "https://youtube.com/westhill",
  },
};

export const INITIAL_PROGRAMS: ProgramItem[] = [
  {
    id: "seniors-support",
    title: "West Hill Seniors Program",
    category: "Support Services",
    description: "Weekly community program for older adults featuring chair exercise, digital skills, Housing Tuesday, health talks, wellness, safety, and social connection.",
    icon: "fas fa-heartbeat",
    image: "/assets/images/gallery/Senoirs-Program-incolaboration-with-Toronto-public-Library-04.jpeg",
    link: "/programs#seniors-support",
  },
  {
    id: "youth-leadership",
    title: "Youth Development & Leadership",
    category: "Youth Services",
    description: "Empowering young leaders with formal leadership workshops, community service opportunities, and peer tutoring roles.",
    icon: "fas fa-graduation-cap",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    link: "/programs#youth-leadership",
  },
  {
    id: "women-family",
    title: "Women’s Wellness Program",
    category: "Family Services",
    description: "A welcoming community program focused on wellness, health education, and social connection for women.",
    icon: "fas fa-child",
    image: "/images/family_support.png",
    link: "/programs#women-family",
  },
  {
    id: "disability-services",
    title: "Disability Support Services",
    category: "Support Services",
    description: "Customized, inclusive life-skill sessions and social recreation designed to empower individuals with special needs.",
    icon: "fas fa-wheelchair",
    image: "/images/disability_support.png",
    link: "/programs#disability-services",
  },
  {
    id: "benefits-support",
    title: "Benefits Support",
    category: "Support Services",
    description: "Assisting residents with navigating government benefits applications, taxation queries, child benefits, and pensions.",
    icon: "fas fa-file-invoice-dollar",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    link: "/programs#benefits-support",
  },
  {
    id: "housing-support",
    title: "Housing Referrals & Support",
    category: "Support Services",
    description: "Guiding families in housing crises with emergency shelter referrals, landlord dispute info, and social housing forms.",
    icon: "fas fa-home",
    image: "/images/housing_support.png",
    link: "/programs#housing-support",
  },
  {
    id: "employment-resume",
    title: "Employment & Resume Support",
    category: "Career Services",
    description: "One-on-one employment counselling, resume writing clinics, cover letter reviews, and mock interview practice.",
    icon: "fas fa-briefcase",
    image: "/images/employment_support.png",
    link: "/programs#employment-resume",
  },
  {
    id: "community-engagement",
    title: "Community Engagement",
    category: "Advocacy",
    description: "Organizing clean-up days, Scarborough block parties, community asset mapping, and positive civic participation projects.",
    icon: "fas fa-bullhorn",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
    link: "/programs#community-engagement",
  },
  {
    id: "community-advocacy",
    title: "Community Advocacy",
    category: "Advocacy",
    description: "Empowering Scarborough residents to advocate for transit equity, tenant rights, local jobs, and neighborhood resources.",
    icon: "fas fa-users",
    image: "/images/community_advocacy.png",
    link: "/programs#community-advocacy",
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "westhill-day",
    title: "West Hill Day: Celebrating Community Together",
    day: "20",
    month: "JUN",
    date: "2026-06-20",
    time: "11:00 AM - 5:00 PM",
    location: "Morningside Park",
    category: "Community Events",
    description: "Our signature annual celebration featuring local vendor booths, children's zone, cultural dances, live music, and local support services.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "job-fair",
    title: "Community Job Fair & Networking",
    day: "22",
    month: "JUN",
    date: "2026-06-22",
    time: "10:00 AM - 3:00 PM",
    location: "Main Gymnasium",
    category: "Career Services",
    description: "Meet hiring managers from local Scarborough businesses in hospitality, customer support, warehousing, and retail sectors.",
    image: "https://images.unsplash.com/photo-1521791136368-1a8df3d95b35?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "youth-leadership",
    title: "Youth Development & Leadership Workshop",
    day: "12",
    month: "JUN",
    date: "2026-06-12",
    time: "4:00 PM - 6:00 PM",
    location: "Community Activity Room",
    category: "Youth Services",
    description: "Interactive session focusing on communication skills, community project planning, and collaborative teamwork for youth.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "community-bbq",
    title: "Welcome Neighborhood Summer BBQ",
    day: "15",
    month: "JUN",
    date: "2026-06-15",
    time: "12:00 PM - 4:00 PM",
    location: "Central Courtyard",
    category: "Community Events",
    description: "Meet your neighbors and learn about our upcoming summer programs. Free burgers, halal options, and games for kids.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "volunteer-orientation",
    title: "Volunteer Orientation & Information Session",
    day: "08",
    month: "JUN",
    date: "2026-06-08",
    time: "6:00 PM - 7:30 PM",
    location: "Community Room B",
    category: "Meetings",
    description: "Find out how you can support our upcoming programs and events. Learn about open roles, safety checks, and guidelines.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote: "West Hill Community Centre gave my son a safe and positive space to study after school. The mentors at the Centre inspired him to pursue computer science in college.",
    author: "Amara O.",
    role: "Local Parent",
    program: "Youth Development & Leadership",
  },
  {
    id: "2",
    quote: "The weekly seniors tea and digital literacy circles helped me reconnect with the community. I feel less isolated and made genuine lifelong friends right here in Scarborough.",
    author: "Grace M.",
    role: "Senior Resident",
    program: "Seniors Wellness Club",
  },
  {
    id: "3",
    quote: "When we relocated to West Hill, navigating social programs and finding child services felt overwhelming. The staff walked us through every single form with dignity and empathy.",
    author: "Tariq & Fatima K.",
    role: "Community Members",
    program: "Family Settlement Support",
  },
];

export const DONATION_IMPACTS: Record<number, string> = {
  25: "Provides bus tokens and study snack packs for youth attending youth development programs.",
  50: "Funds a hot, nutritious lunch and social outing for seniors at our center.",
  100: "Provides a private housing counseling session for a family facing emergency relocation.",
  250: "Funds a complete 4-week employment workshop series for a neighborhood resident.",
};

export const GALLERY_MEDIA: GalleryMediaItem[] = [
  {
    type: "video",
    src: "/assets/images/westhillcenterOpening/WhatsApp Video 2026-06-09 at 11.10.50 PM.mp4",
    title: "Grand Opening Ceremony Video Highlight",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/Ribbon Cutting.jpeg",
    title: "Grand Opening Ceremony 2026 - Ribbon Cutting",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/Coach Rejoice.jpeg",
    title: "Grand Opening Ceremony 2026 - Coach Rejoice",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/Donna Cardoza From Toronto District School Board giving a Speech.jpeg",
    title: "Grand Opening Ceremony 2026 - TDSB Speech",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/President of West Hill giving a speech.jpeg",
    title: "Grand Opening Ceremony 2026 - President Speech",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/43 Division police giving a Speech.jpeg",
    title: "Grand Opening Ceremony 2026 - 43 Division Speech",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM.jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (1).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (2).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (3).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (4).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (5).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (6).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (7).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (8).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (9).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.48 PM (10).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM.jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (1).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (2).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (4).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (5).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (6).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (7).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (8).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.49 PM (9).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM.jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (1).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (2).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (4).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (5).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (6).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.50 PM (7).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM.jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (1).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (3).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (4).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (5).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (6).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (7).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
  {
    type: "image",
    src: "/assets/images/westhillcenterOpening/WhatsApp Image 2026-06-09 at 11.10.51 PM (8).jpeg",
    title: "Grand Opening Ceremony 2026",
  },
];
