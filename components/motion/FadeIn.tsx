"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (dir: Direction) => {
  switch (dir) {
    case "up": return { y: 28 };
    case "down": return { y: -28 };
    case "left": return { x: 28 };
    case "right": return { x: -28 };
    default: return {};
  }
};

/**
 * Fades content in when it scrolls into view and fades it back out when it
 * leaves — a smooth, professional reveal used across the whole site.
 * `once={false}` (the default) is what produces the fade-OUT on scroll away.
 */
export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = false,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : offset(direction)) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap a group of `<FadeInItem>` children to reveal them one after another.
 */
export function FadeInStagger({
  children,
  className,
  once = false,
  gap = 0.12,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...(reduce ? {} : offset(direction)) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
