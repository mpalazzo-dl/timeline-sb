"use client";

import { useEffect, useState } from "react";

import { CfTestimonialsWrapperProps } from ".";
import { fetchTestimonialsData } from "./services";
import { CfTestimonialsSkeleton } from "./skeleton";
import { CfTestimonialsUI } from "./ui";

export const CfTestimonalsClient = ({
  id,
  preview,
  lang,
}: CfTestimonialsWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTestimonialsData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

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
