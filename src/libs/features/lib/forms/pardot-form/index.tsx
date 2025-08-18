"use client";

import { ResponsiveSpacing } from "@aces/types";
import { Box } from "@aces/ui";

export interface PardotFormProps {
  internalTitle: string;
  pardotFormIframe: string;
  height?: ResponsiveSpacing;
  __typename?: string;
}

export const PardotForm = ({ pardotFormIframe }: PardotFormProps) => {
  return (
    <Box style={{ width: "100%" }}>
      <div
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{ __html: pardotFormIframe }}
      />
    </Box>
  );
};
