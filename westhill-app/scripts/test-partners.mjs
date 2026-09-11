import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPublishedPartners() {
  return await prisma.partner.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

async function runControlledPartnersLifecycleTest() {
  console.log("=== STEP 9: CONTROLLED PARTNERS CRUD & LIFECYCLE SYNC TEST ===\n");

  const initialCount = await prisma.partner.count();
  console.log(`Initial Partner count in Neon: ${initialCount}`);
  if (initialCount !== 6) {
    throw new Error(`Expected exactly 6 initial records, found ${initialCount}`);
  }

  // 1. Create a temporary published Partner
  console.log("1. Creating temporary published Partner...");
  const tempPartner = await prisma.partner.create({
    data: {
      name: "TEMP PARTNER TEST - SCARBOROUGH ROTARY CLUB",
      description: "Temporary partner description for live synchronization verification.",
      logoUrl: "/images/partners/temp-rotary.png",
      websiteUrl: "https://rotaryscarborough.org",
      tier: "Community Builder",
      category: "Civic",
      displayOrder: 99,
      isFeatured: true,
      isPublished: true,
    },
  });
  console.log(`   ✅ Created temp partner ID: ${tempPartner.id}`);

  // 2. Confirm it exists in Neon
  console.log("2. Confirming temp partner exists in Neon...");
  const inNeon = await prisma.partner.findUnique({ where: { id: tempPartner.id } });
  if (!inNeon || inNeon.name !== "TEMP PARTNER TEST - SCARBOROUGH ROTARY CLUB") {
    throw new Error("Failed to confirm temp partner in Neon database.");
  }
  console.log(`   ✅ Confirmed partner in Neon: ${inNeon.name}`);

  // 3. Confirm public query sees it
  console.log("3. Confirming public Partners query sees the item...");
  let pubItems = await getPublishedPartners();
  const seenStep3 = pubItems.find((p) => p.id === tempPartner.id);
  if (!seenStep3) {
    throw new Error("Public query did not return the new published partner.");
  }
  console.log(`   ✅ Public query returned partner: "${seenStep3.name}" (Total public items: ${pubItems.length})`);

  // 4. Update name and description
  console.log("4. Updating name and description in Neon...");
  const updatedInNeon = await prisma.partner.update({
    where: { id: tempPartner.id },
    data: {
      name: "TEMP PARTNER TEST - UPDATED ROTARY FOUNDATION",
      description: "Updated partnership description for 2026 civic leadership initiatives.",
    },
  });
  console.log(`   ✅ Partner updated in database: "${updatedInNeon.name}"`);

  // 5. Confirm updated data is returned publicly
  console.log("5. Confirming updated data is reflected publicly...");
  pubItems = await getPublishedPartners();
  const seenStep5 = pubItems.find((p) => p.id === tempPartner.id);
  if (!seenStep5 || seenStep5.name !== "TEMP PARTNER TEST - UPDATED ROTARY FOUNDATION") {
    throw new Error("Public query did not reflect the updated partner name.");
  }
  console.log(`   ✅ Public query reflects updated partner name: "${seenStep5.name}"`);

  // 6. Change display order to top position
  console.log("6. Changing display order to -1 (top position)...");
  await prisma.partner.update({
    where: { id: tempPartner.id },
    data: { displayOrder: -1 },
  });
  console.log("   ✅ Display order updated in database.");

  // 7. Confirm ordering is respected
  console.log("7. Confirming ordering is respected in public query...");
  pubItems = await getPublishedPartners();
  if (pubItems[0]?.id !== tempPartner.id) {
    throw new Error(`Expected temp partner to be first with displayOrder -1, but got ${pubItems[0]?.name}`);
  }
  console.log(`   ✅ Confirmed partner is first in public query list: "${pubItems[0].name}"`);

  // 8. Unpublish it
  console.log("8. Unpublishing partner (setting isPublished = false)...");
  await prisma.partner.update({
    where: { id: tempPartner.id },
    data: { isPublished: false },
  });
  console.log("   ✅ Partner unpublished in Neon.");

  // 9. Confirm it is excluded from public query
  console.log("9. Confirming unpublished partner is excluded from public query...");
  pubItems = await getPublishedPartners();
  const seenStep9 = pubItems.find((p) => p.id === tempPartner.id);
  if (seenStep9) {
    throw new Error("Public query should not include an unpublished partner!");
  }
  console.log(`   ✅ Partner successfully excluded from public query (Total public items: ${pubItems.length})`);

  // 10. Publish it again
  console.log("10. Republishing partner (setting isPublished = true)...");
  await prisma.partner.update({
    where: { id: tempPartner.id },
    data: { isPublished: true },
  });
  console.log("   ✅ Partner republished in Neon.");

  // 11. Confirm it returns publicly
  console.log("11. Confirming partner returns in public query...");
  pubItems = await getPublishedPartners();
  const seenStep11 = pubItems.find((p) => p.id === tempPartner.id);
  if (!seenStep11) {
    throw new Error("Public query failed to return republished partner.");
  }
  console.log(`   ✅ Partner reappeared in public query: "${seenStep11.name}"`);

  // 12. Delete it
  console.log("12. Deleting temp partner...");
  await prisma.partner.delete({ where: { id: tempPartner.id } });
  console.log("   ✅ Deleted temp partner from Neon.");

  // 13. Confirm it is gone
  console.log("13. Confirming temp partner is gone from database...");
  const afterDelete = await prisma.partner.findUnique({ where: { id: tempPartner.id } });
  if (afterDelete !== null) {
    throw new Error("Temp partner still exists after deletion!");
  }
  console.log("   ✅ Verified temp partner no longer exists in database.");

  // 14. Confirm Neon returns to exactly 6 legitimate records
  console.log("14. Confirming Neon returns to exactly 6 legitimate Partner records...");
  const finalCount = await prisma.partner.count();
  if (finalCount !== 6) {
    throw new Error(`Expected exactly 6 records in Neon, but found ${finalCount}`);
  }
  console.log(`   ✅ Final count verified: exactly ${finalCount} legitimate records remain.`);

  console.log("\n=== ALL 14 CONTROLLED PARTNER TESTS PASSED SUCCESSFULLY ===");
}

runControlledPartnersLifecycleTest()
  .catch((e) => {
    console.error("❌ Test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
