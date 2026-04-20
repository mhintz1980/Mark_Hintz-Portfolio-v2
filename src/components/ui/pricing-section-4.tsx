"use client";
import { Card, CardContent, CardHeader } from "./card";
import { Sparkles } from "./sparkles";
import { TimelineContent } from "./timeline-animation";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { cn } from "../../lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "CAD Automation",
    description:
      "Stop doing manually what a macro can do in seconds. Automation that eliminates repetitive tasks and enforces standards.",
    price: 85,
    yearlyPrice: 6500,
    buttonText: "Get a quote",
    buttonVariant: "outline" as const,
    includes: [
      "SolidWorks · PDM · Design Tables",
      "SolidWorks macros & API automation",
      "PDM Vault workflow optimization",
      "Design Table systems & configurators",
      "Drawing package automation",
    ],
  },
  {
    name: "AI Integration",
    description:
      "The rare engineer who can build the AI tool AND understand the mechanical context it operates in. Custom tooling for engineering.",
    price: 100,
    yearlyPrice: 8500,
    buttonText: "Discuss your project",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Python · Claude SDK · Custom Tooling",
      "Custom AI agents for engineering workflows",
      "Natural language interfaces for CAD/PDM",
      "Automated reporting & documentation",
      "Intelligent design review tooling",
    ],
  },
  {
    name: "Design Review & DFM",
    description:
      "15+ years on the shop floor means I catch what CAD-only designers miss. Delivered as actionable redlines.",
    price: 75,
    yearlyPrice: 4000,
    buttonText: "Request a review",
    buttonVariant: "outline" as const,
    includes: [
      "SolidWorks · GD&T · Manufacturing",
      "DFM/DFA analysis & redlines",
      "GD&T review & correction",
      "Tolerance stack-up analysis",
      "Drawing package audit",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-neutral-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10  rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-linear-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-20">Hourly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full  rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-linear-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-20 flex items-center gap-2">Project (Est)</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection4() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className=" mx-auto relative bg-transparent overflow-hidden rounded-3xl border border-white/10"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-full w-full overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[70px_80px] "></div>
        <Sparkles
          density={800}
          direction="bottom"
          speed={1}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full mask-[radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <article className="text-center mb-6 pt-24 max-w-3xl mx-auto space-y-4 relative z-50">
        <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.1}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center "
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0, 
            }}
          >
            Specialized Capabilities
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
        >
          Available for hourly consulting, or fixed-price project retainers. Explore the services that best fit your team.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div
        className="absolute bottom-0 left-[10%] right-[10%] w-[80%] h-1/2 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at bottom center, #206ce8 0%, transparent 60%)
      `,
          opacity: 0.15,
        }}
      />

      <div className="grid md:grid-cols-3 max-w-[1200px] gap-8 py-16 px-8 mx-auto relative z-20">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex h-full"
          >
            <Card
              className={`relative text-white border-neutral-800 w-full flex flex-col ${
                plan.popular
                  ? "bg-linear-to-b from-neutral-900 to-[#0a0a0a] shadow-[0px_0px_50px_0px_rgba(9,0,255,0.15)] z-20 scale-105 border-neutral-700"
                  : "bg-linear-to-b from-[#111] to-[#0a0a0a] z-10"
              }`}
            >
              <CardHeader className="text-left flex-none">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30 font-semibold uppercase tracking-wider">Most Popular</span>}
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-black tracking-tighter">
                    $
                    <NumberFlow
                      format={{
                        currency: "USD",
                      }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-5xl font-black"
                    />
                  </span>
                  <span className="text-gray-400 ml-2 font-medium">
                    {isYearly ? "/project" : "/hr"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-1">
                <button
                  className={`w-full mb-8 p-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white border border-blue-500"
                      : "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-6 border-t border-white/5 flex-1">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="shrink-0 h-4 w-4 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-sm text-gray-400 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
