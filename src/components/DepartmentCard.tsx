import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";

interface DepartmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

const DepartmentCard = ({ title, description, icon: Icon, path }: DepartmentCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-4 right-4 z-10">
        <FavoriteButton
          itemType="department"
          itemId={path}
          itemName={title}
          itemDescription={description}
          itemUrl={path}
          itemIcon={Icon.name || "Package"}
        />
      </div>
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link to={path}>
          <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300">
            Acessar Tutoriais →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
