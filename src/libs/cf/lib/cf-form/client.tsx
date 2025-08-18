"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { fetchFormData } from "./services";
import { CfFormSkeleton } from "./skeleton";
import { CfFormUI } from "./ui";

export const CfFormClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchFormData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfFormSkeleton />;
  console.log(data);

  return (
    <CfFormUI
      internalTitle={data.internalTitle}
      form={data.form}
      headline={data.headline}
      subhead={data.subhead}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
