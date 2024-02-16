import { Box, Skeleton } from "@mui/material";
import { FC, ReactElement } from "react";

interface TaskSkeletonProps {
  // You can add any additional props needed for your skeleton
}

const TaskSkeleton: FC<TaskSkeletonProps> = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      width="100%"
      mb={4}
      p={2}
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: "6px",
        border: "1px solid",
        borderColor: "transparent", // Set a default border color for the skeleton
      }}
    >
      <Skeleton width="50%" />
      <Skeleton width="25%" />

      <Skeleton />
      <Skeleton width="50%" />
    </Box>
  );
};

export default TaskSkeleton;
