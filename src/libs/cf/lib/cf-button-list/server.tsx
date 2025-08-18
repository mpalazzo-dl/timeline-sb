import type { CfFetchById } from "@aces/types";

import { CfButtonListUI } from "./ui";
import { fetchButtonListData } from "./services";
import { CfButtonListSkeleton } from "./skeleton";

export interface CfButtonListServerProps extends CfFetchById {}

export const CfButtonListServer = async ({
  id,
  preview,
  lang,
}: CfButtonListServerProps) => {
  let data;

  try {
    data = await fetchButtonListData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfButtonListSkeleton />;
  }

  if (!data) {
    return <CfButtonListSkeleton />;
  }

  return (
    <CfButtonListUI
      internalTitle={data.internalTitle}
      buttonStyle={data.buttonStyle}
      buttonsCollection={data.buttonsCollection}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
