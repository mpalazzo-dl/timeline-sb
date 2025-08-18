import { defaultLocale } from "@aces/i18n";
import { CfImage, CfRichTextSection, CfButton } from "@aces/base";

import {
  CfAccordions,
  CfBanner,
  CfCodeEmbed,
  CfForm,
  CfHeader,
  CfHeroBanner,
  CfGrid,
  CfLockup,
  CfVideoEmbed,
  CfTestimonials,
  CfTeamListing,
  CfCallout,
  CfFeatureHighlight,
} from "@aces/cf";

export const EntriesPreview = ({
  item,
  preview = true,
  lang = defaultLocale,
}: any) => {
  if (item === null) {
    return null;
  }

  const typename = item.__typename;

  switch (typename) {
    case "Accordions":
      return (
        <CfAccordions
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Banner":
      return (
        <CfBanner
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "CodeEmbed":
      return (
        <CfCodeEmbed
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Form":
      return (
        <CfForm
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Header":
      return (
        <CfHeader
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "CfHeroBanner":
      return (
        <CfHeroBanner
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Image":
      return (
        <CfImage
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "GridUpdated":
      return (
        <CfGrid
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Lockup":
      return (
        <CfLockup
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "RichTextSection":
      return (
        <CfRichTextSection
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "VideoEmbed":
      return (
        <CfVideoEmbed
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Testimonials":
      return (
        <CfTestimonials
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "TeamListing":
      return (
        <CfTeamListing
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Callout":
      return (
        <CfCallout
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "FeatureHighlight":
      return (
        <CfFeatureHighlight
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    case "Button":
      return (
        <CfButton
          render="server"
          id={item?.sys?.id || ""}
          preview={preview}
          lang={lang}
        />
      );
    default:
      return null;
  }
};
