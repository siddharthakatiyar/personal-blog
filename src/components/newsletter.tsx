"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <form
      action="https://buttondown.com/api/emails/embed-subscribe/siddharthakatiyar"
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open("https://buttondown.com/siddharthakatiyar", "popupwindow");
      }}
      className="flex gap-2"
    >
      <Input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        className="max-w-[220px]"
      />
      <input type="hidden" value="1" name="embed" />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
