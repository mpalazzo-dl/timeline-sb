import { CfImage, CfRichTextSection } from "@aces/base";

import {
  CfAccordions,
  CfBanner,
  CfCallout,
  CfCodeEmbed,
  CfFeatureHighlight,
  CfForm,
  CfGrid,
  CfHeader,
  CfHeroBanner,
  CfListItem,
  CfLockup,
  CfTeamListing,
  CfTestimonials,
  CfVideoEmbed,
} from "@aces/cf";

import { CfBaseComponent } from "@aces/types";

export interface PageBodyItem extends CfBaseComponent {}

export type PageBodyItems = PageBodyItem[];

export interface PageBodyProps
  extends Pick<CfBaseComponent, "preview" | "lang"> {
  items: PageBodyItems;
}

export const PageBody = ({ items, preview, lang }: PageBodyProps) => {
  if (!items) {
    return null;
  }
  console.log(items);
  return (
    <>
      {items.map((item, index) => {
        const typename = item.__typename;

        if (!typename) {
          return null;
        }

        switch (typename) {
          case "Accordions":
            return (
              <CfAccordions
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Banner":
            return (
              <CfBanner
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Callout":
            return (
              <CfCallout
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "CodeEmbed":
            return (
              <CfCodeEmbed
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "FeatureHighlight":
            return (
              <CfFeatureHighlight
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Form":
            return (
              <CfForm
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Grid":
            return (
              <CfGrid
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Header":
            return (
              <CfHeader
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "HeroBanner":
            return (
              <CfHeroBanner
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Image":
            return (
              <CfImage
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "ListItem":
            return (
              <CfListItem
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Lockup":
            return (
              <CfLockup
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "RichTextSection":
            return (
              <CfRichTextSection
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "TeamListing":
            return (
              <CfTeamListing
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "Testimonials":
            return (
              <CfTestimonials
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );
          case "VideoEmbed":
            return (
              <CfVideoEmbed
                render="client"
                id={item?.sys?.id || ""}
                preview={preview}
                lang={lang}
                key={index}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};
