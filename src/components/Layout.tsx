import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsInIframe } from "@/hooks/useIsInIframe";
import IframeNavbar from "./IframeNavbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const isInIframe = useIsInIframe();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // Layout com navegação compacta quando em iframe
  if (isInIframe) {
    return (
      <div className="min-h-[100dvh] w-full bg-background iframe-mode">
        <IframeNavbar />
        <main className="w-full h-full pt-12 p-2 sm:p-4 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      {/* Fixed Navigation Buttons - Top Left (Desktop) */}
      <div className="fixed top-4 left-80 z-40 flex gap-2 lg:flex hidden">
        <Button 
          onClick={handleGoBack}
          variant="outline" 
          size="sm" 
          className="bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200 font-medium shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm">Voltar</span>
        </Button>
        <Button 
          onClick={handleGoHome}
          variant="outline" 
          size="sm" 
          className="bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200 font-medium shadow-sm"
        >
          <House className="h-4 w-4 mr-2" />
          <span className="text-sm">Início</span>
        </Button>
      </div>

      {/* Mobile Navigation Buttons - Top Right */}
      <div className="fixed top-4 right-4 z-40 flex gap-2 lg:hidden">
        <Button 
          onClick={handleGoBack}
          variant="outline" 
          size="icon"
          className="h-10 w-10 bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200 shadow-sm rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button 
          onClick={handleGoHome}
          variant="outline" 
          size="icon"
          className="h-10 w-10 bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors duration-200 shadow-sm rounded-full"
        >
          <House className="h-5 w-5" />
        </Button>
      </div>

      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-auto lg:ml-0">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
