import { componentSpacing } from "@aces/theme";
import { Box, Container, Skeleton } from "@aces/ui";

export const CfCalloutSkeleton = () => {
  return (
    <Container>
      <Box marginY={{ xs: componentSpacing.lg, md: componentSpacing.xl }}>
        <Skeleton width={"100%"} height={380} />
      </Box>
    </Container>
  );
};
