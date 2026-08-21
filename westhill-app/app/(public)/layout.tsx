import AnnouncementBannerServer from "@/components/AnnouncementBannerServer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBannerServer />
      <Header />
      <main id="main-content">{children}</main>
      <NewsletterSignup />
      <Footer />
    </>
  );
}
