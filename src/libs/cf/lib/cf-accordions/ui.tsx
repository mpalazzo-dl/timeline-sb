"use client";

import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId } from "@aces/utils";
import { useMediaQuery } from "@aces/hooks";
import { componentSpacing, palette } from "@aces/theme";
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  Box,
  Container,
  FlexBox,
} from "@aces/ui";

import { CfAccordionsUIProps } from ".";
import { CfRichTextRender, CfImage } from "@aces/base";

export const CfAccordionsUI = ({
  internalTitle,
  hideOnDesktop = false,
  defaultOpen = false,
  accordionsCollection,
  __typename,
  nested = false,
  id,
  preview,
  lang,
}: CfAccordionsUIProps) => {
  const { isLargerThanMd } = useMediaQuery();

  if (isLargerThanMd && hideOnDesktop) return null;

  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: componentSpacing.md, md: componentSpacing.lg }}
    >
      <Container nested={nested}>
        <Accordion
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "accordions",
            locale: lang,
          })}
        >
          {accordionsCollection.items.map((item) => (
            <AccordionItem
              key={generateId(item.internalTitle)}
              defaultExpanded={defaultOpen}
              style={{ marginBottom: 4 }}
            >
              <AccordionItemTrigger
                expandIconPosition="end"
                disableGutters={true}
                style={{
                  borderTop: `1px solid ${palette.border.light}`,
                  borderLeft: `1px solid ${palette.border.light}`,
                  borderRight: `1px solid ${palette.border.light}`,
                  borderBottom: `1px solid ${palette.border.default}`,
                  padding: 4,
                }}
              >
                <FlexBox alignItems={"center"} gap={8}>
                  {item.icon && (
                    <CfImage
                      render="ui"
                      id={item.icon.id}
                      image={item.icon.image}
                      altText={item.icon.altText}
                      internalTitle={item.icon.internalTitle}
                      nativeImageSize={true}
                      lang={lang}
                      preview={preview}
                      nested
                      __typename={item.icon.__typename}
                    />
                  )}
                  {item.headline}
                </FlexBox>
              </AccordionItemTrigger>
              <AccordionItemContent
                style={{
                  background: palette.grey[200],
                  paddingY: 6,
                  paddingX: 4,
                }}
              >
                <CfRichTextRender
                  richTextDocument={item.bodyCopy.json}
                  lang={lang}
                  preview={preview}
                />
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};
