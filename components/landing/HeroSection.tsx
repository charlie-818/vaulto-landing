"use client";

import Image from "next/image";
import { CompanyLogoArc } from "@/components/landing/CompanyLogoArc";
import { Button } from "@/components/landing/Button";
import { PLATFORM_URL } from "@/lib/config";

export function HeroSection() {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[111svh] sm:min-h-[calc(100dvh+91px)] flex-col items-center justify-center -mt-[91px] pt-[91px] overflow-hidden px-6 lg:pl-6 lg:pr-12 pb-[6svh] sm:pb-0">
      {/* Mobile radial gradient backdrop */}
      <div className="sm:hidden absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(59,130,246,0.18)_0%,transparent_65%)]" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-gradient-shift absolute -inset-[100%] opacity-30 sm:opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-blue-400/15 to-cyan-500/15 blur-3xl" />
        </div>
      </div>

      {/* Floating orbs - more visible on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float-1 absolute left-[10%] top-[20%] h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64 rounded-full bg-gradient-to-br from-blue-500/15 sm:from-blue-500/10 to-blue-400/15 sm:to-blue-400/10 blur-3xl" />
        <div className="animate-float-2 absolute right-[10%] top-[55%] h-52 w-52 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-gradient-to-br from-blue-400/15 sm:from-blue-400/10 to-cyan-500/15 sm:to-cyan-500/10 blur-3xl" />
        <div className="animate-float-3 absolute bottom-[25%] left-[50%] h-44 w-44 sm:h-48 sm:w-48 md:h-72 md:w-72 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />
      </div>

      {/* Decorative rings - mobile only */}
      <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-500/10 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[380px] h-[380px] rounded-full border border-cyan-500/5" />
        <div className="absolute w-[480px] h-[480px] rounded-full border border-blue-400/5" />
      </div>

      {/* Content */}
      <div className="animate-fade-in-up relative z-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 sm:gap-10 lg:gap-12 items-center max-w-[95rem] mx-auto w-full">
        {/* Left: Text content */}
        <div className="flex flex-col sm:block text-center lg:text-left sm:pt-4 lg:pt-0 xl:pl-12">
          {/* Backed By */}
          <div className="animate-fade-in-up animation-delay-100 mb-5 sm:-mb-1 lg:-mt-8 lg:mb-8 flex items-center justify-center lg:justify-start gap-4 sm:gap-5">
            <span className="text-lg sm:text-lg lg:text-xl font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Backed By
            </span>
            <Image
              src="/partners/ucla-blue.png"
              alt="UCLA"
              width={600}
              height={282}
              className="h-12 sm:h-12 lg:h-14 w-auto"
            />
          </div>

          {/* Tagline — serif two-tone display headline */}
          <h1 className="animate-fade-in-up animation-delay-200 mb-6 font-display font-semibold tracking-tight leading-[1.05]">
            <span className="block whitespace-nowrap text-[7.2vw] sm:text-5xl md:text-[3.25rem] lg:text-[clamp(2.5rem,4vw,4rem)] text-[var(--display-muted)]">
              Trade private companies
            </span>
            <span className="block whitespace-nowrap text-[7.2vw] sm:text-5xl md:text-[3.25rem] lg:text-[clamp(2.5rem,4vw,4rem)] text-gradient-accent pb-2">
              before they go public
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animation-delay-400 mb-8 sm:mb-10 max-w-[340px] sm:max-w-lg lg:max-w-2xl text-lg sm:text-xl lg:text-2xl text-[var(--muted)] mx-auto lg:mx-0">
            <span className="sm:hidden">
              Positions on the world&apos;s top private companies, priced by prediction markets.
            </span>
            <span className="hidden sm:inline">
              Take a position on the implied valuations of OpenAI, Anthropic, Stripe and
              more of the world&apos;s top private companies — priced in real time by
              prediction markets, tradable any time.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-500 order-2 max-sm:mt-10 flex flex-col gap-4 sm:flex-row items-center lg:items-start justify-center lg:justify-start">
            <Button href={`${PLATFORM_URL}/sign-in`} size="lg" fullWidthMobile>
              Launch Platform
            </Button>
            <div className="hidden sm:block">
              <Button variant="secondary" size="lg" onClick={scrollToHowItWorks}>
                See how it works
              </Button>
            </div>
          </div>

          {/* Mobile-only trust microline + curved logo social proof under the CTA */}
          <p className="sm:hidden order-3 animate-fade-in-up animation-delay-500 mt-3 text-xs text-[var(--muted)]">
            Free early access — no commitment.
          </p>
          <div className="sm:hidden order-1 animate-fade-in-up animation-delay-600 mt-8">
            <CompanyLogoArc />
          </div>

        </div>

        {/* Right: Demo image - Desktop only */}
        <div className="hidden lg:block animate-fade-in-up animation-delay-400 relative xl:-ml-[6%]">
          <Image
            src="/demo-hero.png"
            alt="Vaulto Platform"
            width={2400}
            height={1560}
            priority
            sizes="(max-width: 1024px) 0px, 55vw"
            className="w-[85%] xl:w-[95%] max-w-none"
          />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/5 to-blue-500/5 blur-3xl" />
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-400/5 blur-3xl" />
    </section>
  );
}
