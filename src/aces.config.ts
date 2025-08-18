export const ACESConfig = {
  designSystem: {
    palette: {
      primary: "#007BE8",
      secondary: "#E94718",
      tertiary: {
        grayblue: "#EAEEF3",
        yellow: "#FFD627",
      },
    },
  },
  ui: {
    stickyHeader: true,
  },
  features: {
    pageBuilders: [
      {
        id: "landing-page-body",
        name: "Landing Page Body",
        contentTypeId: "landingPage",
        fieldId: "pageBody",
        dir: "./libs/features/lib/page-builders/landing-page-body",
      },
      {
        id: "page-body",
        name: "Page Body",
        contentTypeId: "page",
        fieldId: "pageBody",
        dir: "./libs/features/lib/page-builders/page-body",
      },
    ],
    pageTypes: [
      {
        id: "landingPage",
        name: "Landing Page",
        contentTypeId: "landingPage",
        dir: "/landing-page",
        pageBuilderId: "landing-page-body",
      },
      {
        id: "page",
        name: "Page",
        contentTypeId: "page",
        dir: "/page",
        pageBuilderId: "page-body",
      },
      {
        id: "industries",
        name: "Industries",
        contentTypeId: "industries",
        dir: "/industries",
        pageBuilderId: "page-body",
      },
    ],
  },
};
