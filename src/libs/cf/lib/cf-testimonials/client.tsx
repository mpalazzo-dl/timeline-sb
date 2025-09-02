"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";

import { CfTestimonialsWrapperProps } from ".";
import { fetchTestimonialsData } from "./services";
import { CfTestimonialsSkeleton } from "./skeleton";
import { CfTestimonialsUI } from "./ui";

export const CfTestimonalsClient = ({
  id,
  preview,
  lang,
}: CfTestimonialsWrapperProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTestimonialsData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfTestimonialsSkeleton />;

  return (
    <CfTestimonialsUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      testimonials={data.testimonialsCollection?.items}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
