import { CfLockupWrapperProps } from ".";
import { CfLockupUI } from "./ui";
import { fetchLockup } from "./services";
import { CfLockupSkeleton } from "./skeleton";

export const CfLockupServer = async ({
  id,
  preview,
  lang,
  nested,
}: CfLockupWrapperProps) => {
  let data;

  try {
    data = await fetchLockup(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfLockupSkeleton />;
  }

  if (!data) {
    return <CfLockupSkeleton />;
  }

  return (
    <CfLockupUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      bodyCopy={data.bodyCopy}
      buttonsCollection={data.buttonsCollection}
      media={data.media}
      mediaSize={data.mediaSize}
      mediaAlignment={data.mediaAlignment}
      mediaBleed={data.mediaBleed}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
