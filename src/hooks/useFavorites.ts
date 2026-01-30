import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface FavoriteItem {
  id: string;
  user_id: string;
  item_type: string;
  item_id: string;
  item_name: string;
  item_description?: string;
  item_url?: string;
  item_icon?: string;
  created_at: string;
}

export interface AddFavoriteParams {
  itemType: string;
  itemId: string;
  itemName: string;
  itemDescription?: string;
  itemUrl?: string;
  itemIcon?: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as FavoriteItem[];
    },
    enabled: !!user,
  });

  const addFavorite = useMutation({
    mutationFn: async (params: AddFavoriteParams) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: params.itemType,
          item_id: params.itemId,
          item_name: params.itemName,
          item_description: params.itemDescription,
          item_url: params.itemUrl,
          item_icon: params.itemIcon,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      toast({
        title: "Adicionado aos favoritos",
        description: "Item adicionado com sucesso!",
      });
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast({
          title: "Item já está nos favoritos",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao adicionar favorito",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async ({ itemType, itemId }: { itemType: string; itemId: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      toast({
        title: "Removido dos favoritos",
        description: "Item removido com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover favorito",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isFavorite = (itemType: string, itemId: string) => {
    return favorites.some(
      (fav) => fav.item_type === itemType && fav.item_id === itemId
    );
  };

  const toggleFavorite = async (params: AddFavoriteParams) => {
    if (isFavorite(params.itemType, params.itemId)) {
      await removeFavorite.mutateAsync({
        itemType: params.itemType,
        itemId: params.itemId,
      });
    } else {
      await addFavorite.mutateAsync(params);
    }
  };

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    addFavorite: addFavorite.mutateAsync,
    removeFavorite: removeFavorite.mutateAsync,
    refetch,
  };
};
