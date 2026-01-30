import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Pencil, RefreshCw, Loader2 } from 'lucide-react';
import { iconOptions } from '@/lib/iconMap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const toolSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória').max(200, 'Máximo 200 caracteres'),
  url: z.string().url('URL inválida').optional().or(z.literal('')),
  icon: z.string(),
  is_active: z.boolean(),
});

type ToolFormData = z.infer<typeof toolSchema>;

interface CustomTool {
  id: string;
  title: string;
  description: string;
  url: string | null;
  icon: string;
  is_active: boolean;
  display_order: number;
}

export const CustomToolsManager = () => {
  const [tools, setTools] = useState<CustomTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTool, setEditingTool] = useState<CustomTool | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ToolFormData>({
    resolver: zodResolver(toolSchema),
  });

  const fetchTools = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('custom_exclusive_tools')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'Erro ao carregar ferramentas',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setTools(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleEdit = (tool: CustomTool) => {
    setEditingTool(tool);
    reset({
      title: tool.title,
      description: tool.description,
      url: tool.url || '',
      icon: tool.icon,
      is_active: tool.is_active,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ToolFormData) => {
    if (!editingTool) return;

    setIsSaving(true);
    const { error } = await supabase
      .from('custom_exclusive_tools')
      .update({
        title: data.title,
        description: data.description,
        url: data.url || null,
        icon: data.icon,
        is_active: data.is_active,
      })
      .eq('id', editingTool.id);

    setIsSaving(false);

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Salvo com sucesso',
        description: 'Ferramenta atualizada!',
      });
      setIsDialogOpen(false);
      fetchTools();
    }
  };

  const toggleActive = async (tool: CustomTool) => {
    const { error } = await supabase
      .from('custom_exclusive_tools')
      .update({ is_active: !tool.is_active })
      .eq('id', tool.id);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: tool.is_active ? 'Ferramenta desativada' : 'Ferramenta ativada',
      });
      fetchTools();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Gerencie os 3 cards personalizados da página Soluções Exclusivas
        </p>
        <Button onClick={fetchTools} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Ordem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-32 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.display_order}</TableCell>
                <TableCell className="font-medium">{tool.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {tool.description}
                </TableCell>
                <TableCell>
                  <Badge variant={tool.is_active ? 'default' : 'secondary'}>
                    {tool.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={() => handleEdit(tool)}
                    variant="ghost"
                    size="sm"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => toggleActive(tool)}
                    variant="outline"
                    size="sm"
                  >
                    {tool.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editar Ferramenta</DialogTitle>
              <DialogDescription>
                Configure o card personalizado para a página Soluções Exclusivas
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Nome da ferramenta"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Breve descrição da ferramenta"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  {...register('url')}
                  placeholder="https://sua-ferramenta.com"
                  type="url"
                />
                {errors.url && (
                  <p className="text-sm text-destructive">{errors.url.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Deixe em branco para mostrar como "Em Breve"
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Ícone</Label>
                <Select
                  value={watch('icon')}
                  onValueChange={(value) => setValue('icon', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={watch('is_active')}
                  onCheckedChange={(checked) => setValue('is_active', checked)}
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Ativo (visível na página)
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
