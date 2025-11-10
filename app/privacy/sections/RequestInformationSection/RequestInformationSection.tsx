import React from "react";

export const RequestInformationSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <p className="[font-family:'Jost',Helvetica] font-normal text-base tracking-[0] leading-[26.4px] text-black">
        To request the removal of your personal information from our blog or
        testimonials, contact us at{" "}
        <a
          href="mailto:privacy@Globalapifactory.com"
          className="text-[#021577] hover:underline"
        >
          privacy@Globalapifactory.com
        </a>{" "}
        In some cases, we may not be able to remove your personal information,
        in which case we will let you know if we are unable to do so and why.
      </p>
    </section>
  );
};
