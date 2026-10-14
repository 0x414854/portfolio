import styles from "./page.module.css";

// import StarBackground from "../components/starBackground";
import Hero from "./components/website/hero";
import ProblemSection from "./components/website/customerIssues";
import ServicesSection from "./components/website/services";
import MainOfferSection from "./components/website/mainOffer";
import MaintenanceSection from "./components/website/maintenance";
import ClientsBanner from "./components/banner/client_banner";
import FAQ from "./components/website/faq";
import Testimonials from "@/app/[locale]/components/website/reviews";
import WhyMeSection from "./components/website/whyMe";
import FinalCTA from "./components/website/cta";
import WhyDeveloperSection from "./components/website/whyDeveloper";
import ProcessSection from "./components/website/process";
import { useTranslations } from "next-intl";

// Ajuster ecart (margin) entre chaque composant => tous le meme (4rem??)

export default function Test() {
  const t = useTranslations("Homepage.FAQ");
  const faq = [
    {
      question: t("question_1"),
      answer: t.rich("answer_1", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_2"),
      answer: t.rich("answer_2", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_3"),
      answer: t.rich("answer_3", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_4"),
      answer: t.rich("answer_4", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_5"),
      answer: t.rich("answer_5", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_6"),
      answer: t.rich("answer_6", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_7"),
      answer: t.rich("answer_7", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_8"),
      answer: t.rich("answer_8", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_9"),
      answer: t.rich("answer_9", {
        br: () => <br />,
      }),
    },
    {
      question: t("question_10"),
      answer: t.rich("answer_10", {
        br: () => <br />,
      }),
    },
  ];
  return (
    <section className={styles.testSection}>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <WhyDeveloperSection />
      <ProcessSection />
      <MainOfferSection />
      <WhyMeSection />
      <MaintenanceSection />
      <ClientsBanner />
      <Testimonials />
      <FAQ title={`Questions fréquentes`} items={faq} />
      <FinalCTA />
    </section>
  );
}
