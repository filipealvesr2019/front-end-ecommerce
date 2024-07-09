import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

export default function NewArrivalsSkeleton() {
  return (
    <Stack 
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)" /* Colunas responsivas */,
        justifyContent: "center" /* Centraliza as colunas horizontalmente */,
        gap: "1rem" /* Espaçamento entre os elementos */,
        "@media (min-width: 700px)": {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)" /* Colunas responsivas */,
          justifyContent: "center" /* Centraliza as colunas horizontalmente */,
        },
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>

      <div style={{ textAlign: "center", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "30vh",
            "@media (min-width: 700px)": {
              width: "13vw",
              height: "40vh",
            },
          }}
        />
        <Skeleton width={80} />
        <Skeleton width={160} />
      </div>
    </Stack >
  );
}
