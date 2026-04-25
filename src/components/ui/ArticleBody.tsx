interface ArticleBodyProps {
  content: string;
}

export const ArticleBody = ({ content }: ArticleBodyProps) => {
  return (
    <div 
      className="prose prose-lg max-w-none article-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
