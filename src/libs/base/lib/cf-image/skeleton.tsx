import { Skeleton } from "@aces/ui";

export interface ImageSkeletonProps {
  height?: number | string;
}

export const CfImageSkeleton = ({
  height = 340,
  ...rest
}: ImageSkeletonProps) => {
  return <Skeleton width="100%" height={height} {...rest} />;
};
