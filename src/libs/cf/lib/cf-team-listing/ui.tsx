import { ContentfulLivePreview } from "@contentful/live-preview";

import { generateId } from "@aces/utils";
import { componentSpacing, shape } from "@aces/theme";
import { Box, Col, Container, H3, Row, Text } from "@aces/ui";
import { CfImageCover, CfRichTextRender } from "@aces/base";

import { CfTeamListingUIProps, CfTeamMemberItemUIProps } from ".";

export const CfTeamListingUI = ({
  internalTitle,
  headline,
  teamMembersCollection,
  __typename,
  id,
  lang,
  preview,
}: CfTeamListingUIProps) => {
  return (
    <Box
      id={generateId(internalTitle)}
      data-component={__typename}
      marginY={{ xs: componentSpacing.md, md: componentSpacing.xl }}
    >
      <Container>
        <H3
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "headline",
            locale: lang,
          })}
        >
          {headline}
        </H3>
        {teamMembersCollection.items.map((item) => (
          <CfTeamMemberItemUI
            key={generateId(item.name)}
            name={item.name}
            role={item.role}
            bio={item.bio}
            profileImage={item.profileImage}
            id={item?.sys?.id || ""}
            lang={lang}
            preview={preview}
          />
        ))}
      </Container>
    </Box>
  );
};

export const CfTeamMemberItemUI = ({
  name,
  role,
  bio,
  profileImage,
  id,
  lang,
  preview,
}: CfTeamMemberItemUIProps) => {
  return (
    <Row columnSpacing={10} rowSpacing={8} marginY={{ xs: 10, md: 20 }}>
      <Col size={{ xs: 12, sm: 4 }}>
        <CfImageCover
          render="server"
          id={profileImage?.sys?.id || ""}
          preview={preview}
          lang={lang}
          coverWidth={"100%"}
          coverHeight={{ xs: "440px", md: "410px" }}
          borderRadius={shape.borderRadius}
          nested={true}
        />
      </Col>
      <Col size={{ xs: 12, sm: 8 }}>
        <H3
          component={"p"}
          style={{ fontSize: "30px" }}
          marginBottom={3}
          {...ContentfulLivePreview.getProps({
            entryId: id,
            fieldId: "name",
            locale: lang,
          })}
        >
          {name}
        </H3>
        {role && (
          <Text.SubtitleSmall marginBottom={5}>{role}</Text.SubtitleSmall>
        )}
        {bio && (
          <CfRichTextRender
            richTextDocument={bio.json}
            preview={preview}
            lang={lang}
          />
        )}
      </Col>
    </Row>
  );
};
