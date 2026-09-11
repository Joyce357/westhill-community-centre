/**
 * audit-db-readonly.mjs
 * Safe, read-only script to audit the database connection, applied migrations,
 * table row counts, and schema models without modifying any records or exposing secrets.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== NEON DATABASE AUDIT (READ ONLY) ===\n");

  // 1. Connection check
  console.log("1. TESTING DATABASE CONNECTION...");
  await prisma.$connect();
  console.log("   ✅ Connection to live database succeeded.\n");

  // 2. Query applied migrations table
  console.log("2. CHECKING MIGRATIONS IN DATABASE...");
  try {
    const migrations = await prisma.$queryRaw`
      SELECT migration_name, finished_at, applied_steps_count 
      FROM _prisma_migrations 
      ORDER BY finished_at ASC;
    `;
    console.log("   Applied migrations in DB:", JSON.stringify(migrations, null, 2));
  } catch (err) {
    console.log("   Could not query _prisma_migrations:", err.message);
  }
  console.log();

  // 3. Count records in all models
  console.log("3. RECORD COUNTS IN ALL TABLES...");
  const counts = {
    users: await prisma.user.count(),
    siteSettings: await prisma.siteSettings.count(),
    announcements: await prisma.announcement.count(),
    programCategories: await prisma.programCategory.count(),
    programs: await prisma.program.count(),
    events: await prisma.event.count(),
    galleryItems: await prisma.galleryItem.count(),
    resourceItems: await prisma.resourceItem.count(),
    partners: await prisma.partner.count(),
    contactSubmissions: await prisma.contactSubmission.count(),
    volunteerApplications: await prisma.volunteerApplication.count(),
    programInquiries: await prisma.programInquiry.count(),
    partnershipInquiries: await prisma.partnershipInquiry.count(),
    newsletterSubscriptions: await prisma.newsletterSubscription.count(),
    eventRsvps: await prisma.eventRsvp.count(),
  };
  console.log(JSON.stringify(counts, null, 2));
  console.log();

  // 4. Admin User check (do NOT print hash)
  console.log("4. CHECKING ADMIN USER...");
  const adminUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });
  console.log("   Admin users found (no secrets shown):", JSON.stringify(adminUsers, null, 2));
  console.log();

  // 5. Check Content Records
  console.log("5. CONTENT SUMMARY...");
  const activeAnnouncements = await prisma.announcement.findMany({
    select: { id: true, message: true, isActive: true, startsAt: true, expiresAt: true }
  });
  console.log("   Active announcements:", JSON.stringify(activeAnnouncements, null, 2));

  const samplePrograms = await prisma.program.findMany({
    select: { id: true, title: true, slug: true, isPublished: true, isFeatured: true },
    take: 5
  });
  console.log("   Sample programs (first 5):", JSON.stringify(samplePrograms, null, 2));

  const sampleEvents = await prisma.event.findMany({
    select: { id: true, title: true, slug: true, eventDate: true, isPublished: true },
    take: 5
  });
  console.log("   Sample events (first 5):", JSON.stringify(sampleEvents, null, 2));

  const samplePartners = await prisma.partner.findMany({
    select: { id: true, name: true, tier: true, category: true, isPublished: true },
    take: 5
  });
  console.log("   Sample partners (first 5):", JSON.stringify(samplePartners, null, 2));

  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
    select: { id: true, organizationName: true, primaryEmail: true, phone: true, city: true }
  });
  console.log("   Site settings singleton:", JSON.stringify(siteSettings, null, 2));
  console.log();

  console.log("=== AUDIT COMPLETE ===");
}

main()
  .catch((e) => {
    console.error("Database audit failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
