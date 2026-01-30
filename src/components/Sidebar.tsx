import { NavLink } from "./NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Home, 
  Lock,
  LogOut,
  Menu,
  X,
  Star,
  FileText,
  Calculator,
  Users,
  Scale,
  UserCheck,
  ClipboardList,
  FolderOpen,
  Sparkles,
  BarChart3,
  ChevronDown
} from "lucide-react";
import logoFmg from "@/assets/logo-fmg.png";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocation } from "react-router-dom";

// Links organizados por seção
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

const Sidebar = () => {
  const { signOut, isAdmin, user } = useAuth();
  const { favorites } = useFavorites();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
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
  };

  const linkClassName = "group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200 font-medium";
  const activeLinkClassName = "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm";

  const sidebarContent = (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 blur-xl rounded-lg" />
            <img src={logoFmg} alt="FMG Brasil" className="h-12 w-auto relative z-10 drop-shadow-lg" />
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-1">
          {/* Home */}
          <NavLink 
            to="/" 
            className={linkClassName}
            activeClassName={activeLinkClassName}
          >
            <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Início</span>
          </NavLink>

          {/* Favoritos */}
          <NavLink 
            to="/favoritos" 
            className={linkClassName}
            activeClassName={activeLinkClassName}
          >
            <Star className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Favoritos</span>
            {favorites.length > 0 && (
              <span className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-2xs font-semibold">
                {favorites.length}
              </span>
            )}
          </NavLink>

          {/* Base de Conhecimento Section - Collapsible */}
          <Collapsible open={baseOpen} onOpenChange={setBaseOpen} className="pt-3">
            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-2 text-2xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
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
                >
                  <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Soluções Section - Collapsible */}
          <Collapsible open={solucoesOpen} onOpenChange={setSolucoesOpen} className="pt-3">
            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-2 text-2xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
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
                >
                  <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Gestão Section (Admins Only) - Collapsible */}
          {isAdmin() && (
            <Collapsible open={gestaoOpen} onOpenChange={setGestaoOpen} className="pt-3">
              <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-2 text-2xs font-semibold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors">
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
                    className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-accent/5 hover:text-accent transition-all duration-200 font-medium"
                    activeClassName="bg-gradient-to-r from-accent to-accent/80 text-white shadow-glow-accent-sm"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </NavLink>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Admin Section (Admins Only) */}
          {isAdmin() && (
            <div className="pt-3">
              <span className="px-4 py-2 block text-2xs font-semibold uppercase tracking-wider text-destructive/70">
                Administração
              </span>
              <NavLink 
                to="/admin" 
                className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-200 font-medium"
                activeClassName="bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-elegant-md"
              >
                <Lock className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Admin</span>
              </NavLink>
            </div>
          )}
        </nav>
      </div>

      {/* User Section */}
      <div className="mt-auto p-4 border-t border-border/50 glass">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-white font-bold shadow-elegant text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
            <p className="text-2xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button 
          onClick={handleSignOut}
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all duration-300 font-medium"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="text-sm">Sair</span>
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-3 glass rounded-xl border border-border/40 backdrop-blur-xl shadow-elegant lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-72 bg-card/50 glass border-r border-border/50 flex flex-col shadow-elegant-lg z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside className="w-72 bg-card/50 glass border-r border-border/50 flex-col shadow-elegant-lg hidden lg:flex">
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;
