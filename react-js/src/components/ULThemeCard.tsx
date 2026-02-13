import { cn } from "@/lib/utils";

import { Card } from "./ui/card";

export interface ULThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card element.
   */
  children: React.ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeCard = ({ children, className, ...rest }: ULThemeCardProps) => {
  const themeClasses = cn(
    "px-10",
    "py-10",
    "bg-gray-50/95",
    "backdrop-blur-xl",
    "shadow-2xl",
    "hover:shadow-purple-500/20",
    "transition-all",
    "duration-500",
    "hover:-translate-y-1",
    "border",
    "border-white/20",
    "theme-universal:rounded-widget",
    className
  );

  return (
    <Card className={themeClasses} {...rest}>
      {children}
    </Card>
  );
};

export default ULThemeCard;
