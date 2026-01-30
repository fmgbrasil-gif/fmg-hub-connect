import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Wrench, BarChart3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useManagedCards } from "@/hooks/useManagedCards";
import { iconMap } from "@/lib/iconMap";
import { Skeleton } from "@/components/ui/skeleton";

// Cards padrão para fallback caso o banco esteja vazio
const defaultCards = [
  {
    id: "default-1",
    title: "Base de Conhecimento",
    description: "Tutoriais e processos dos departamentos",
    internal_path: "/base-conhecimento",
    icon: "BookOpen",
    display_order: 1,
  },
  {
    id: "default-2",
    title: "Central de Soluções",
    description: "Acesso rápido aos sistemas",
    internal_path: "/central-solucoes",
    icon: "Wrench",
    display_order: 2,
  },
  {
    id: "default-3",
    title: "Dashboards",
    description: "Análises e relatórios estratégicos",
    internal_path: "/dashboards",
    icon: "BarChart3",
    display_order: 3,
  },
  {
    id: "default-4",
    title: "Soluções Exclusivas FMG",
    description: "Ferramentas e recursos exclusivos",
    internal_path: "/solucoes-exclusivas",
    icon: "Sparkles",
    display_order: 4,
  },
];

const AcessoGestao = () => {
  const { cards, isLoading } = useManagedCards("acesso_gestao");
  
  // Usa cards do banco ou fallback para os padrões
  const displayCards = cards.length > 0 ? cards : defaultCards;

  const isExclusiveCard = (title: string) => 
    title.toLowerCase().includes("exclusiv");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 text-center">
        <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
          <span className="text-sm font-semibold text-amber-600">ACESSO GESTÃO - RESTRITO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Acesso Gestão
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Área restrita para gestores e diretores
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          // Skeleton loading
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader className="flex-grow">
                <Skeleton className="w-14 h-14 rounded-lg mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mx-auto" />
              </CardHeader>
              <CardContent className="flex justify-center mt-auto">
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          displayCards.map((card) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            const isExclusive = isExclusiveCard(card.title);
            
            return (
              <Card 
                key={card.id} 
                className={`h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ${
                  isExclusive ? "border-amber-500/20" : ""
                }`}
              >
                <CardHeader className="flex-grow">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto ${
                    isExclusive ? "bg-amber-500/10" : "bg-primary/10"
                  }`}>
                    {IconComponent && (
                      <IconComponent className={`h-7 w-7 ${
                        isExclusive ? "text-amber-600" : "text-primary"
                      }`} />
                    )}
                  </div>
                  <CardTitle className="text-center text-lg sm:text-xl">{card.title}</CardTitle>
                  <CardDescription className="text-center text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center mt-auto">
                  <Link to={card.internal_path || "#"} className="w-full">
                    <Button size="lg" className="w-full">
                      Acessar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AcessoGestao;
