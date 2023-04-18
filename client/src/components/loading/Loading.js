import React from "react";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
function Loading() {
  return (
    <Box padding="20" boxShadow="lg">
      <Skeleton height="300px" />
      <br />
      <SkeletonCircle size="50" />
      <br />
      <SkeletonText noOfLines={6} skeletonHeight="4" />
    </Box>
  );
}

export default Loading;
