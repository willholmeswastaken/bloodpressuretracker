import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">BloodPressureTracker</h2>
          <p className="text-sm text-muted-foreground">
            Unlocking heart vitals to the massess, one reading at a time.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium"></h3>
            <ul className="space-y-3 text-sm"></ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium"></h3>
            <ul className="space-y-3 text-sm"></ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/willholmeswastaken"
                className="px-4 text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BloodPressureTracker. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
