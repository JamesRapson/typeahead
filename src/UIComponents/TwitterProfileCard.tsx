import { TwitterProfileItem } from "../services/twitterSearch";
import "./TwitterProfileCard.css";

export type TwitterProfileCardProps = {
  twitterItem: TwitterProfileItem;
};
export const TwitterProfileCard = ({
  twitterItem,
}: TwitterProfileCardProps) => {
  return (
    <div className="twitterProfileCard">
      <div className="inner">
        <div className="top">
          <div className="top-left">
            <div className="profileImg">
              <img src={twitterItem.profile_image_url} alt="none" />
            </div>
          </div>
          <div className="top-right">
            <div className="namesSection">
              <div className="name">{twitterItem.name}</div>
              <div className="screenName">@{twitterItem.screen_name}</div>
            </div>
            <div className="description">{twitterItem.description}</div>
          </div>
        </div>
        <div className="bottom">
          <div className="count-item">TWEETS: {twitterItem.statuses_count}</div>
          <div className="count-item">FRIENDS: {twitterItem.friend_count}</div>
          <div className="count-item">
            FOLLOWERS: {twitterItem.followers_count}
          </div>
        </div>
      </div>
    </div>
  );
};
