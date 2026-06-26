import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="font-display text-7xl font-bold text-ocean-600">404</h1>
        <p className="mt-4 text-lg text-ink/60">
          This page drifted out to sea.
        </p>
        <Button as={Link} to="/" className="mt-6">
          Back to Home
        </Button>
      </div>
    </>
  );
}