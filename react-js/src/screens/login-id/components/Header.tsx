import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Header() {
  const { screen, locales } = useLoginIdManager();
  const { texts } = screen;

  // Use SDK texts with locale fallbacks
  const logoAltText = texts?.logoAltText || locales.header.logoAlt;
  const title = texts?.title || locales.header.title;
  const description = texts?.description || locales.header.description;

  return (
    <div className="relative">
      {/* Subtle gradient glow behind header */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 blur-2xl -z-10"></div>

      <div className="relative">
        <ULThemeLogo altText={logoAltText} />
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text">
          <ULThemeTitle className="text-transparent">{title}</ULThemeTitle>
        </div>
        <ULThemeSubtitle className="text-gray-600">
          {description}
        </ULThemeSubtitle>
      </div>
    </div>
  );
}

export default Header;
