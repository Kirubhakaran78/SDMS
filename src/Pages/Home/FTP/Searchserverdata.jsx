import React, { useState, useEffect } from "react";
import TabsHeader from "../../../Components/Layout/Common/Home/TabsHeader";
import { tabConfig } from ".././../../Components/Layout/Common/Home/TabConfig";

export default function Searchserverdata() {
  const [page, setPage] = useState("SearchServerData");
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(0);
  }, [page]);

  const pageTabsObj = tabConfig[page] || {};
  const currentTabs = Object.keys(pageTabsObj).map(label => ({
    label,
    content: pageTabsObj[label].content,
  }));

  return (
    <>
      <TabsHeader
        tabs={currentTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="p-4">
        {currentTabs[selectedTab]?.content || null}
      </div>
    </>
  );
}
