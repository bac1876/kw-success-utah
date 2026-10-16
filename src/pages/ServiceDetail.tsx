import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import SplitChars from "@/components/motion/SplitChars";
import BlurUp from "@/components/motion/BlurUp";
import DuskCard from "@/components/motion/DuskCard";
import Magnetic from "@/components/motion/Magnetic";
import { HEADER_H } from "@/components/Navbar";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICE_IMAGES: Record<string, string> = {
  mortgage: "/service-mortgage.jpg",
  title: "/service-title.jpg",
  insurance: "/service-insurance.jpg",
};

export default function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { partners, flags, contact } = activeBrokerage;

  if (slug === "insurance" && !flags.showInsurancePartner) {
    return <Navigate to="/" replace />;
  }

  if (slug !== "mortgage" && slug !== "title" && slug !== "insurance") {
    return <Navigate to="/" replace />;
  }

  const partner = partners[slug];
  const serviceImg = SERVICE_IMAGES[slug] ?? "/service-title.jpg";

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[48vh] flex-col items-center justify-center overflow-hidden bg-ink"
        style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
      >
        <div className="absolute inset-0">
          <img
            src={serviceImg}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="overlay-hero absolute inset-0" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">{partner.roleLabel}</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>

          <h1 className="type-display-lg mt-8 text-ivory">
            <SplitChars text={partner.companyName} delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="type-serif-accent mt-6 max-w-2xl text-stone-dark"
          >
            {partner.heroHeadline}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-monogram grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: Logo + Story + Highlights */}
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Part of Our Family of Companies
                </span>
              </div>
            </Reveal>

            <h2 className="type-display-md mt-5 text-ink">
              <SplitWords text="Part of One Relationship." />
            </h2>

            <Reveal delay={0.1}>
              <div className="mt-8 inline-flex items-center border hairline-light bg-white p-6">
                <img
                  src={partner.logo}
                  alt={`${partner.companyName} logo`}
                  className="h-14 w-auto max-w-[240px] object-contain"
                />
              </div>
            </Reveal>

            {partner.isPlaceholderCopy && (
              <div className="mt-5">
                <SampleChip label="PLACEHOLDER: Final Partner Copy Pending" />
              </div>
            )}

            <Reveal delay={0.15}>
              <p className="type-body mt-6 text-stone">{partner.introCopy}</p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="type-body-sm mt-6 flex items-center gap-2 text-ink/70">
                <MapPin className="h-4 w-4 text-copper" strokeWidth={1.5} />
                Serving Weber, Davis &amp; Morgan Counties ·{" "}
                {contact.cityStateZip}
              </p>
            </Reveal>

            <div className="mt-8">
              {partner.highlights.map((item, i) => (
                <Reveal key={item} delay={0.1 + 0.08 * i} y={16}>
                  <div className="flex items-center gap-4 border-t py-4 last:border-b hairline-light">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-copper"
                      strokeWidth={1.5}
                    />
                    <span className="type-body-sm text-ink/80">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Why It Matters at the Table */}
            <Reveal delay={0.3} y={24}>
              <div className="mt-10 border hairline-light bg-white p-8 md:p-10">
                <p className="type-label text-copper">
                  {partner.whyItMattersHeadline}
                </p>
                <h3 className="mt-4 font-serif text-[1.6rem] italic leading-snug text-ink">
                  Everyone at One Table.
                </h3>
                <p className="type-body-sm mt-3 text-stone">
                  {partner.whyItMattersBody}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: BlurUp DuskCard Image + Main Contact Card + Affiliated Disclosure */}
          <div className="flex flex-col gap-8 lg:pt-12">
            <BlurUp className="mb-2">
              <div className="aspect-[3/2] overflow-hidden border hairline-light">
                <DuskCard src={serviceImg} alt={partner.companyName} />
              </div>
            </BlurUp>

            <Reveal delay={0.3} y={30}>
              <div className="bg-ink p-8 md:p-10">
                <p className="type-label flex items-center gap-2 text-copper">
                  Main Contact <SampleChip label="Sample" />
                </p>
                <a
                  href={`mailto:${contact.generalEmail}`}
                  className="mt-5 flex items-center gap-2 text-[0.9rem] font-light text-ivory/85 transition-colors hover:text-copper"
                >
                  <Mail className="h-4 w-4 text-copper" strokeWidth={1.5} />
                  {contact.generalEmail}
                </a>
                <p className="type-body-sm mt-3 text-stone-dark">
                  Connect with {partner.companyName} alongside your KW Success
                  advisor.
                </p>
                <Magnetic className="mt-7 inline-block">
                  <Link
                    to={`/contact/${slug}`}
                    className="btn-sweep inline-block rounded-full border border-copper px-7 py-3 text-[0.74rem] font-medium uppercase tracking-[0.24em] text-copper transition-colors duration-300 hover:text-ink"
                  >
                    Contact Us →
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            {/* §10 Full Affiliated Business Disclosure in capitals [SHAWN REVIEW] */}
            {partner.affiliated && (
              <Reveal delay={0.35} y={24}>
                <AffiliatedDisclosure tone="light" showFullLegal />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="border-t bg-ink py-24 hairline-dark md:py-32">
        <div className="container-monogram flex flex-col items-center text-center">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-px w-24 origin-left bg-copper"
          />
          <h2 className="type-display-md mt-8 max-w-3xl text-ivory">
            <SplitWords text="One Conversation Opens Every Door." />
          </h2>
          <Reveal delay={0.2}>
            <Link
              to={`/contact/${slug}`}
              className="mt-10 inline-block rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
