import Layout from '@/components/Layout';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Loader2 } from 'lucide-react';
import { getIcon } from '@/lib/iconMap';
import { useNavigate } from 'react-router-dom';

const Favoritos = () => {
  const { favorites, isLoading, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const groupedFavorites = favorites.reduce((acc, fav) => {
    if (!acc[fav.item_type]) {
      acc[fav.item_type] = [];
    }
    acc[fav.item_type].push(fav);
    return acc;
  }, {} as Record<string, typeof favorites>);

  const typeLabels: Record<string, string> = {
    system: 'Sistemas',
    department: 'Departamentos',
    tool: 'Ferramentas',
    exclusive_tool: 'Soluções Exclusivas',
  };

  const handleAction = (fav: typeof favorites[0]) => {
    if (fav.item_url) {
      if (fav.item_url.startsWith('http')) {
        window.open(fav.item_url, '_blank');
      } else {
        navigate(fav.item_url);
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-glow-sm">
                <Star className="h-6 w-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                  Meus Favoritos
                </h1>
                <p className="text-muted-foreground">
                  Acesse rapidamente suas ferramentas e recursos favoritos
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
              </Badge>
            </div>
          </div>

          {favorites.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Star className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Comece a adicionar seus sistemas, departamentos e ferramentas favoritos clicando no ícone de estrela.
                </p>
                <Button onClick={() => navigate('/')}>
                  Explorar Recursos
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedFavorites).map(([type, items]) => (
                <div key={type}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {typeLabels[type] || type}
                    <Badge variant="outline">{items.length}</Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((fav) => {
                      const IconComponent = fav.item_icon ? getIcon(fav.item_icon) : Star;
                      return (
                        <Card key={fav.id} className="group hover:shadow-elegant-lg transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                  <IconComponent className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <CardTitle className="text-base truncate">
                                    {fav.item_name}
                                  </CardTitle>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFavorite({ itemType: fav.item_type, itemId: fav.item_id })}
                                className="hover:bg-destructive/10 hover:text-destructive shrink-0"
                              >
                                <Star className="h-4 w-4 fill-primary text-primary" />
                              </Button>
                            </div>
                            {fav.item_description && (
                              <CardDescription className="line-clamp-2">
                                {fav.item_description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          {fav.item_url && (
                            <CardContent>
                              <Button
                                onClick={() => handleAction(fav)}
                                className="w-full"
                                variant="outline"
                              >
                                Acessar
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Favoritos;
