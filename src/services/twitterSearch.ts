const TwitterSearchUrl =
  "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search";

const MaxResults = 5;

export interface TwitterProfileItem {
  id: string;
  name: string;
  screen_name: string;
  description: string;
  statuses_count: number;
  followers_count: number;
  friend_count: number;
  profile_image_url: string;
}

export const searchTwitterProfiles = async (
  searchString: string,
  maxItems: number = MaxResults
) => {
  const url = `${TwitterSearchUrl}?q=${searchString}`;
  const response = await fetch(url);
  const resultItems = (await response.json()) as TwitterProfileItem[];
  return resultItems.slice(0, MaxResults);
};
