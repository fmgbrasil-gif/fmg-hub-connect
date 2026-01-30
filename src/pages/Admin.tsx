import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, FileText, Users as UsersIcon, TrendingUp, Shield, UserCog, Settings } from "lucide-react";
import UserRolesManager from "@/components/admin/UserRolesManager";
import { ManagedCardsManager } from "@/components/admin/ManagedCardsManager";

const Admin = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-red-500/10 rounded-full mb-4">
          <span className="text-sm font-semibold text-red-600">ÁREA ADMINISTRATIVA - RESTRITO</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Área Administrativa</h1>
            <p className="text-muted-foreground">Informações restritas à diretoria</p>
          </div>
        </div>
      </div>

      {/* Gestão de Usuários e Roles */}
      <div className="mb-8">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              <CardTitle>Gestão de Usuários e Permissões</CardTitle>
            </div>
            <CardDescription>
              Adicione ou remova permissões de diretor para os usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserRolesManager />
          </CardContent>
        </Card>
      </div>

      {/* Gerenciar Todos os Cards do Sistema */}
      <div className="mb-8">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Gerenciar Todos os Cards do Sistema</CardTitle>
            </div>
            <CardDescription>
              Configure cards de todas as seções: Central de Soluções, Base de Conhecimento, Dashboards e Soluções Exclusivas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManagedCardsManager />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Relatórios de Atividades</CardTitle>
            </div>
            <CardDescription>
              Acompanhamento diário das atividades de cada colaborador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seção em desenvolvimento para visualização e análise de relatórios de produtividade.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              <CardTitle>Clientes x Responsáveis</CardTitle>
            </div>
            <CardDescription>
              Distribuição de carteira de clientes por colaborador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seção em desenvolvimento para gestão de alocação de clientes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Indicadores de Performance</CardTitle>
            </div>
            <CardDescription>
              Métricas e KPIs do escritório
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seção em desenvolvimento para visualização de indicadores estratégicos.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Documentos Confidenciais</CardTitle>
            </div>
            <CardDescription>
              Repositório de documentos restritos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seção em desenvolvimento para armazenamento de documentos da diretoria.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            <Lock className="h-5 w-5 inline-block mr-2" />
            As funcionalidades administrativas completas serão implementadas em breve, 
            incluindo sistema de autenticação e controle de acesso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
