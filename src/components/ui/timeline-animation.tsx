"use client";
import { motion } from "motion/react";
import React from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef?: React.RefObject<any>;
  customVariants?: any;
  className?: string;
  as?: any;
}

export const TimelineContent = ({
  children,
  animationNum,
  customVariants,
  className,
  as,
}: TimelineContentProps) => {
  const ComponentType = as === "p" ? motion.p : as === "span" ? motion.span : motion.div;
  
  return (
    <ComponentType
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={customVariants}
      custom={animationNum}
      className={className}
    >
      {children}
    </ComponentType>
  );
};
