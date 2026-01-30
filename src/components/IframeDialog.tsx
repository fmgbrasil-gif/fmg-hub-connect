import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface IframeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
}

const IframeDialog = ({ open, onOpenChange, url, title }: IframeDialogProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Auto-fullscreen em mobile
  const effectiveFullscreen = isMobile || isFullscreen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsLoading(true);
      setIsFullscreen(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={cn(
          "p-0 flex flex-col gap-0 overflow-hidden",
          effectiveFullscreen 
            ? "w-screen h-[100dvh] max-w-none max-h-none m-0 rounded-none" 
            : "w-[95vw] max-w-7xl h-[85vh] sm:h-[90vh]"
        )}
      >
        {/* Header responsivo */}
        <DialogHeader className="p-3 sm:p-4 border-b shrink-0 bg-card">
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="text-sm sm:text-lg truncate flex-1 pr-2">
              {title}
            </DialogTitle>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
                onClick={() => window.open(url, '_blank')}
                title="Abrir em nova aba"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Abrir</span>
              </Button>
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Sair do fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Iframe com loading state */}
        <div className="flex-1 min-h-0 relative bg-background">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Carregando...</span>
              </div>
            </div>
          )}
          <iframe
            src={url}
            className="w-full h-full border-0 block iframe-scrollbar"
            title={title}
            onLoad={() => setIsLoading(false)}
            allow="fullscreen"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IframeDialog;
