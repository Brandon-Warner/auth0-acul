import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

const AlternativeLogins = () => {
  const {
    handleFederatedLogin,
    handlePasskeyLogin,
    screen,
    transaction,
    locales,
  } = useLoginIdManager();
  const { texts } = screen;
  const { isPasskeyEnabled, showPasskeyAutofill, alternateConnections } =
    transaction;

  const connections = alternateConnections as SocialConnection[] | undefined;

  // Handle text fallbacks using locales
  const passkeyButtonText =
    texts?.passkeyButtonText || locales.form.passkeyButton;

  // Only show passkey button if passkeys are enabled AND autofill is NOT active
  // When showPasskeyAutofill is true, passkey selection happens via input autocomplete
  const showPasskeyButton = isPasskeyEnabled && !showPasskeyAutofill;

  const hasAlternatives =
    showPasskeyButton || (connections && connections.length > 0);

  if (!hasAlternatives) {
    return null;
  }

  return (
    <div className="relative my-8">
      {/* Decorative divider with text */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Passkey special treatment */}
      {showPasskeyButton && (
        <div className="mb-4">
          <button
            onClick={() => handlePasskeyLogin()}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 active:scale-[0.98]"
          >
            <div className="relative flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-50 group-hover:to-purple-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                {getIcon()}
              </div>
              <span className="text-base font-semibold text-gray-800 transition-colors group-hover:text-purple-700">
                {passkeyButtonText}
              </span>
              <div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30 bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            </div>
          </button>
        </div>
      )}

      {/* Social providers grid */}
      {connections && connections.length > 0 && (
        <div
          className={`grid gap-3 ${
            connections.length === 1
              ? "grid-cols-1"
              : connections.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
          }`}
        >
          {connections.map((connection: SocialConnection) => {
            const { displayName, iconComponent } =
              getSocialProviderDetails(connection);
            const socialButtonText = `${locales.social.continueWith} ${displayName}`;

            return (
              <button
                key={connection.name}
                onClick={() => handleFederatedLogin(connection.name)}
                className="group relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                title={socialButtonText}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Content */}
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 transition-all duration-300 group-hover:bg-white group-hover:scale-110 group-hover:shadow-md">
                    {iconComponent}
                  </div>
                  <span className="text-xs font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                    {displayName}
                  </span>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
              </button>
            );
          })}
        </div>
      )}

      {/* Decorative corner accents */}
      <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl"></div>
      <div className="absolute -bottom-4 -right-4 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400/20 to-indigo-400/20 blur-xl"></div>
    </div>
  );
};

export default AlternativeLogins;
