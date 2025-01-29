// components/product/TabsMenu.jsx
"use client";

interface TabsMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsMenu = ({ activeTab, setActiveTab }: TabsMenuProps) => {
  const tabs = [
    'Product',
    'Technical Specification',
    'Deployment',
    'In The Box',
    'Build Features',
    'Add-ons'
  ];

  return (
    <div className="border-b border-gray-200 mt-20 justify-center">
      <nav className="flex space-x-8 overflow-x-auto justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabsMenu;