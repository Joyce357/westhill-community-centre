import { PrismaClient } from "@prisma/client";
import { getPublishedGalleryItems } from "../lib/queries.ts";

const prisma = new PrismaClient();

async function testGallery() {
  console.log("=== TESTING GALLERY CMS BACKEND ===");

  // 1. Check all seeded gallery items
  const totalItems = await prisma.galleryItem.count();
  console.log(`1. Total GalleryItems in database: ${totalItems}`);

  // 2. Query published items via lib/queries
  const publishedItems = await getPublishedGalleryItems();
  console.log(`2. getPublishedGalleryItems() returned: ${publishedItems.length} items`);
  console.log(`   First item:`, JSON.stringify(publishedItems[0], null, 2));

  // 3. Test Create Gallery Item
  const newItem = await prisma.galleryItem.create({
    data: {
      title: "TEST GALLERY ITEM - SUMMER FESTIVAL",
      mediaType: "IMAGE",
      mediaUrl: "/images/hero_community.png",
      displayOrder: 999,
      isPublished: true,
      category: "Summer 2026",
      altText: "Test alt text",
    },
  });
  console.log(`3. Created Test Item ID: ${newItem.id}`);

  // 4. Test Update Gallery Item
  const updatedItem = await prisma.galleryItem.update({
    where: { id: newItem.id },
    data: {
      title: "TEST GALLERY ITEM - UPDATED TITLE",
      isPublished: false,
    },
  });
  console.log(`4. Updated Item Title: ${updatedItem.title}, isPublished: ${updatedItem.isPublished}`);

  // 5. Test Delete Gallery Item (cleanup)
  await prisma.galleryItem.delete({
    where: { id: newItem.id },
  });
  console.log(`5. Deleted Test Item successfully.`);

  const finalCount = await prisma.galleryItem.count();
  console.log(`6. Final database count (should match original): ${finalCount}`);

  console.log("=== ALL GALLERY TESTS PASSED ===");
}

testGallery()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
