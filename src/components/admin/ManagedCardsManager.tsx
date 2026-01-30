import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, AlertTriangle, Check } from "lucide-react";
import { useManagedCards } from "@/hooks/useManagedCards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { iconMap } from "@/lib/iconMap";

const cardSchema = z.object({
  card_type: z.enum(["central_solucoes", "base_conhecimento", "dashboards", "solucoes_exclusivas", "acesso_gestao"]),
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  url: z.string().optional(),
  internal_path: z.string().optional(),
  icon: z.string(),
  display_order: z.number().int().positive(),
  is_active: z.boolean(),
  open_type: z.enum(["external", "embedded", "internal"]).optional(),
});

type CardFormData = z.infer<typeof cardSchema>;

const cardTypeLabels = {
  central_solucoes: "Central de Soluções",
  base_conhecimento: "Base de Conhecimento",
  dashboards: "Dashboards",
  solucoes_exclusivas: "Soluções Exclusivas",
  acesso_gestao: "Acesso Gestão",
};

const isUrlMissingProtocol = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  const hasProtocol = url.startsWith('http://') || url.startsWith('https://');
  const looksLikeDomain = /^[a-zA-Z0-9][\w.-]*\.[a-z]{2,}/.test(url);
  return !hasProtocol && looksLikeDomain;
};

const normalizeUrl = (url: string): string => {
  if (!url) return url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export function ManagedCardsManager() {
  const [activeTab, setActiveTab] = useState("central_solucoes");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);

  const { cards, isLoading, addCard, updateCard, deleteCard, toggleActive, reorderCards } =
    useManagedCards(activeTab);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      card_type: activeTab as any,
      is_active: true,
      display_order: cards.length + 1,
      open_type: "external",
    },
  });

  const handleAdd = () => {
    setEditingCard(null);
    reset({
      card_type: activeTab as any,
      title: "",
      description: "",
      url: "",
      internal_path: "",
      icon: "Package",
      display_order: cards.length + 1,
      is_active: true,
      open_type: "external",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (card: any) => {
    setEditingCard(card);
    reset({
      card_type: card.card_type,
      title: card.title,
      description: card.description,
      url: card.url || "",
      internal_path: card.internal_path || "",
      icon: card.icon,
      display_order: card.display_order,
      is_active: card.is_active,
      open_type: card.open_type || "external",
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: CardFormData) => {
    if (editingCard) {
      updateCard.mutate({ 
        id: editingCard.id, 
        card_type: data.card_type,
        title: data.title,
        description: data.description,
        url: data.url,
        internal_path: data.internal_path,
        icon: data.icon,
        display_order: data.display_order,
        is_active: data.is_active,
        open_type: data.open_type,
      });
    } else {
      addCard.mutate({
        card_type: data.card_type,
        title: data.title,
        description: data.description,
        url: data.url,
        internal_path: data.internal_path,
        icon: data.icon,
        display_order: data.display_order,
        is_active: data.is_active,
        open_type: data.open_type,
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este card?")) {
      deleteCard.mutate(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newCards = [...cards];
    [newCards[index - 1].display_order, newCards[index].display_order] = [
      newCards[index].display_order,
      newCards[index - 1].display_order,
    ];
    reorderCards.mutate(
      newCards.map((c) => ({ id: c.id, display_order: c.display_order }))
    );
  };

  const handleMoveDown = (index: number) => {
    if (index === cards.length - 1) return;
    const newCards = [...cards];
    [newCards[index + 1].display_order, newCards[index].display_order] = [
      newCards[index].display_order,
      newCards[index + 1].display_order,
    ];
    reorderCards.mutate(
      newCards.map((c) => ({ id: c.id, display_order: c.display_order }))
    );
  };

  const watchedUrl = watch("url") || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Cards do Sistema</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="central_solucoes">Central de Soluções</TabsTrigger>
          <TabsTrigger value="base_conhecimento">Base de Conhecimento</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="solucoes_exclusivas">Soluções Exclusivas</TabsTrigger>
          <TabsTrigger value="acesso_gestao">Acesso Gestão</TabsTrigger>
        </TabsList>

        {Object.keys(cardTypeLabels).map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Card
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Ordem</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Link/Path</TableHead>
                    <TableHead>Ícone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : cards.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Nenhum card encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    cards.map((card, index) => {
                      const IconComponent = iconMap[card.icon as keyof typeof iconMap];
                      return (
                        <TableRow key={card.id}>
                          <TableCell className="font-medium">{card.display_order}</TableCell>
                          <TableCell>{card.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{card.description}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {card.url || card.internal_path || "-"}
                          </TableCell>
                          <TableCell>
                            {IconComponent && <IconComponent className="h-5 w-5" />}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={card.is_active}
                              onCheckedChange={(checked) =>
                                toggleActive.mutate({ id: card.id, is_active: checked })
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === cards.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(card)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(card.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCard ? "Editar Card" : "Adicionar Novo Card"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea id="description" {...register("description")} rows={3} />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="url">URL (Link Externo)</Label>
              <Input 
                id="url" 
                {...register("url")} 
                placeholder="https://exemplo.com.br"
                className={isUrlMissingProtocol(watchedUrl) ? "border-amber-500 focus-visible:ring-amber-500" : ""}
              />
              
              {isUrlMissingProtocol(watchedUrl) && (
                <Alert className="mt-2 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm">
                      URL sem protocolo. Adicione <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">https://</code>
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900"
                      onClick={() => setValue("url", normalizeUrl(watchedUrl))}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Corrigir
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              <p className="text-xs text-muted-foreground mt-1">
                Ex: https://ia.fmgbrasil.com.br
              </p>
            </div>

            <div>
              <Label htmlFor="internal_path">Path Interno (Rota)</Label>
              <Input id="internal_path" {...register("internal_path")} placeholder="/exemplo" />
            </div>

            <div>
              <Label htmlFor="icon">Ícone</Label>
              <Select
                value={watch("icon")}
                onValueChange={(value) => setValue("icon", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(iconMap).map((iconName) => {
                    const Icon = iconMap[iconName as keyof typeof iconMap];
                    return (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{iconName}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {activeTab === "solucoes_exclusivas" && (
              <div>
                <Label htmlFor="open_type">Tipo de Abertura</Label>
                <Select
                  value={watch("open_type")}
                  onValueChange={(value) => setValue("open_type", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external">Externo (Nova Aba)</SelectItem>
                    <SelectItem value="embedded">Embedded (Iframe)</SelectItem>
                    <SelectItem value="internal">Interno (Rota)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="display_order">Ordem de Exibição *</Label>
              <Input
                id="display_order"
                type="number"
                {...register("display_order", { valueAsNumber: true })}
              />
              {errors.display_order && (
                <p className="text-sm text-destructive mt-1">{errors.display_order.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={watch("is_active")}
                onCheckedChange={(checked) => setValue("is_active", checked)}
              />
              <Label htmlFor="is_active">Card Ativo</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingCard ? "Salvar Alterações" : "Adicionar Card"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
