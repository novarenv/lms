import React, { useState, ReactNode } from 'react';

// Define the structure of each tab item
type TabItem = {
  title: string;
  content: ReactNode;
}

// Define the props interface for the Tabs component
type TabsProps = {
  tabData: TabItem[];
}

const Tabs = ({ tabData }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="tabs-container">
      <div className="tab-headers">
        {tabData.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabData[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;