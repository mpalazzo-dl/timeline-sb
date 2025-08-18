"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { CfButtonListUI } from "./ui";
import { fetchButtonListData } from "./services";
import { CfButtonListSkeleton } from "./skeleton";

export const CfButtonClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchButtonListData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfButtonListSkeleton />;
  console.log(data);

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
