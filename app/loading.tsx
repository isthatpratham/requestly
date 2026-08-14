import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="flex items-center justify-center min-h-[50vh]">
      <LoadingIndicator text="Loading Requestly..." size="lg" />
    </Container>
  );
}
