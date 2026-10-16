import { Link, useParams } from "react-router-dom";

function Stub({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <section className="bg-ink">
      <div className="container-monogram flex min-h-[60vh] flex-col items-center justify-center py-28 text-center">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">{eyebrow}</span>
          <span className="h-px w-10 bg-copper" />
        </div>
        <h1 className="type-display-lg mt-6 text-ivory">{title}</h1>
        <p className="type-body mt-6 max-w-md text-stone-dark">{note}</p>
        <Link
          to="/"
          className="btn-sweep mt-10 inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}

export function BuyStub() {
  return (
    <Stub
      eyebrow="Find Your Home"
      title="Every Search Begins With a Relationship."
      note="The full IDX-style search experience is being crafted here."
    />
  );
}

export function SellStub() {
  return (
    <Stub
      eyebrow="Sell With Us"
      title="Your Home Has a Story."
      note="The seller journey — valuation, process, and proof — is on its way."
    />
  );
}

export function ListingStub() {
  const { slug } = useParams();
  return (
    <Stub
      eyebrow="Residence"
      title={slug ? slug.replace(/-/g, " ") : "Listing"}
      note="The full property story, gallery, and tour scheduling live here soon."
    />
  );
}

export function AboutStub() {
  return (
    <Stub
      eyebrow="Our Story"
      title="The Mark of the Relationship."
      note="The Monogram brand story and leadership are being composed here."
    />
  );
}

export function NetworkStub() {
  return (
    <Stub
      eyebrow="The Monogram Network"
      title="One Relationship. Four Market Centers."
      note="Brokerage profiles and agent resources arrive here shortly."
    />
  );
}

export function ServicesStub() {
  return (
    <Stub
      eyebrow="Connected Homeownership"
      title="Every Step of the Life of the Home."
      note="Summit Title, Prairie Home & Auto, and Mutual of Omaha Mortgage — details coming soon."
    />
  );
}

export function ContactStub() {
  return (
    <Stub
      eyebrow="Start the Conversation"
      title="We'd Love to Hear From You."
      note="The contact experience and office details are being prepared."
    />
  );
}
