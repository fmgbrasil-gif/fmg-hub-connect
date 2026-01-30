import DepartmentCard from "@/components/DepartmentCard";
import { useManagedCards } from "@/hooks/useManagedCards";
import { iconMap } from "@/lib/iconMap";

const BaseConhecimento = () => {
  const { cards, isLoading } = useManagedCards("base_conhecimento");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-green-500/10 rounded-full mb-4">
          <span className="text-sm font-semibold text-green-600">BASE DE CONHECIMENTO</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Base de Conhecimento
        </h1>
        <p className="text-lg text-muted-foreground">
          Selecione o departamento para acessar os tutoriais
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = iconMap[card.icon as keyof typeof iconMap];
            return (
              <DepartmentCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={IconComponent}
                path={card.internal_path || "/"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BaseConhecimento;
