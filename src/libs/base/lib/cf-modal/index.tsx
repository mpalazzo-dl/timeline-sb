"use client";

import { useEffect, useState } from "react";

import type { CfFetchById, CfBaseComponent } from "@aces/types";
import { HubSpotFormProps, PardotFormProps } from "@aces/features";

import { CfModalUI } from "./ui";
import { fetchModalData } from "./services";
import { CfRichTextSectionUIProps } from "../cf-rich-text-section";

export interface CfModalProps extends CfFetchById {}

export interface CfModalUIProps extends CfBaseComponent {
  modalHeader?: string;
  modalBodyCollection: {
    items: (PardotFormProps | HubSpotFormProps | CfRichTextSectionUIProps)[];
  };
}

export const CfModal = ({ id, preview, lang }: CfModalProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchModalData(id, preview, lang);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, preview, lang]);

  if (loading || !data) {
    return null;
  }

  return (
    <CfModalUI
      internalTitle={data.internalTitle}
      modalHeader={data.modalHeader}
      modalBodyCollection={data.modalBodyCollection}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
