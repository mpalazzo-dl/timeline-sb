import {
  CfFetchById,
  CfBaseComponent,
  CfImageProps,
  CfRichText,
  CfRenderMode,
} from "@aces/types";

import { CfTestimonialsServer } from "./server";
import { CfTestimonalsClient } from "./client";
import { CfTestimonialsUI } from "./ui";
import { CfTestimonialsSkeleton } from "./skeleton";

export type CfTestimonialsProps =
  | ({ render?: "server" | "client" } & CfTestimonialsWrapperProps)
  | ({ render: "ui" } & CfTestimonialsUIProps)
  | { render: "skeleton" };

export interface CfTestimonialsWrapperProps extends CfFetchById {}

export interface TestimonialUIProps {
  name: string;
  role: string;
  description: CfRichText;
  profileImage: CfImageProps;
  id: string;
  lang: string;
  preview: boolean;
}

export interface CfTestimonialsUIProps extends CfBaseComponent {
  headline?: string;
  testimonials: TestimonialUIProps[];
}

export const CfTestimonials = ({
  render = "server",
  ...props
}: CfTestimonialsProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return (
        <CfTestimonialsServer {...(props as CfTestimonialsWrapperProps)} />
      );
    case "client":
      return <CfTestimonalsClient {...(props as CfTestimonialsWrapperProps)} />;
    case "ui":
      return <CfTestimonialsUI {...(props as CfTestimonialsUIProps)} />;
    case "skeleton":
      return <CfTestimonialsSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
