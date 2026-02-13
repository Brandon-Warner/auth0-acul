import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ULThemeSocialProviderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  /**
   * The icon to be displayed in the social login button component
   */
  iconComponent: React.ReactNode | null;
  /**
   * The display Name to be displayed in the social login button component
   */
  displayName: string;
  /**
   * The button text to be displayed in the social login button component
   */
  buttonText: string;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
  /**
   * The icon to be displayed at the end of the social login button component
   */
  iconEnd?: React.ReactNode | null;
}

const ULThemeSocialProviderButton = ({
  onClick,
  variant = "outline",
  size = "default",
  iconComponent,
  iconEnd,
  displayName,
  buttonText,
  disabled = false,
  className,
  ...rest
}: ULThemeSocialProviderButtonProps) => {
  // Data Test Id needed for targetting element
  const dataTestId = `social-provider-button-${displayName.toLowerCase().replace(/\s+/g, "-")}`;

  // Base Styles getting applied for look and feel with modern gradient touch
  const baseStyles =
    "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] gap-x-4 transition-all duration-300";

  // Enhanced enable and disable styles with modern look
  const enabledStyles =
    "bg-white border-gray-300 text-gray-800 cursor-pointer hover:border-gray-400 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0";
  const disabledStyles =
    "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-60";

  // UL theme overrides with modern styling
  const variantThemeOverrides = {
    outline: cn(
      "border-2",
      "relative",
      "overflow-hidden",
      "theme-universal:font-button",
      "theme-universal:rounded-button",
      "theme-universal:focus:outline-none theme-universal:focus:ring-2 theme-universal:focus:ring-purple-500/50 theme-universal:focus:ring-offset-2"
    ),
    primary: "", // Add primary overrides if needed
    secondary: "", // Add secondary overrides if needed
    destructive: "", // Add destructive overrides if needed
    ghost: cn(
      "py-[2px]",
      "px-[2px]",
      "mb-[0px]",
      "theme-universal:font-button",
      "theme-universal:text-(--color-secondary-button-label)",
      "theme-universal:hover:shadow-[var(--button-hover-shadow)]",
      "theme-universal:focus:outline-none theme-universal:focus:ring-base-focus/15 theme-universal:focus:bg-base-focus/15"
    ),
    link: "", // Add link overrides if needed
  };

  // Combine all theme classes with proper type safety
  const themeClasses = cn(variant && variantThemeOverrides[variant]);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        baseStyles,
        disabled ? disabledStyles : enabledStyles,
        themeClasses,
        className
      )}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {iconComponent && (
        <span className="w-5 h-5 flex items-center justify-center">
          {iconComponent}
        </span>
      )}
      <span className="break-words text-base whitespace-normal text-left">
        {buttonText}
      </span>
      {iconEnd && <span className="shrink-0 ml-auto">{iconEnd}</span>}
    </Button>
  );
};

export default ULThemeSocialProviderButton;
