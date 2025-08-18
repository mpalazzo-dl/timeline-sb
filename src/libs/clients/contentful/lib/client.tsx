import { DocumentNode, parse, print, visit } from "graphql";

type GraphQLRequest<T = any> = {
  query: string | DocumentNode;
  variables?: Record<string, any>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type ExtendedFetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

function addTypenameToDocument(doc: DocumentNode): DocumentNode {
  return visit(doc, {
    SelectionSet(node) {
      if (
        node.selections.some((selection) => {
          return (
            selection.kind === "Field" && selection.name.value === "__typename"
          );
        })
      ) {
        return;
      }
      return {
        ...node,
        selections: [
          ...node.selections,
          {
            kind: "Field",
            name: { kind: "Name", value: "__typename" },
          },
        ],
      };
    },
  });
}

const createClient = (preview = false) => {
  const uri = `${process.env.NEXT_PUBLIC_CF_GRAPHQL_URL}/${process.env.NEXT_PUBLIC_CF_SPACE}/environments/${process.env.NEXT_PUBLIC_CF_ENVIRONMENT}`;
  const accessToken = preview
    ? process.env.NEXT_PUBLIC_CF_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CF_ACCESS_TOKEN;

  return {
    async query<T = any>({
      query,
      variables = {},
      next,
    }: GraphQLRequest<T>): Promise<{ data: T }> {
      let queryToSend: string;

      if (typeof query === "string") {
        const ast = parse(query);
        const astWithTypename = addTypenameToDocument(ast);
        queryToSend = print(astWithTypename);
      } else {
        const astWithTypename = addTypenameToDocument(query);
        queryToSend = print(astWithTypename);
      }

      const res = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query: queryToSend, variables }),
        next: next ?? { revalidate: preview ? 0 : 60 },
      } as ExtendedFetchOptions);

      const json: GraphQLResponse<T> = await res.json();

      if (json.errors) {
        console.error(json.errors);
        throw new Error("GraphQL query failed");
      }

      if (!json.data) {
        throw new Error("No data returned");
      }

      return { data: json.data };
    },
  };
};

export const cfClient = createClient(false);
export const cfPreviewClient = createClient(true);
