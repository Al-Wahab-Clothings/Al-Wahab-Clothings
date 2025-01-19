import { PortableTextBlock } from '@portabletext/types'; // Sanity's PortableTextBlock type

// Function to render rich text content (description)
export default function RenderDescription (description: PortableTextBlock[]) {
  return description.map((block: PortableTextBlock) => {
    if (block._type === 'block') {
      return (
        <p key={block._key}>
          {block.children.map((child: any) => {
            let text = child.text;
            if (child.marks.includes('strong')) {
              text = <strong>{text}</strong>;
            }
            if (child.marks.includes('em')) {
              text = <em>{text}</em>;
            }
            return <span key={child._key}>{text}</span>;
          })}
        </p>
      );
    }
    return null;
  });
};
