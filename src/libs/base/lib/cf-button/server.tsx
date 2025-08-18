"use server";

import type { CfFetchById } from "@aces/types";

import { CfButtonUI } from "./ui";
import { fetchButton } from "./services";
import { CfButtonSkeleton } from "./skeleton";

export const CfButtonServer = async ({ id, preview, lang }: CfFetchById) => {
  let data;

  try {
    data = await fetchButton(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfButtonSkeleton />;
  }

  if (!data) {
    return <CfButtonSkeleton />;
  }

  return (
    <CfButtonUI
      internalTitle={data.internalTitle}
      title={data.title}
      link={data.link}
      buttonStyle={data.buttonStyle}
      rightIcon={data.rightIcon}
      fullWidthMobile={data.fullWidthMobile}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
