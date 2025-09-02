"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";
import { CfFetchById } from "@aces/types";

import { CfButtonListUI } from "./ui";
import { fetchButtonListData } from "./services";
import { CfButtonListSkeleton } from "./skeleton";

export const CfButtonClient = ({ id, preview, lang }: CfFetchById) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchButtonListData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

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
