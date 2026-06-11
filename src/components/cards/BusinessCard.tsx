"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

type BusinessCardProps = {
  name: string;
  tags?: string[];
  description?: string;
  logoSrc?: string;
  website?: string;
  ctaLabel?: string;
};

export default function BusinessCard({
  name,
  tags,
  description,
  logoSrc,
  website,
  ctaLabel = "Visiter le site",
}: BusinessCardProps) {
  const [canHover, setCanHover] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverCapability = () => {
      setCanHover(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsRevealed(false);
      }
    };

    updateHoverCapability();
    mediaQuery.addEventListener("change", updateHoverCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverCapability);
    };
  }, []);

  const handleCardTap = () => {
    if (!canHover) {
      setIsRevealed(!isRevealed);
    }
  };

  const cardVariants = {
    rest: {},
    hover: {},
  };

  const filterVariants = {
    rest: { opacity: 0 },
    hover: {  opacity: 1, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    rest: { opacity: 1, y: 200 },
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
    <div className="min-h-[55vh] md:min-h-[85vh] w-full h-full flex items-center justify-center px-4 sm:py-10 sm:px-6">
      <motion.article
        initial="rest"
        animate={canHover ? "rest" : isRevealed ? "hover" : "rest"}
        whileHover={canHover ? "hover" : undefined}
        onClick={handleCardTap}
        variants={cardVariants}
        className="w-full max-w-4xl rounded-2xl border border-border bg-white/5 p-4 sm:p-8 sm:pt-44 shadow-lg backdrop-blur-md overflow-hidden cursor-pointer md:cursor-default"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center h-110 sm:h-full">
          {logoSrc ? (
            <div className="shrink-0">
              <Image
                src={logoSrc}
                alt={name + " logo"}
                fill={true}
                className="rounded-lg object-cover absolute"
              />
              {/* Overlay à enlever lors de l'ajout des vrais photos */}
              <span className="absolute inset-0 bg-black/20 rounded-lg" />
              <motion.span
                variants={filterVariants}
                className="absolute inset-0 bg-black/35 rounded-lg"
              />
            </div>
          ) : null}

          <motion.div
            variants={contentVariants}
            className="flex flex-1 flex-col justify-end self-end z-10"
          >
            <h3 className="text-5xl sm:text-8xl text-background font-title">{name}</h3>
            <span className="h-0.5 w-full rounded-full bg-background mb-2" />
            {tags && tags.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 bg-primary/80 px-3 py-1 text-xs font-medium tracking-[0.18em] text-background"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {description ? (
              <motion.p
                variants={descriptionVariants}
                className="mt-3 max-w-2xl text-sm sm:text-base text-background line-clamp-6"
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
