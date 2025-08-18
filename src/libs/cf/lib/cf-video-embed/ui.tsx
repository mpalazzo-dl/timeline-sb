import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId } from "@aces/utils";
import { componentSpacing } from "@aces/theme";
import { Box, Container } from "@aces/ui";

import { CfVideoEmbedUIProps } from ".";
import style from "./style.module.css";

export const CfVideoEmbedUI = ({
  internalTitle,
  embedCode,
  nested,
  __typename,
  id,
  lang,
}: CfVideoEmbedUIProps) => {
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{
        xs: !nested ? componentSpacing.xs : 0,
        md: !nested ? componentSpacing.md : 0,
      }}
    >
      <Container nested={nested}>
        <div
          dangerouslySetInnerHTML={{
            __html: embedCode,
          }}
          className={style.videoEmbed}
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "embed",
            locale: lang,
          })}
        />
      </Container>
    </Box>
  );
};
