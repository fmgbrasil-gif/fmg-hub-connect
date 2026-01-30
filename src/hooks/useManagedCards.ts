import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type ManagedCard = Tables<"managed_cards">;
type ManagedCardInsert = TablesInsert<"managed_cards">;
type ManagedCardUpdate = TablesUpdate<"managed_cards">;

export const useManagedCards = (cardType?: string) => {
  const queryClient = useQueryClient();

  const { data: cards, isLoading } = useQuery({
    queryKey: ["managed_cards", cardType],
    queryFn: async () => {
      let query = supabase
        .from("managed_cards")
        .select("*")
        .order("display_order", { ascending: true });

      if (cardType) {
        query = query.eq("card_type", cardType);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ManagedCard[];
    },
  });

  const addCard = useMutation({
    mutationFn: async (card: ManagedCardInsert) => {
      const { data, error } = await supabase
        .from("managed_cards")
        .insert(card)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managed_cards"] });
      toast.success("Card adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar card: " + error.message);
    },
  });

  const updateCard = useMutation({
    mutationFn: async ({ id, ...updates }: ManagedCardUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("managed_cards")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managed_cards"] });
      toast.success("Card atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar card: " + error.message);
    },
  });

  const deleteCard = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("managed_cards")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managed_cards"] });
      toast.success("Card removido com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao remover card: " + error.message);
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("managed_cards")
        .update({ is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managed_cards"] });
      toast.success("Status atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar status: " + error.message);
    },
  });

  const reorderCards = useMutation({
    mutationFn: async (reorderedCards: { id: string; display_order: number }[]) => {
      const updates = reorderedCards.map(({ id, display_order }) =>
        supabase.from("managed_cards").update({ display_order }).eq("id", id)
      );

      const results = await Promise.all(updates);
      const error = results.find((r) => r.error)?.error;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managed_cards"] });
      toast.success("Ordem atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar ordem: " + error.message);
    },
  });

  return {
    cards: cards || [],
    isLoading,
    addCard,
    updateCard,
    deleteCard,
    toggleActive,
    reorderCards,
  };
};
