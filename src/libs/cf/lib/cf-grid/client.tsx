"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";
import { CfFetchByIdNested } from "@aces/types";

import { fetchGridData } from "./services";
import { CfGridSkeleton } from "./skeleton";
import { CfGridUI } from "./ui";

export const CfGridClient = ({
  id,
  preview,
  lang,
  nested,
}: CfFetchByIdNested) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchGridData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfGridSkeleton />;
  console.log(data);

  return (
    <CfGridUI
      internalTitle={data.internalTitle}
      showDividers={data.showDividers}
      gridColumnCount={data.gridColumnCount}
      gridItemsStyle={data.gridItemsStyle}
      verticalAlignment={data.verticalAlignment}
      listItems={data.listItemsCollection.items}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
