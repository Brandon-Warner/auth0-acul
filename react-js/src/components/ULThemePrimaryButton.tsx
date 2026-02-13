import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ULThemePrimaryButtonProps = ButtonProps;

export function ULThemePrimaryButton({
  variant = "primary",
  size = "default",
  className,
  ...props
}: ULThemePrimaryButtonProps) {
  // Variant-specific theme overrides for colors and states
  const variantThemeOverrides = {
    primary: cn(
      "relative",
      "p-6 border-0",
      "cursor-pointer",
      "bg-gradient-to-r from-indigo-600 to-purple-600",
      "hover:from-indigo-700 hover:to-purple-700",
      "text-white",
      "font-semibold",
      "shadow-xl",
      "transition-all duration-300",
      "transform hover:scale-[1.02] active:scale-[0.98]",
      "focus:outline-none focus:ring-4 focus:ring-purple-500/50",
      "disabled:opacity-70",
      "disabled:cursor-not-allowed",
      "disabled:hover:scale-100"
    ),
    secondary: "", // Add secondary overrides if needed
    destructive: "", // Add destructive overrides if needed
    outline: "", // Add outline overrides if needed
    ghost: "", // Add ghost overrides if needed
    link: "", // Add link overrides if needed
  };

  // Size-specific theme overrides for border radius and typography
  const sizeThemeOverrides = {
    default: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    xs: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    sm: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    lg: cn(
      "theme-universal:rounded-button",
      "theme-universal:font-button",
      "theme-universal:text-(length:--ul-theme-font-buttons-text-size)"
    ),
    icon: cn("theme-universal:rounded-button"),
  };

  // Combine all theme classes with proper type safety
  const themeClasses = cn(
    variant && variantThemeOverrides[variant],
    size && sizeThemeOverrides[size]
  );

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className, themeClasses)}
      {...props}
    />
  );
}
