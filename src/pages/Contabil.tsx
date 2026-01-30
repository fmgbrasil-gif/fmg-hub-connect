import { Calculator } from "lucide-react";
import { useIsInIframe } from "@/hooks/useIsInIframe";
import { useIsMobile } from "@/hooks/use-mobile";

const Contabil = () => {
  const isInIframe = useIsInIframe();
  const isMobile = useIsMobile();

  const getIframeHeight = () => {
    if (isInIframe) return 'calc(100dvh - 16px)';
    if (isMobile) return 'calc(100dvh - 140px)';
    return 'calc(100vh - 180px)';
  };

  return (
    <div className="w-full h-full">
      {!isInIframe && (
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">Departamento Contábil</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Base de conhecimento e procedimentos</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full rounded-lg overflow-hidden" style={{ height: getIframeHeight() }}>
        <iframe 
          className="clickup-embed clickup-dynamic-height w-full h-full rounded-lg border border-border shadow-sm iframe-scrollbar" 
          src="https://doc.clickup.com/9011841813/d/h/8cjbjrn-1871/34b57f8cd59b72a" 
          style={{ background: 'transparent' }}
        />
      </div>
    </div>
  );
};

export default Contabil;
