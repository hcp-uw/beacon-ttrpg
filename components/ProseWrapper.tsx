const ProseWrapper = ({ className, Tag, children, ...props }: any) => (
  <div className={`prose prose-table:w-full prose-table:border-collapse prose-p:max-w-2xl prose-headings:max-w-2xl prose-ul:max-w-2xl ${className || ''}`}>
    <Tag {...props}>{children}</Tag>
  </div>
);

export default ProseWrapper;