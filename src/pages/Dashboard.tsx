import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IframeDialog from "@/components/IframeDialog";

const Dashboard = () => {
  const [pipefyOpen, setPipefyOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mb-10 sm:mb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Portal Corporativo
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight text-foreground">
            Hub FMG Brasil
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Central de excelência operacional e gestão empresarial
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-12 bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="h-px w-12 bg-border" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Acesso Comum Card */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pt-8 pb-6 px-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-center text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                Acesso Comum
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                Base de conhecimento e sistemas para toda a equipe
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8 px-6">
              <Link to="/acesso-comum" className="w-full">
                <Button size="lg" className="w-full h-12 text-base font-medium">
                  Acessar Portal
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Acesso Gestão Card */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pt-8 pb-6 px-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-accent-foreground" />
              </div>
              <CardTitle className="text-center text-xl sm:text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
                Acesso Gestão
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                Área restrita para gestores e diretores
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8 px-6">
              <Link to="/acesso-gestao" className="w-full">
                <Button size="lg" variant="outline" className="w-full h-12 text-base font-medium border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300">
                  Acessar Portal
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Registro de Eventos - RH Card */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pt-8 pb-6 px-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-center text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                Registro de Eventos
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                Formulário de registro de eventos dos colaboradores ao RH
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8 px-6">
              <Button size="lg" variant="outline" className="w-full h-12 text-base font-medium border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300" onClick={() => setPipefyOpen(true)}>
                Abrir Formulário
                <span className="ml-2">→</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <IframeDialog
        open={pipefyOpen}
        onOpenChange={setPipefyOpen}
        url="https://app.pipefy.com/public/form/K6nLZ7ae?embedded=true"
        title="Registro de Eventos - RH"
      />
    </div>
  );
};

export default Dashboard;
