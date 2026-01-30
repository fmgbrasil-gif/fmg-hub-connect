import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Wrench, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AcessoComum = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 text-center">
        <div className="inline-block px-4 py-2 bg-primary/5 border border-primary/20 rounded-full mb-4">
          <span className="text-sm font-semibold text-primary">ACESSO EQUIPE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          Acesso Equipe
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Escolha entre a base de conhecimento ou central de soluções
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex-grow">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Base de Conhecimento</CardTitle>
            <CardDescription className="text-center text-sm">
              Tutoriais e processos dos departamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center mt-auto">
            <Link to="/base-conhecimento" className="w-full">
              <Button size="lg" className="w-full">
                Acessar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex-grow">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Wrench className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Central de Soluções</CardTitle>
            <CardDescription className="text-center text-sm">
              Acesso rápido aos sistemas e ferramentas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center mt-auto">
            <Link to="/central-solucoes" className="w-full">
              <Button size="lg" className="w-full">
                Acessar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 border-amber-500/20">
          <CardHeader className="flex-grow">
            <div className="w-14 h-14 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="h-7 w-7 text-amber-600" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Soluções Exclusivas FMG</CardTitle>
            <CardDescription className="text-center text-sm">
              Ferramentas e recursos exclusivos
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center mt-auto">
            <Link to="/solucoes-exclusivas" className="w-full">
              <Button size="lg" className="w-full">
                Acessar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcessoComum;
