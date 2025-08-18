import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { defaultLocale } from "@aces/i18n";
import { CatchAllPageProps } from "@aces/types";
import { sliceSlug, specialtyPageRedirect } from "@aces/utils";
import { buildMetadata, LandingPageBody } from "@aces/features";

import { fetchLandingPageData } from "./services";

export async function generateMetadata({
  params,
}: {
  params: Promise<CatchAllPageProps>;
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);

  const { isEnabled } = await draftMode();
  const { slug } = resolvedParams;

  const pageData = await fetchLandingPageData(sliceSlug(slug), isEnabled);
  const pageResponse =
    pageData.landingPageResponse.data.landingPageCollection.items[0];

  if (!pageResponse) {
    notFound();
  }

  return await buildMetadata(pageResponse.seo, {});
}

export default async function LandingPage({
  params,
}: {
  params: Promise<CatchAllPageProps>;
}) {
  const resolvedParams = await Promise.resolve(params);

  const { isEnabled } = await draftMode();
  const { lang = defaultLocale, slug } = resolvedParams;

  const pageData = await fetchLandingPageData(sliceSlug(slug), isEnabled, lang);
  const pageResponse =
    pageData.landingPageResponse.data.landingPageCollection.items[0];

  if (!pageResponse) {
    notFound();
  }

  const pageBodyResponse =
    pageData.landingPageBodyResponse.data.landingPage.pageBodyCollection.items;

  specialtyPageRedirect(pageResponse.specialtyPage);

  return (
    <>
      <LandingPageBody
        items={pageBodyResponse}
        preview={isEnabled}
        lang={lang}
      />
    </>
  );
}
