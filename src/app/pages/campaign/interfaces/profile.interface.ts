export interface Profile {
    id: any;
    profile_bg: string;
    photo_img: string;
    name: string;
    userid: string;
    socials: string[];
    gender: string;
    video?: string;
    ages: number[];
    sayings: string;
    categories: string[];
    acheivedCampaign: number;
    followers: number;
    posts: number;
    hotness: number;
    price?: string;
    favorited: boolean;
    most_liked?: string[];
    followers_change?: number;
    rating?: number;
}
export interface Review {
    review_id: number;
    profile_id: number;
    reviewer: string;
    review_title: string;
    rating: number;
    review_date: string;
    summary: string;
    platform: string;
    rating_values: number[];
}
export interface AnalyzeData {
    value: number;
    change?: number;
}
export interface Analyze {
    profile_id: number;
    platform: string;
    followers: AnalyzeData;
    likes: AnalyzeData;
    posting: AnalyzeData;
    comments: AnalyzeData;
    rate: AnalyzeData;
    post_urls: string[];
}
