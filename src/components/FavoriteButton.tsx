import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  itemType: string;
  itemId: string;
  itemName: string;
  itemDescription?: string;
  itemUrl?: string;
  itemIcon?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const FavoriteButton = ({
  itemType,
  itemId,
  itemName,
  itemDescription,
  itemUrl,
  itemIcon,
  className,
  size = 'icon',
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(itemType, itemId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await toggleFavorite({
      itemType,
      itemId,
      itemName,
      itemDescription,
      itemUrl,
      itemIcon,
    });
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleClick}
      className={cn(
        "hover:bg-primary/10 hover:text-primary transition-all duration-300",
        favorite && "text-primary",
        className
      )}
      title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Star 
        className={cn(
          "h-4 w-4 transition-all duration-300",
          favorite && "fill-primary"
        )} 
      />
    </Button>
  );
};
