import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IframeMenu from "./IframeMenu";

const IframeNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-11 bg-card/95 backdrop-blur-sm border-b border-border z-50 flex items-center px-2 gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleGoHome}
        >
          <House className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 text-center">
          <span className="text-sm font-semibold text-foreground">FMG Hub</span>
        </div>
        
        <div className="w-24" />
      </nav>
      
      <IframeMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
};

export default IframeNavbar;
