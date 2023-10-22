import React from "react";
import { Card, Stack, Skeleton, Typography, Divider } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const InterviewCardSkeleton = () => {
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Card>
        <Stack p={4} spacing={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={"30%"} />
          </Stack>

          <Skeleton variant="rounded" width={"100%"} />

          <Skeleton variant="rounded" width={"70%"} height={"10px"} />

          <Stack direction={"row"} spacing={4} width={"100%"}>
            <Stack spacing={2} width={"100%"}>
              <Skeleton variant="rounded" width={"100%"} height={"20px"} />
              <Skeleton variant="rounded" width={"100%"} height={"20px"} />
            </Stack>
            <Stack spacing={2} width={"100%"}>
              <Skeleton variant="rounded" width={"100%"} height={"20px"} />
              <Skeleton variant="rounded" width={"100%"} height={"20px"} />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Grid2>
  );
};

export default InterviewCardSkeleton;
