import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldOff, Loader2, RefreshCw, Info, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  isAdmin: boolean;
}

const UserRolesManager = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Buscar todos os perfis
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (profilesError) throw profilesError;

      // Buscar todas as roles de admin
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      const adminIds = new Set(adminRoles?.map(r => r.user_id) || []);

      // Criar lista de usuários com base nos perfis
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => ({
        id: profile.id,
        email: 'Ver no Supabase',
        full_name: profile.full_name,
        isAdmin: adminIds.has(profile.id)
      }));

      setUsers(usersWithRoles);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Erro ao carregar usuários:", error);
      }
      toast({
        title: "Erro ao carregar usuários",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdminRole = async (userId: string, isCurrentlyAdmin: boolean) => {
    setProcessingUserId(userId);
    try {
      if (isCurrentlyAdmin) {
        // Remover role de admin
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) throw error;

        toast({
          title: "Permissão removida",
          description: "A permissão de administrador foi removida com sucesso."
        });
      } else {
        // Adicionar role de admin
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) throw error;

        toast({
          title: "Permissão concedida",
          description: "O usuário agora tem permissões de administrador."
        });
      }

      // Atualizar a lista
      await fetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar permissão",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Gerenciamento de Usuários</AlertTitle>
        <AlertDescription className="space-y-3">
          <p>
            Os usuários são gerenciados através do Supabase. Para adicionar, editar ou remover 
            usuários, acesse o painel de autenticação do Supabase.
          </p>
          <p className="text-muted-foreground">
            Após cadastrados (via página de login ou painel), eles aparecerão nesta lista 
            para configuração de permissões de diretor.
          </p>
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <a 
              href="https://supabase.com/dashboard/project/wdbtqanwncruzbvnxmrk/auth/users" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir painel de usuários do Supabase
            </a>
          </Button>
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total de usuários cadastrados: {users.length}
        </p>
        <Button variant="outline" size="sm" onClick={fetchUsers}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {users.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>ID do Usuário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name || 'Não informado'}
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {user.id.substring(0, 8)}...
                    </code>
                  </TableCell>
                  <TableCell>
                  {user.isAdmin ? (
                      <Badge variant="default" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Administrador
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <ShieldOff className="h-3 w-3" />
                        Colaborador
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.isAdmin ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleAdminRole(user.id, user.isAdmin)}
                      disabled={processingUserId === user.id}
                    >
                      {processingUserId === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user.isAdmin ? (
                        <>
                          <ShieldOff className="h-4 w-4 mr-2" />
                          Remover Admin
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Tornar Admin
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground font-medium">Nenhum usuário cadastrado ainda</p>
            <p className="text-sm text-muted-foreground">
              Os usuários aparecerão aqui após se cadastrarem na página de login
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRolesManager;
