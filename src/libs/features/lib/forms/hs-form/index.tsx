"use client";

import { useEffect, useRef, useState } from "react";
import { Global } from "@emotion/react";

import { useTheme } from "@aces/hooks";
import { generateId } from "@aces/utils";
import { Box } from "@aces/ui";

import { FormSkeleton } from "../skeleton";
import { createHSFormStyle } from "./styles";

export interface HubSpotFormProps {
  internalTitle: string;
  hsPortalId: string;
  hsFormId: string;
  __typename?: string;
}

export const HubSpotForm = ({
  internalTitle,
  hsPortalId,
  hsFormId,
}: HubSpotFormProps) => {
  const theme = useTheme();

  const [formLoaded, setFormLoaded] = useState(false);
  const formRef = useRef(null);

  const id = `hsForm${hsFormId}`;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/shell.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: hsPortalId,
          formId: hsFormId,
          target: `#${id}`,
          onFormReady: () => {
            setFormLoaded(true);
          },
        });
      }
    });
  }, [hsFormId, hsPortalId, id]);

  return (
    <Box id={generateId(internalTitle)} ref={formRef} style={{ width: "100%" }}>
      <Global
        styles={createHSFormStyle({
          theme,
          id,
        })}
      />
      {!formLoaded && <FormSkeleton />}
      <Box id={id}></Box>
    </Box>
  );
};
