/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { OemOdm } from "@/pages/OemOdm";
import { ChinaSourcing } from "@/pages/ChinaSourcing";
import { PurchasingLogistics } from "@/pages/PurchasingLogistics";
import { Portfolio } from "@/pages/Portfolio";
import { SourcingTour } from "@/pages/SourcingTour";
import { FAQ } from "@/pages/FAQ";
import { Contact } from "@/pages/Contact";
import { AdminLogin } from "@/pages/admin/Login";
import { AdminLeads } from "@/pages/admin/Leads";
import { AdminContent } from "@/pages/admin/content/AdminContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Navigate to="/services/oem" replace /> },
      { path: "services/oem", element: <OemOdm /> },
      { path: "services/sourcing", element: <ChinaSourcing /> },
      { path: "services/purchasing", element: <PurchasingLogistics /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "sourcing-tour", element: <SourcingTour /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: <AdminRouteGuard />,
    children: [
      { index: true, element: <Navigate to="leads" replace /> },
      {
        path: "leads",
        element: (
          <AdminLayout>
            <AdminLeads />
          </AdminLayout>
        ),
      },
      {
        path: "content",
        element: (
          <AdminLayout>
            <AdminContent />
          </AdminLayout>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
