import ULThemeLink from "@/components/ULThemeLink";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Footer() {
  const { screen, transaction, locales } = useLoginIdManager();
  const { texts, signupLink } = screen;
  const { isSignupEnabled } = transaction;

  if (!isSignupEnabled || !signupLink) {
    return null;
  }

  // Use SDK texts with locale fallbacks
  const footerText = texts?.footerText || locales.footer.text;
  const footerLinkText = texts?.footerLinkText || locales.footer.linkText;

  return (
    <div className="mt-6 text-left relative">
      {/* Decorative gradient line above footer */}
      <div className="absolute -top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"></div>

      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body text-gray-600">
        {footerText}
      </span>
      <ULThemeLink
        href={signupLink}
        className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline"
      >
        {footerLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
