import { FC, useCallback, useEffect, useState } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { File } from ".";

const lang = (extension: string) => {
  switch (extension) {
    case "rs":
      return "rust";
    default:
      return extension;
  }
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeCodeTitles)
  .use(rehypePrismPlus)
  .use(rehypeStringify);

const FileContent: FC<{ file?: File }> = ({ file }) => {
  const [contentHtml, setContentHtml] = useState<string>("");

  useEffect(() => {
    if (file) {
      const updateContentByFile = async (file: File) => {
        const extension = file.fileName.split(".").pop();
        const markdown = `\`\`\`${lang(extension)}:${file.fileName}\r\n${
          file.content
        }\`\`\``;
        const result = await processor.process(markdown);
        setContentHtml(result.toString());
      };
      updateContentByFile(file);
    }
  }, [file]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: contentHtml }}
      className="grid grid-rows-[auto,minmax(0,1fr)]"
    ></div>
  );
};

export default FileContent;
