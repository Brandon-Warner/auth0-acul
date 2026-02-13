import * as React from "react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface ULThemeErrorProps extends React.ComponentProps<"div"> {
  variant?: "destructive";
}

function ULThemeAlert({
  variant = "destructive",
  className,
  ...props
}: ULThemeErrorProps) {
  // Variant-specific theme overrides for Auth0 styling
  const variantThemeOverrides = {
    destructive: cn(
      "p-4",
      "border-2",
      "shadow-lg",
      "theme-universal:bg-error",
      "theme-universal:text-(--ul-theme-color-primary-button-label)",
      "theme-universal:rounded-button",
      "theme-universal:font-body",
      "theme-universal:text-(length:--ul-theme-font-body-text-size)"
    ),
  };

  const themeClasses = cn(variant && variantThemeOverrides[variant]);

  return (
    <Alert
      variant={variant}
      className={cn(className, themeClasses)}
      {...props}
    />
  );
}

function ULThemeAlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Theme overrides for error title styling
  const themeClasses = cn(
    "theme-universal:text-(--ul-theme-color-primary-button-label)", //text-color
    "theme-universal:font-body", //font-weight
    "theme-universal:text-(length:--ul-theme-font-body-text-size)" //font-size
  );

  return <AlertTitle className={cn(className, themeClasses)} {...props} />;
}

export { ULThemeAlert, ULThemeAlertTitle };
export default ULThemeAlert;
