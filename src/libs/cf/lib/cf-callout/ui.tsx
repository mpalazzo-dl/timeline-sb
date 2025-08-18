import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId, isLast } from "@aces/utils";
import { componentSpacing, palette } from "@aces/theme";
import { Box, Col, Container, FlexBox, H3, Icon, Row, Text } from "@aces/ui";

import { CfCalloutUIProps } from ".";
import { CfImage, CfRichTextRender, CfButton } from "@aces/base";

export const CfCalloutUI = ({
  internalTitle,
  headline,
  bodyCopy,
  tags,
  buttonsCollection,
  media,
  __typename,
  id,
  lang,
  preview,
}: CfCalloutUIProps) => {
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: componentSpacing.lg, md: componentSpacing.xl }}
    >
      <Container>
        <Box
          paddingY={{ xs: 16, md: 20 }}
          paddingX={{ xs: 8, md: 20 }}
          style={{
            background: palette.tertiary.grayblue,
            borderRadius: "10px",
          }}
        >
          <Row alignItems={"center"} rowSpacing={4}>
            <Col size={{ xs: 12, md: 7 }}>
              <FlexBox
                justifyContent={"center"}
                flexDirection={"column"}
                gap={5}
              >
                {headline && (
                  <H3
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "headline",
                      locale: lang,
                    })}
                  >
                    {headline}
                  </H3>
                )}
                {bodyCopy && (
                  <CfRichTextRender
                    richTextDocument={bodyCopy.json}
                    lang={lang}
                    preview={preview}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "bodyCopy",
                      locale: lang,
                    })}
                  />
                )}
                {tags && (
                  <FlexBox
                    flexWrap={"wrap"}
                    {...ContentfulLivePreview.getProps({
                      entryId: id,
                      fieldId: "tags",
                      locale: lang,
                    })}
                  >
                    {tags.map((tag, index) => {
                      return (
                        <FlexBox
                          key={generateId(`${tag}-${index}`)}
                          alignItems={"center"}
                        >
                          <Text.SubtitleSmall>{tag}</Text.SubtitleSmall>
                          {!isLast(tags, index) && (
                            <Icon
                              icon="Star"
                              color={palette.success.main}
                              size={16}
                              marginX={2}
                            />
                          )}
                        </FlexBox>
                      );
                    })}
                  </FlexBox>
                )}
                {buttonsCollection && buttonsCollection?.items.length ? (
                  <FlexBox gap={4} flexWrap={"wrap"} marginTop={5}>
                    {buttonsCollection.items.map((button) => (
                      <CfButton
                        render="ui"
                        key={generateId(button.internalTitle)}
                        internalTitle={button.internalTitle}
                        title={button.title}
                        link={button.link}
                        buttonStyle={button.buttonStyle}
                        rightIcon={button.rightIcon}
                        __typename={button.__typename}
                        id={button?.sys?.id || ""}
                        preview={preview}
                        lang={lang}
                      />
                    ))}
                  </FlexBox>
                ) : (
                  <></>
                )}
              </FlexBox>
            </Col>
            {media && (
              <Col size={{ xs: 8, md: 2.5 }} offset={{ xs: 0, md: 2.5 }}>
                <CfImage
                  render="ui"
                  internalTitle={media.internalTitle}
                  image={media.image}
                  altText={media.altText}
                  nested={true}
                  __typename={media.__typename}
                  id={id}
                  lang={lang}
                  preview={preview}
                />
              </Col>
            )}
          </Row>
        </Box>
      </Container>
    </Box>
  );
};
