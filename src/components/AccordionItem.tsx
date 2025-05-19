import React, { useState } from 'react';

interface AccordionItemProps {
  key: string | number;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

interface AccordionItemData {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
}

const AccordionItem = ({ key, title, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="accordion-item" id={String(key)}>
      <div className="accordion-header" onClick={onClick}>
        <h3>{title}</h3>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ items }: AccordionProps) => {
  const [openItemId, setOpenItemId] = useState<null | string | number>(null);

  const handleClick = (id: string | number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          content={item.content}
          isOpen={openItemId === item.id}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;