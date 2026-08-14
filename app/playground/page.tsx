import React, { Suspense } from "react";
import { PlaygroundShell } from "@/components/playground/PlaygroundShell";
import { Container } from "@/components/ui/Container";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <Container className="py-12 flex justify-center">
          <LoadingIndicator text="Loading API Playground..." />
        </Container>
      }
    >
      <PlaygroundShell />
    </Suspense>
  );
}
