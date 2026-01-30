import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Maximize2 } from "lucide-react";
import { useState } from "react";
import { useManagedCards } from "@/hooks/useManagedCards";
import { iconMap } from "@/lib/iconMap";
import IframeDialog from "@/components/IframeDialog";
const Dashboards = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [currentToolName, setCurrentToolName] = useState("");
  const {
    cards,
    isLoading
  } = useManagedCards("dashboards");
  const normalizeUrl = (url: string): string => {
    if (!url) return url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };
  const handleOpenEmbedded = (card: any) => {
    setCurrentToolName(card.title);
    setIframeUrl(normalizeUrl(card.url));
    setOpenDialog(true);
  };
  return <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/10 rounded-full mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-semibold text-red-600">DASHBOARDS - RESTRITO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Dashboards Estratégicos
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Análises e relatórios para tomada de decisão
        </p>
      </div>

      {isLoading ? <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map(card => {
        const IconComponent = iconMap[card.icon as keyof typeof iconMap];
        return <Card key={card.id} className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                <CardHeader className="flex-grow p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    {IconComponent && <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                  </div>
                  <CardTitle className="text-base sm:text-lg">{card.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto p-4 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex flex-col gap-2">
                    <Button variant="default" className="w-full text-sm" onClick={() => handleOpenEmbedded(card)} disabled={!card.url}>
                      <Maximize2 className="mr-2 h-4 w-4" />
                      Acessar Portal
                    </Button>
                    <Button variant="outline" className="w-full text-sm" onClick={() => card.url && window.open(normalizeUrl(card.url), '_blank')} disabled={!card.url}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Abrir Externamente
                    </Button>
                  </div>
                </CardContent>
              </Card>;
      })}
        </div>}

      <IframeDialog open={openDialog} onOpenChange={setOpenDialog} url={iframeUrl} title={currentToolName} />
    </div>;
};
export default Dashboards;