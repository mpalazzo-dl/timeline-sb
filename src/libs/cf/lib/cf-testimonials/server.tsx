"use server";

import { CfTestimonialsWrapperProps } from ".";
import { CfTestimonialsUI } from "./ui";
import { fetchTestimonialsData } from "./services";
import { CfTestimonialsSkeleton } from "./skeleton";

export const CfTestimonialsServer = async ({
  id,
  preview,
  lang,
}: CfTestimonialsWrapperProps) => {
  let data;

  try {
    data = await fetchTestimonialsData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfTestimonialsSkeleton />;
  }

  if (!data) {
    return <CfTestimonialsSkeleton />;
  }

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
