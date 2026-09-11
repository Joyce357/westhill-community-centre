import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPublishedResources() {
  return await prisma.resourceItem.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

async function runControlledPublicSyncTest() {
  console.log("=== STEP 2: CONTROLLED PUBLIC-SYNC & RESOURCE LIFECYCLE TEST ===\n");

  const initialCount = await prisma.resourceItem.count();
  console.log(`Initial Resource count in Neon: ${initialCount}`);
  if (initialCount !== 8) {
    throw new Error(`Expected exactly 8 initial records, found ${initialCount}`);
  }

  // 1. Create a temporary published Resource
  console.log("1. Creating temporary published Resource...");
  const tempResource = await prisma.resourceItem.create({
    data: {
      title: "TEMP SYNC TEST - EMERGENCY RESPONSE PACKET",
      description: "Temporary test description for live synchronization verification.",
      resourceType: "DOCUMENT",
      url: "/assets/documents/temp-emergency-guide.pdf",
      fileSize: "PDF | 120 KB",
      category: "Downloads",
      icon: "fas fa-file-pdf",
      displayOrder: 99,
      isPublished: true,
    },
  });
  console.log(`   ✅ Created temp item ID: ${tempResource.id}`);

  // 2. Confirm it exists in Neon
  console.log("2. Confirming temp item exists in Neon...");
  const inNeon = await prisma.resourceItem.findUnique({ where: { id: tempResource.id } });
  if (!inNeon || inNeon.title !== "TEMP SYNC TEST - EMERGENCY RESPONSE PACKET") {
    throw new Error("Failed to confirm temp item in Neon database.");
  }
  console.log(`   ✅ Confirmed item in Neon: ${inNeon.title}`);

  // 3. Confirm public Resources data can see it
  console.log("3. Confirming public Resources query sees the item...");
  let pubItems = await getPublishedResources();
  const seenStep3 = pubItems.find((r) => r.id === tempResource.id);
  if (!seenStep3) {
    throw new Error("Public query did not return the new published item.");
  }
  console.log(`   ✅ Public query returned item: "${seenStep3.title}" (Total public items: ${pubItems.length})`);

  // 4. Change its title
  console.log("4. Updating title in Neon...");
  const updatedInNeon = await prisma.resourceItem.update({
    where: { id: tempResource.id },
    data: { title: "TEMP SYNC TEST - UPDATED TITLE 2026" },
  });
  console.log(`   ✅ Title updated in database: "${updatedInNeon.title}"`);

  // 5. Confirm updated title becomes available publicly
  console.log("5. Confirming updated title is returned publicly...");
  pubItems = await getPublishedResources();
  const seenStep5 = pubItems.find((r) => r.id === tempResource.id);
  if (!seenStep5 || seenStep5.title !== "TEMP SYNC TEST - UPDATED TITLE 2026") {
    throw new Error("Public query did not reflect the updated title.");
  }
  console.log(`   ✅ Public query reflects updated title: "${seenStep5.title}"`);

  // 6. Unpublish it
  console.log("6. Unpublishing resource (setting isPublished = false)...");
  await prisma.resourceItem.update({
    where: { id: tempResource.id },
    data: { isPublished: false },
  });
  console.log("   ✅ Item unpublished in Neon.");

  // 7. Confirm it is excluded from public query
  console.log("7. Confirming unpublished item is excluded from public query...");
  pubItems = await getPublishedResources();
  const seenStep7 = pubItems.find((r) => r.id === tempResource.id);
  if (seenStep7) {
    throw new Error("Public query should not include an unpublished item!");
  }
  console.log(`   ✅ Item successfully excluded from public query (Total public items: ${pubItems.length})`);

  // 8. Publish it again
  console.log("8. Republishing resource (setting isPublished = true)...");
  await prisma.resourceItem.update({
    where: { id: tempResource.id },
    data: { isPublished: true },
  });
  console.log("   ✅ Item republished in Neon.");

  // 9. Confirm it returns publicly
  console.log("9. Confirming item returns in public query...");
  pubItems = await getPublishedResources();
  const seenStep9 = pubItems.find((r) => r.id === tempResource.id);
  if (!seenStep9) {
    throw new Error("Public query failed to return republished item.");
  }
  console.log(`   ✅ Item reappeared in public query: "${seenStep9.title}"`);

  // 10. Change its display order
  console.log("10. Changing display order to -1 (top position)...");
  await prisma.resourceItem.update({
    where: { id: tempResource.id },
    data: { displayOrder: -1 },
  });
  console.log("   ✅ Display order updated in database.");

  // 11. Confirm ordering is respected
  console.log("11. Confirming ordering is respected in public query...");
  pubItems = await getPublishedResources();
  if (pubItems[0]?.id !== tempResource.id) {
    throw new Error(`Expected temp item to be first with displayOrder -1, but got ${pubItems[0]?.title}`);
  }
  console.log(`   ✅ Confirmed item is first in public query list: "${pubItems[0].title}"`);

  // 12. Delete it
  console.log("12. Deleting temp resource item...");
  await prisma.resourceItem.delete({ where: { id: tempResource.id } });
  console.log("   ✅ Deleted temp item from Neon.");

  // 13. Confirm it is gone and Neon returns to exactly 8 legitimate records
  console.log("13. Confirming temp item is gone and Neon returns to exactly 8 legitimate records...");
  const afterDelete = await prisma.resourceItem.findUnique({ where: { id: tempResource.id } });
  if (afterDelete !== null) {
    throw new Error("Temp item still exists after deletion!");
  }
  const finalCount = await prisma.resourceItem.count();
  if (finalCount !== 8) {
    throw new Error(`Expected exactly 8 records in Neon, but found ${finalCount}`);
  }
  console.log(`   ✅ Final count verified: exactly ${finalCount} legitimate records remain.`);

  console.log("\n=== ALL 13 CONTROLLED PUBLIC-SYNC & ORDERING TESTS PASSED SUCCESSFULLY ===");
}

runControlledPublicSyncTest()
  .catch((e) => {
    console.error("❌ Test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());


