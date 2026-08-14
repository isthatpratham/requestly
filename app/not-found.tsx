import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-16">
      <EmptyState
        title="404 — Page Not Found"
        description="The page or resource you requested could not be found."
        action={
          <Link href="/">
            <Button variant="primary" size="sm">
              Return Home
            </Button>
          </Link>
        }
      />
    </Container>
  );
}
