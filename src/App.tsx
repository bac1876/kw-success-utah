import { Navigate, Routes, Route } from "react-router-dom";
import { activeBrokerage } from "@/brokerages";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Agents from "@/pages/Agents";
import Clients from "@/pages/Clients";
import About from "@/pages/About";
import AreasServed from "@/pages/AreasServed";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import LegalPage from "@/pages/LegalPage";
import KwOffices from "@/pages/Network";
import Office from "@/pages/Office";
import HomeServices from "@/pages/HomeServices";

export default function App() {
  const { flags } = activeBrokerage;

  return (
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
        <Route path="login" element={<Navigate to="/login/agent" replace />} />
        <Route path="login/:kind" element={<Login />} />
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
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
