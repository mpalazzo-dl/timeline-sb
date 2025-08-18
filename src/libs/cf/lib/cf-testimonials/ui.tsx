import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId } from "@aces/utils";
import { componentSpacing } from "@aces/theme";
import { Box, Container, FlexBox, H2, Slider, SliderBtn, Text } from "@aces/ui";
import { CfRichTextRender, CfImage } from "@aces/base";

import { CfTestimonialsUIProps, TestimonialUIProps } from ".";

export const TestimonialUI = ({
  name,
  role,
  description,
  profileImage,
  id,
  lang,
  preview,
}: TestimonialUIProps) => {
  return (
    <FlexBox flexDirection={"column"}>
      <CfRichTextRender
        lang={lang}
        preview={preview}
        richTextDocument={description.json}
        {...ContentfulLivePreview.getProps({
          entryId: id,
          fieldId: "body",
          locale: lang,
        })}
      />
      <FlexBox alignItems={"center"} paddingTop={5} gap={2}>
        <CfImage
          render="ui"
          id=""
          image={profileImage.image}
          internalTitle=""
          lang={lang}
          preview={preview}
          nested
          style={{ borderRadius: "50%" }}
          __typename=""
        />
        <FlexBox flexDirection={"column"}>
          <Text
            fontWeight={"700"}
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "name",
              locale: lang,
            })}
          >
            {name}
          </Text>
          <Text
            {...ContentfulLivePreview.getProps({
              entryId: id,
              fieldId: "role",
              locale: lang,
            })}
          >
            {role}
          </Text>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const CfTestimonialsUI = ({
  internalTitle,
  headline,
  testimonials,
  __typename,
  id,
  lang,
  preview,
}: CfTestimonialsUIProps) => {
  const sliderId = `${generateId(internalTitle)}-slider`;
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: componentSpacing.xs, md: componentSpacing.md }}
    >
      <Container>
        <FlexBox
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingBottom={5}
        >
          {headline && <H2>{headline}</H2>}
          <FlexBox>
            <SliderBtn id={sliderId} direction="prev" />
            <SliderBtn id={sliderId} direction="next" />
          </FlexBox>
        </FlexBox>
        <Slider
          id={sliderId}
          slidesPerView={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
          loop
          offsetSlideBoxShadow
        >
          {testimonials.map((testimonial, index) => {
            return (
              <TestimonialUI
                description={testimonial.description}
                name={testimonial.name}
                profileImage={testimonial.profileImage}
                role={testimonial.role}
                key={`testimonial-${index}`}
                id={id}
                lang={lang}
                preview={preview}
              />
            );
          })}
        </Slider>
      </Container>
    </Box>
  );
};
