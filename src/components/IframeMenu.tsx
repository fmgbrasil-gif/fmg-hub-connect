import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "@/components/NavLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Home, 
  Star, 
  FolderOpen, 
  BarChart3, 
  Sparkles, 
  LogOut,
  User,
  FileText,
  Calculator,
  Scale,
  Users,
  UserCheck,
  ClipboardList,
  Lock,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface IframeMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Links organizados por seção (sincronizado com Sidebar)
const mainLinks = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/favoritos", icon: Star, label: "Favoritos" },
];

const baseConhecimentoLinks = [
  { to: "/fiscal", icon: FileText, label: "Fiscal" },
  { to: "/contabil", icon: Calculator, label: "Contábil" },
  { to: "/pessoal", icon: Users, label: "Pessoal" },
  { to: "/legalizacao", icon: Scale, label: "Legalização" },
  { to: "/onboarding", icon: UserCheck, label: "Onboarding" },
  { to: "/processos", icon: ClipboardList, label: "Processos" },
];

const solucoesLinks = [
  { to: "/central-solucoes", icon: FolderOpen, label: "Central de Soluções" },
  { to: "/solucoes-exclusivas", icon: Sparkles, label: "Soluções Exclusivas" },
];

const gestaoLinks = [
  { to: "/dashboards", icon: BarChart3, label: "Dashboards" },
];

const IframeMenu = ({ open, onOpenChange }: IframeMenuProps) => {
  const { user, userRole, signOut, isAdmin } = useAuth();
  const location = useLocation();

  // Verifica se algum link da seção está ativo para manter aberto por padrão
  const isBaseConhecimentoActive = baseConhecimentoLinks.some(link => location.pathname === link.to);
  const isSolucoesActive = solucoesLinks.some(link => location.pathname === link.to);
  const isGestaoActive = gestaoLinks.some(link => location.pathname === link.to);

  const [baseOpen, setBaseOpen] = useState(isBaseConhecimentoActive);
  const [solucoesOpen, setSolucoesOpen] = useState(isSolucoesActive);
  const [gestaoOpen, setGestaoOpen] = useState(isGestaoActive);

  const handleSignOut = async () => {
    await signOut();
    onOpenChange(false);
  };

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  const linkClassName = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-accent";
  const activeLinkClassName = "bg-primary/10 text-primary";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="px-4 py-3 border-b border-border">
          <SheetTitle className="text-left text-lg font-bold">FMG Hub</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 h-[calc(100vh-140px)]">
          <div className="p-3 space-y-2">
            {/* Main Links */}
            <div className="space-y-1">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkClassName}
                  activeClassName={activeLinkClassName}
                  onClick={handleLinkClick}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Base de Conhecimento - Collapsible */}
            <Collapsible open={baseOpen} onOpenChange={setBaseOpen} className="pt-2">
              <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                <span>Base de Conhecimento</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${baseOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1">
                {baseConhecimentoLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={linkClassName}
                    activeClassName={activeLinkClassName}
                    onClick={handleLinkClick}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Soluções - Collapsible */}
            <Collapsible open={solucoesOpen} onOpenChange={setSolucoesOpen} className="pt-2">
              <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors">
                <span>Soluções</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solucoesOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1">
                {solucoesLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={linkClassName}
                    activeClassName={activeLinkClassName}
                    onClick={handleLinkClick}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Gestão - Only for admins - Collapsible */}
            {isAdmin() && (
              <Collapsible open={gestaoOpen} onOpenChange={setGestaoOpen} className="pt-2">
                <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-accent uppercase tracking-wide hover:text-accent/80 transition-colors">
                  <span className="flex items-center gap-2">
                    Gestão
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-accent/10 text-accent text-2xs font-semibold normal-case">
                      VIP
                    </span>
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${gestaoOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {gestaoLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-accent/10"
                      activeClassName="bg-accent/10 text-accent"
                      onClick={handleLinkClick}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Admin - Only for admins */}
            {isAdmin() && (
              <div className="pt-2">
                <span className="px-3 py-2 block text-xs font-semibold text-destructive/70 uppercase tracking-wide">
                  Administração
                </span>
                <NavLink
                  to="/admin"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-destructive/10"
                  activeClassName="bg-destructive/10 text-destructive"
                  onClick={handleLinkClick}
                >
                  <Lock className="h-4 w-4" />
                  Admin
                </NavLink>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-3">
          {user && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole || 'Usuário'}</p>
              </div>
            </div>
          )}
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2" 
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IframeMenu;
