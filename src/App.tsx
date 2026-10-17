import { lazy, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { activeBrokerage } from "@/brokerages";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

// Every route except Home is loaded on demand so the first paint only ships
// the homepage. Vite emits one chunk per lazy page.
const Agents = lazy(() => import("@/pages/Agents"));
const Clients = lazy(() => import("@/pages/Clients"));
const About = lazy(() => import("@/pages/About"));
const AreasServed = lazy(() => import("@/pages/AreasServed"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const KwOffices = lazy(() => import("@/pages/Network"));
const Office = lazy(() => import("@/pages/Office"));
const HomeServices = lazy(() => import("@/pages/HomeServices"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Dark placeholder that matches the page shell so chunk loads never flash white. */
function RouteFallback() {
  return <div className="min-h-[60vh] bg-ink-deep" aria-busy="true" />;
}

export default function App() {
  const { flags } = activeBrokerage;

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agents" element={<Agents />} />
          <Route path="clients" element={<Clients />} />
          <Route path="about" element={<About />} />
          <Route path="areas-served" element={<AreasServed />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact/:service" element={<Contact />} />
          {flags.showAgentPortalDemo && (
            <>
              <Route
                path="login"
                element={<Navigate to="/login/agent" replace />}
              />
              <Route path="login/:kind" element={<Login />} />
            </>
          )}
          <Route
            path="affiliated-business-disclosure"
            element={<LegalPage type="disclosure" />}
          />
          <Route path="privacy" element={<LegalPage type="privacy" />} />
          <Route path="terms" element={<LegalPage type="terms" />} />
          <Route
            path="accessibility"
            element={<LegalPage type="accessibility" />}
          />

          {/* Template routes kept behind brokerage feature flags (§4) */}
          {flags.showOffices && (
            <>
              <Route path="offices" element={<KwOffices />} />
              <Route path="offices/:slug" element={<Office />} />
            </>
          )}
          {flags.showHomeServices && (
            <Route path="home-services" element={<HomeServices />} />
          )}

          {/* Legacy Monogram route redirects for KW Success */}
          <Route path="join" element={<Navigate to="/agents" replace />} />
          <Route path="careers" element={<Navigate to="/agents" replace />} />
          <Route path="buy" element={<Navigate to="/clients" replace />} />
          <Route path="sell" element={<Navigate to="/clients" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
