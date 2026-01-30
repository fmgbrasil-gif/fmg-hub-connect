import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AcessoComum from "./pages/AcessoComum";
import AcessoGestao from "./pages/AcessoGestao";
import BaseConhecimento from "./pages/BaseConhecimento";
import CentralSolucoes from "./pages/CentralSolucoes";
import Legalizacao from "./pages/Legalizacao";
import Pessoal from "./pages/Pessoal";
import Contabil from "./pages/Contabil";
import Fiscal from "./pages/Fiscal";
import Onboarding from "./pages/Onboarding";
import Processos from "./pages/Processos";
import Dashboards from "./pages/Dashboards";
import Admin from "./pages/Admin";
import SolucoesExclusivas from "./pages/SolucoesExclusivas";
import Favoritos from "./pages/Favoritos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/legalizacao"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Legalizacao />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pessoal"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Pessoal />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contabil"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Contabil />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/fiscal"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Fiscal />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Onboarding />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/processos"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Processos />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/acesso-comum"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AcessoComum />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/acesso-gestao"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Layout>
                    <AcessoGestao />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/base-conhecimento"
              element={
                <ProtectedRoute>
                  <Layout>
                    <BaseConhecimento />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/central-solucoes"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CentralSolucoes />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboards"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Layout>
                    <Dashboards />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Layout>
                    <Admin />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/solucoes-exclusivas"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SolucoesExclusivas />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favoritos"
              element={
                <ProtectedRoute>
                  <Favoritos />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
