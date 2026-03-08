import React from "react";

export interface PrivacyNoticeProps {
  title?: string;
  notice?: string;
}

export function PrivacyNotice({
  title = "Privacy Notice",
  notice = "All processing happens inside your browser. No files or data are uploaded to our servers, ensuring your privacy is strongly protected.",
}: PrivacyNoticeProps) {
  return (
    <section className="my-8 text-sm text-muted-foreground bg-muted/20 p-4 rounded-md border text-center">
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p>{notice}</p>
    </section>
  );
}
