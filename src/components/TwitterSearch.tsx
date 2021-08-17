import React, { useState } from "react";
import {
  searchTwitterProfiles,
  TwitterProfileItem,
} from "../services/twitterSearch";
import { TypeaheadSearch } from "../UIComponents/TypeaheadSearch";
import { TwitterProfileCard } from "../UIComponents/TwitterProfileCard";
import "./TwitterSearch.css";
import { SearchResultItem } from "../types";

interface SearchItem extends TwitterProfileItem, SearchResultItem {
  label: string;
}

const itemRenderFn = (twitterItem: SearchItem) => {
  return <TwitterProfileCard twitterItem={twitterItem} />;
};

const handleTwitterSearch = async (searchString: string) => {
  const results = await searchTwitterProfiles(searchString);
  console.info(`${results.length} results for search string '${searchString}'`);
  return results.map<SearchItem>((res) => ({ ...res, label: res.screen_name }));
};

export const TwitterSearch = () => {
  const [selectedItem, setSelectedItem] = useState<TwitterProfileItem>();

  const handleItemSelected = (twitterItem: SearchItem) => {
    setSelectedItem(twitterItem);
  };

  return (
    <div className="twitterSearch">
      <TypeaheadSearch
        onSearch={handleTwitterSearch}
        onSelected={handleItemSelected}
        itemRenderFn={itemRenderFn}
        placeHolderText="Search Twitter users..."
      />
      {selectedItem && (
        <div>
          <h3>SELECTED ITEM</h3>
          <TwitterProfileCard twitterItem={selectedItem} />
        </div>
      )}
    </div>
  );
};
