import * as LucideIcons from 'lucide-react';

export const availableIcons = {
  Package: LucideIcons.Package,
  Sparkles: LucideIcons.Sparkles,
  Zap: LucideIcons.Zap,
  Rocket: LucideIcons.Rocket,
  Settings: LucideIcons.Settings,
  Wrench: LucideIcons.Wrench,
  Cpu: LucideIcons.Cpu,
  Database: LucideIcons.Database,
  FileText: LucideIcons.FileText,
  BarChart: LucideIcons.BarChart,
  TrendingUp: LucideIcons.TrendingUp,
  Activity: LucideIcons.Activity,
  Shield: LucideIcons.Shield,
  Lock: LucideIcons.Lock,
  Target: LucideIcons.Target,
  Mouse: LucideIcons.Mouse,
  FileSpreadsheet: LucideIcons.FileSpreadsheet,
  Building: LucideIcons.Building,
  Users: LucideIcons.Users,
  DollarSign: LucideIcons.DollarSign,
  Network: LucideIcons.Network,
  Building2: LucideIcons.Building2,
  Calculator: LucideIcons.Calculator,
  Scale: LucideIcons.Scale,
  Key: LucideIcons.Key,
  Brain: LucideIcons.Brain,
};

export const iconMap = availableIcons;

export type IconName = keyof typeof availableIcons;

export const getIcon = (iconName: string) => {
  return availableIcons[iconName as IconName] || availableIcons.Package;
};

export const iconOptions = Object.keys(availableIcons).map(name => ({
  label: name,
  value: name,
}));
