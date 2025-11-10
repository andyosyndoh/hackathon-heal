import React from "react";

export const GlobalApiSection = (): JSX.Element => {
  return (
    <p className="w-full [font-family:'Jost',Helvetica] font-normal text-base tracking-[0] leading-[26.4px]">
      <span className="text-black">
        The Global API Factory services are not directed to individuals under
        13. We do not knowingly collect personal information from children under
        the age of 13. If you become aware that a child has provided us with
        personal information, please contact us at{" "}
      </span>
      <a
        href="mailto:privacy@Globalapifactory.com"
        className="text-[#021577] hover:underline"
      >
        privacy@Globalapifactory.com
      </a>
      <span className="text-black">
        . If we become aware that a child under 13 has provided us with personal
        information, we will take steps to delete such information.
      </span>
    </p>
  );
};
