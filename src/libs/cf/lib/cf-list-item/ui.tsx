import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId } from "@aces/utils";
import { palette, shape } from "@aces/theme";
import { Box, Col, Container, FlexBox, H5, Row } from "@aces/ui";
import { CfImageCover, CfRichTextRender } from "@aces/base";
import { CfListItemUIProps } from "@aces/cf";

export const CfListItemUI = ({
  internalTitle,
  headline,
  bodyCopy,
  listCopy,
  columns,
  media,
  preview,
  __typename,
  id,
  lang,
}: CfListItemUIProps) => {
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: 15, md: 20 }}
    >
      <Container>
        <FlexBox
          style={{ borderTop: `1px solid ${palette.border.light}` }}
          paddingTop={{ xs: 12, md: 20 }}
        >
          <Row columnSpacing={32} rowSpacing={8}>
            <Col size={{ xs: 12, md: 7 }}>
              <FlexBox flexDirection={"column"} gap={8}>
                <H5
                  marginTop={5}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "headline",
                    locale: lang,
                  })}
                >
                  {headline}
                </H5>
                <CfRichTextRender
                  lang={lang}
                  preview={preview}
                  richTextDocument={bodyCopy.json}
                  {...ContentfulLivePreview.getProps({
                    entryId: id,
                    fieldId: "bodyCopy",
                    locale: lang,
                  })}
                />
                {listCopy && (
                  <CfRichTextRender
                    lang={lang}
                    preview={preview}
                    richTextDocument={listCopy.json}
                    columns={`${columns} auto`}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "listCopy",
                      locale: lang,
                    })}
                  />
                )}
              </FlexBox>
            </Col>
            <Col size={{ xs: 12, md: 5 }}>
              <CfImageCover
                render="ui"
                id={media.id}
                image={media.image}
                altText={media.altText}
                internalTitle={media.internalTitle}
                lang={lang}
                preview={preview}
                coverHeight={320}
                borderRadius={shape.borderRadius}
                nested
                __typename={media.__typename}
              />
            </Col>
          </Row>
        </FlexBox>
      </Container>
    </Box>
  );
};
