import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-1 px-4">
      <h1 className="text-36-light-heading text-gray-8 mb-4">Page Not Found</h1>
      <p className="text-14-medium-body text-gray-6 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button className="px-4 py-2 rounded-md bg-gray-8 text-gray-1 text-14-medium-body font-medium hover:bg-gray-7 transition-colors">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}
