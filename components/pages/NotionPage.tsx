import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import { FC } from "react";
import { NotionRenderer, SearchNotionFn } from "react-notion-x";

export type NotionPageProps = {
  rootPageUuid: string;
  recordMap: ExtendedRecordMap;
  urlMap: Record<string, string>;
};

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (mod) => {
    await Promise.all([
      import("prismjs/components/prism-rust"),
      import("prismjs/components/prism-typescript"),
      import("prismjs/components/prism-javascript"),
    ]);
    return mod.Code;
  })
);

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (mod) => mod.Collection
  )
);

const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then((m) => {
      m.Modal.setAppElement(".notion-viewport");
      return m.Modal;
    }),
  { ssr: false }
);

const searchNotion: SearchNotionFn = (params) => {
  return fetch("/api/search-notion", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return { recordMap: undefined, results: [], total: 0 };
  });
};

const NotionPage: FC<NotionPageProps> = ({
  recordMap,
  urlMap,
  rootPageUuid,
}) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      rootPageId={rootPageUuid}
      mapPageUrl={(id) => `/notes${urlMap[id]}`}
      fullPage={true}
      components={{ Code, Collection, Modal }}
      searchNotion={searchNotion}
    />
  );
};

export default NotionPage;
