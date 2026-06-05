"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

type BusinessCardProps = {
  name: string;
  description?: string;
  logoSrc?: string;
  website?: string;
  ctaLabel?: string;
};

export default function BusinessCard({
  name,
  description,
  logoSrc,
  website,
  ctaLabel = "Visiter le site",
}: BusinessCardProps) {
  const cardVariants = {
    rest: {},
    hover: {},
  };

  const filterVariants = {
    rest: { opacity: 0 },
    hover: {  opacity: 1, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    rest: { opacity: 0.8, y: 200 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const descriptionVariants = {
    rest: { opacity: 0, y: 8 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, delay: 0.05 },
    },
  };

  return (
    <div className="min-h-[75vh] md:min-h-[85vh] w-full h-full flex items-center justify-center px-4 py-10 sm:px-6">
      <motion.article
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={cardVariants}
        className="w-full max-w-4xl rounded-2xl border border-border bg-white/5 p-8 pt-44 shadow-lg backdrop-blur-md overflow-hidden"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {logoSrc ? (
            <div className="shrink-0">
              <Image
                src={logoSrc}
                alt={name + " logo"}
                fill={true}
                className="rounded-lg object-cover absolute"
              />
              <motion.span
                variants={filterVariants}
                className="absolute inset-0 bg-black/25 rounded-lg"
              />
            </div>
          ) : null}

          <motion.div
            variants={contentVariants}
            className="flex flex-1 flex-col justify-end self-end z-10 group"
          >
            <h3 className="text-8xl text-background font-title">{name}</h3>
            <span className="h-0.5 w-full rounded-full bg-background mb-2" />
            {description ? (
              <motion.p
                variants={descriptionVariants}
                className="mt-3 text-md text-background max-w-2xl"
              >
                {description}
              </motion.p>
            ) : null}

            <div className="mt-6 flex items-center gap-4">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="lg">
                    {ctaLabel}
                  </Button>
                </a>
              ) : (
                <Button variant="primary" size="lg">
                  {ctaLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export type { BusinessCardProps };
