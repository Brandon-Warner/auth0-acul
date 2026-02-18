import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Error, LoginPasswordOptions } from "@auth0/auth0-acul-js/types";

import Captcha from "@/components/Captcha/index";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { applyAuth0Theme } from "@/utils/theme";

import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

function LoginPasswordScreen() {
  const {
    loginPasswordInstance,
    handleLoginPassword,
    screen,
    transaction,
    locales,
  } = useLoginPasswordManager();

  const [showPassword, setShowPassword] = useState(false);

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginPasswordInstance);

  // Set page title
  document.title = screen.texts?.pageTitle || locales.page.title;

  const { texts, data, links, isCaptchaAvailable, captcha, resetPasswordLink } =
    screen;
  const { isForgotPasswordEnabled, passwordPolicy, allowedIdentifiers } =
    transaction;

  const form = useForm<LoginPasswordOptions>({
    defaultValues: {
      username: data?.username || "",
      password: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const errors = loginPasswordInstance.getErrors();

  const buttonText = texts?.buttonText || locales.form.button;
  const passwordLabelText =
    texts?.passwordPlaceholder || locales.form.fields.password.label;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const forgotPasswordText =
    texts?.forgotPasswordText || locales.form.forgotPassword;
  const editText = texts?.editEmailText || locales.form.fields.username.edit;

  const generalErrors: Error[] =
    errors?.filter((error) => !error.field || error.field === null) || [];

  const usernameSDKError =
    getFieldError("username", errors) || getFieldError("email", errors);
  const passwordSDKError = getFieldError("password", errors);
  const captchaSDKError = getFieldError("captcha", errors);

  const { label: usernameLabel, type: usernameType } = getIdentifierDetails(
    allowedIdentifiers ?? undefined,
    texts
  );

  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const onSubmit = async (data: LoginPasswordOptions): Promise<void> => {
    await handleLoginPassword(data);
  };

  const editIdentifierLink = links?.edit_identifier || "";

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Left Decorative Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16">
        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <div
              className="inline-block p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl mb-6 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 leading-tight">
            Secure Access Portal
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            Enter your credentials to access your secure workspace. Your data is
            protected with enterprise-grade encryption.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/50 shadow-lg">
              <div className="text-emerald-600 font-semibold mb-1">
                256-bit Encryption
              </div>
              <div className="text-sm text-slate-600">
                Military-grade security
              </div>
            </div>
            <div className="flex-1 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-teal-200/50 shadow-lg">
              <div className="text-teal-600 font-semibold mb-1">
                24/7 Monitoring
              </div>
              <div className="text-sm text-slate-600">Always protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header with gradient accent */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="p-8 sm:p-12">
              {/* Logo or Title Area */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-600">
                  Sign in to continue to your account
                </p>
              </div>

              {/* Error Messages */}
              {generalErrors.length > 0 && (
                <div className="mb-6 space-y-3">
                  {generalErrors.map((error, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
                    >
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-red-700 font-medium">
                          {error.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Username Field */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="relative">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            {usernameLabel}
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type={usernameType}
                              value={data?.username || ""}
                              readOnly={true}
                              className={`w-full px-4 py-3.5 pl-12 bg-slate-50 border-2 ${
                                fieldState.error || usernameSDKError
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-slate-200 focus:border-teal-500"
                              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all duration-200 font-medium`}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <svg
                                className="w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            {editIdentifierLink && (
                              <a
                                href={editIdentifierLink}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                              >
                                {editText}
                              </a>
                            )}
                          </div>
                          {(fieldState.error || usernameSDKError) && (
                            <p className="mt-2 text-sm text-red-600 font-medium">
                              {usernameSDKError || fieldState.error?.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: locales.form.fields.password.required,
                      minLength: passwordPolicy?.minLength
                        ? {
                            value: passwordPolicy.minLength,
                            message:
                              locales.form.fields.password.minLength.replace(
                                "{minLength}",
                                String(passwordPolicy.minLength)
                              ),
                          }
                        : undefined,
                    }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="relative">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            {passwordLabelText}
                          </label>
                          <div className="relative">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              autoFocus={true}
                              autoComplete="current-password"
                              className={`w-full px-4 py-3.5 pl-12 pr-12 bg-slate-50 border-2 ${
                                fieldState.error || passwordSDKError
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-slate-200 focus:border-teal-500"
                              } rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all duration-200 font-medium`}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <svg
                                className="w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          {(fieldState.error || passwordSDKError) && (
                            <p className="mt-2 text-sm text-red-600 font-medium">
                              {passwordSDKError || fieldState.error?.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* CAPTCHA */}
                  {isCaptchaAvailable && captchaConfig && (
                    <div className="pt-2">
                      <Captcha
                        control={form.control}
                        name="captcha"
                        captcha={captchaConfig}
                        {...captchaProps}
                        sdkError={captchaSDKError}
                        rules={{
                          required: locales.form.fields.captcha.required,
                        }}
                      />
                    </div>
                  )}

                  {/* Forgot Password Link */}
                  {isForgotPasswordEnabled && resetPasswordLink && (
                    <div className="text-right">
                      <a
                        href={resetPasswordLink}
                        className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                      >
                        {forgotPasswordText}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>{buttonText}</span>
                          <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </button>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-teal-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPasswordScreen;
