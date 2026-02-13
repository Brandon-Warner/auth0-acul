import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import {
  ULThemeFloatingLabelField,
  type ULThemeFloatingLabelFieldProps,
} from "@/components/form/ULThemeFloatingLabelField";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface ULThemePasswordFieldProps
  extends Omit<ULThemeFloatingLabelFieldProps, "type" | "endAdornment"> {
  onVisibilityToggle?: (isVisible: boolean) => void;
  buttonClassName?: string;
}

export const ULThemePasswordField = ({
  onVisibilityToggle,
  buttonClassName,
  ...props
}: ULThemePasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  const passwordButton = (
    <Tooltip>
      <TooltipTrigger
        type="button"
        onClick={handleToggle}
        className={cn(
          // Layout & Positioning
          "cursor-pointer h-full w-full min-w-[44px] mr-[-5px]",

          // Border Radius - matches input field
          "theme-universal:rounded-r-input theme-universal:rounded-l-none",

          // Colors with purple theme
          "text-gray-500",
          "hover:text-purple-600",

          // Transitions
          "transition-colors duration-200",

          // Focus States with purple theme
          "focus:bg-purple-50 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-0",

          // Layout
          "flex items-center justify-center",

          // Button-like styles
          "bg-transparent border-none outline-none",

          buttonClassName
        )}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </TooltipTrigger>
      <TooltipContent
        sideOffset={0}
        className="bg-black text-white -mb-2 ml-0.5"
      >
        {showPassword ? "Hide password" : "Show password"}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <ULThemeFloatingLabelField
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={passwordButton}
    />
  );
};

ULThemePasswordField.displayName = "ULThemePasswordField";
