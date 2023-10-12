import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function CarouselLoading() {
  return (
    <div className="flex w-full pt-5 gap-5">
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={210} height={320} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" width={210} sx={{ fontSize: "1rem" }} />
      </Stack>
    </div>
  );
}

export default CarouselLoading;
