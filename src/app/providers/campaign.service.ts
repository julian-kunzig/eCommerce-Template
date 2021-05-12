import {Injectable} from '@angular/core';
import {Campaign} from '../pages/campaign/interfaces/campaign.interface';
import {campaignsData} from '../../static-data/campaigns';
import {categoriesData} from '../../static-data/categories';
import {platformsData} from '../../static-data/platforms';
import {placementData} from '../../static-data/placement';
import {analysisData, profileData, proposalsData, reviewsData} from '../../static-data/profiles';
import {cityData, countryData, langData, stateData} from '../../static-data/locations';
import {Profile, Review} from '../pages/campaign/interfaces/profile.interface';
import {FilterOption} from '../pages/discover/discover-grid/discover-grid.component';

import {DataService} from '../providers/data.service'
import {Data} from '@angular/router';
import {first} from 'rxjs/operators';
import {forkJoin} from "rxjs"

export interface Offer {
    id: any;
    chatId: any;
    campId: any;
    accept_date?: string;
    status: 'pending' | 'accepted' | 'declined' | 'sent' | 'active' | 'completed';
    adv_review?: Review;
    ship_date?: string;
    ship_carrier?: string;
    arrv_date?: string;
    track_no?: string;
    change_note?: string;
    profile_id?: number;
    post_img?: string;
    caption?: string;
    locationtags?: string[];
    tags?: string[];
    tags2?: string[];
    editable?: boolean;
    offer_progress?: any;
    platform?: string[];
    placement?: string[];
    requirement: string;

    type?: string;
    camp_name?: string;
    budget?: string;
}

export interface Proposal {
    id: number;
    campId: number;
    userId: number;
    description: string;
    status: 'pending' | 'sent';
}

@Injectable({
    providedIn: 'root'
})
export class CampaignService {

    //campList = campaignsData;
    campList = [];
    campFavoriteList = [];
    myList: Profile[] = [];
    categories = categoriesData;
    platforms = platformsData;
    placements = placementData;
    languages = langData;
    countries = countryData;
    states = stateData;
    cities = cityData;
    //profiles = profileData;
    profiles = [];
    favoriteProfiles = [];
    reviews = reviewsData;
    analysisData = analysisData;
    offers: Offer[] = [];
    proposals: Proposal[] = [];
    filterOpt: FilterOption;
    myCampList: Campaign[] = [];
    campaignFavoriteListId: string;
    influencerFavoriteListId: string;
    campaignMyListId: string;
    influencerMyListId: string;

    constructor(public dataService: DataService) {
        //this.offers = offersData;
        this.proposals = proposalsData;
        //this.campInit();
        //this.offersInit();
        //this.influencersListInit();
    }

    getAllInfluencerListForBrand() {
        return new Promise((resolve) => {
            this.profiles = [];

            this.dataService.retrieveInfluencerToFavoriteList().subscribe(async (favorites: any) => {
                if (favorites.favorite_influencers) {
                    let favorite_list = favorites.favorite_influencers;

                    const mylist_influencers = (await this.dataService.retrieveMyListOfInfluencers().toPromise() as any).mylist_influencers;

                            this.dataService.getInfluencersList().subscribe(cdata => {
                        if (cdata['results']) {

                            let all_list = cdata['results'].filter((item: any) => {
                                return !favorite_list.some((favorite: any) => favorite.profile_uuid === item.profile_uuid)
                                && !mylist_influencers.some((listItem: any) => listItem.profile_uuid === item.profile_uuid)
                            });


                            for (let i = 0; i < all_list.length; i++) {
                                let influencer: Profile = {
                                    id: 1,
                                    profile_bg: 'assets/img/demo/profile-bg-01.jpg',
                                    photo_img: 'assets/img/demo/profile-photo-01.png',
                                    name: 'Kaitlyn Kristy',
                                    userid: 'Kaitlyn_Kristy2',
                                    socials: ['instagram', 'facebook', 'youtube'],
                                    gender: 'female',
                                    ages: [18, 25],
                                    sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
                                    video: 'youtube.com/23sskaitlyn',
                                    categories: ['fashion', 'travel', 'books'],
                                    acheivedCampaign: 56,
                                    followers: 2500,
                                    followers_change: 0.3,
                                    posts: 30,
                                    hotness: 99,
                                    price: '50-60',
                                    favorited: false,
                                };
                                influencer.id = all_list[i].profile_uuid;
                                influencer.name = all_list[i].first_name + ' ' + all_list[i].last_name;
                                influencer.sayings = all_list[i].biography;
                                influencer.photo_img = all_list[i].profile_photo_url;
                                influencer.userid = all_list[i].user;

                                if (all_list[i].age_range != null)
                                    influencer.ages = all_list[i].age_range;
                                influencer.gender = all_list[i].gender == 'F' ? 'female' : 'male';
                                // influencer.categories   = cdata.results[i].categories;
                                // console.log(influencer);
                                this.profiles.push(influencer);
                            }
                        }
                        resolve(true);
                    })
                }
            });
        });
    }

    getFavoriteInfluencerListForBrand() {
        return new Promise((resolve) => {
            this.favoriteProfiles = [];
            this.dataService.retrieveInfluencerToFavoriteList().subscribe((cdata: any) => {
                if (cdata.favorite_influencers) {
                    let favorite_list = cdata.favorite_influencers;
                    this.influencerFavoriteListId = cdata.favorite_list_uuid;

                    for (let i = 0; i < favorite_list.length; i++) {
                        let influencer: Profile = {
                            id: 1,
                            profile_bg: 'assets/img/demo/profile-bg-01.jpg',
                            photo_img: 'assets/img/demo/profile-photo-01.png',
                            name: 'Kaitlyn Kristy',
                            userid: 'Kaitlyn_Kristy2',
                            socials: ['instagram', 'facebook', 'youtube'],
                            gender: 'female',
                            ages: [18, 25],
                            sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
                            video: 'youtube.com/23sskaitlyn',
                            categories: ['fashion', 'travel', 'books'],
                            acheivedCampaign: 56,
                            followers: 2500,
                            followers_change: 0.3,
                            posts: 30,
                            hotness: 99,
                            price: '50-60',
                            favorited: true,
                        };
                        influencer.id = favorite_list[i].profile_uuid;
                        influencer.name = favorite_list[i].first_name + ' ' + favorite_list[i].last_name;
                        influencer.sayings = favorite_list[i].biography;
                        influencer.photo_img = favorite_list[i].profile_photo_url;
                        influencer.userid = favorite_list[i].user;

                        if (favorite_list[i].age_range != null)
                            influencer.ages = favorite_list[i].age_range;
                        influencer.gender = favorite_list[i].gender == 'F' ? 'female' : 'male';
                        this.favoriteProfiles.push(influencer);
                    }
                }
                resolve(true);
            });
        })
    }

    getMyListInfluencerListForBrand() {
        return new Promise((resolve) => {
            this.myList = [];
            this.dataService.retrieveMyListOfInfluencers().subscribe((cdata: any) => {
                if (cdata.mylist_influencers) {
                    let my_list = cdata.mylist_influencers;
                    this.influencerMyListId = cdata.mylist_uuid;

                    for (let i = 0; i < my_list.length; i++) {
                        let influencer: Profile = {
                            id: 1,
                            profile_bg: 'assets/img/demo/profile-bg-01.jpg',
                            photo_img: 'assets/img/demo/profile-photo-01.png',
                            name: 'Kaitlyn Kristy',
                            userid: 'Kaitlyn_Kristy2',
                            socials: ['instagram', 'facebook', 'youtube'],
                            gender: 'female',
                            ages: [18, 25],
                            sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
                            video: 'youtube.com/23sskaitlyn',
                            categories: ['fashion', 'travel', 'books'],
                            acheivedCampaign: 56,
                            followers: 2500,
                            followers_change: 0.3,
                            posts: 30,
                            hotness: 99,
                            price: '50-60',
                            favorited: true,
                        };
                        influencer.id = my_list[i].profile_uuid;
                        influencer.name = my_list[i].first_name + ' ' + my_list[i].last_name;
                        influencer.sayings = my_list[i].biography;
                        influencer.photo_img = my_list[i].profile_photo_url;
                        influencer.userid = my_list[i].user;

                        if (my_list[i].age_range != null)
                            influencer.ages = my_list[i].age_range;
                        influencer.gender = my_list[i].gender == 'F' ? 'female' : 'male';
                        this.myList.push(influencer);
                    }
                }
                resolve(true);
            });
        })
    }

    // influencersListInit() {
    //     return new Promise((resolve)=>{
    //         this.profiles = [];
    //         this.myList=[];

    //         let promiseList = [];
    //         promiseList.push( this.dataService.getInfluencersList());
    //         promiseList.push(this.dataService.retrieveInfluencerToFavoriteList());
    //         promiseList.push(this.dataService.retrieveMyListOfInfluencers());

    //         forkJoin(promiseList).subscribe( cdata => {
    //             if(cdata[0]['results']){
    //                 let all_list = cdata[0]['results'];

    //                 for(let i = 0; i < all_list.length; i ++) {
    //                     let influencer : Profile = {
    //                         id: 1,
    //                         profile_bg: 'assets/img/demo/profile-bg-01.jpg',
    //                         photo_img: 'assets/img/demo/profile-photo-01.png',
    //                         name: 'Kaitlyn Kristy',
    //                         userid: 'Kaitlyn_Kristy2',
    //                         socials: ['instagram', 'facebook', 'youtube'],
    //                         gender: 'female',
    //                         ages: [18, 25],
    //                         sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
    //                         video: 'youtube.com/23sskaitlyn',
    //                         categories: ['fashion', 'travel', 'books'],
    //                         acheivedCampaign: 56,
    //                         followers: 2500,
    //                         followers_change: 0.3,
    //                         posts: 30,
    //                         hotness: 99,
    //                         price: '50-60',
    //                         favorited: false,
    //                     };
    //                     influencer.id = all_list[i].profile_uuid;
    //                     influencer.name = all_list[i].first_name + ' ' + all_list[i].last_name;
    //                     influencer.sayings = all_list[i].biography;
    //                     influencer.photo_img = all_list[i].profile_photo_url;
    //                     influencer.userid = all_list[i].user;

    //                     if(all_list[i].age_range != null)
    //                         influencer.ages = all_list[i].age_range;
    //                     influencer.gender = all_list[i].gender == 'F' ? 'female' : 'male';
    //                     // influencer.categories   = cdata.results[i].categories;
    //                     // console.log(influencer);
    //                     this.profiles.push(influencer);
    //                 }
    //             }

    //             if(cdata[1]['results'][0]){
    //                 let favorite_list = cdata[1]['results'][0].favorite_influencers;
    //                 this.influencerFavoriteListId = cdata[1]['results'][0].favorite_list_uuid;
    //                 for(let i = 0; i < favorite_list.length; i ++) {
    //                     let influencer : Profile = {
    //                         id: 1,
    //                         profile_bg: 'assets/img/demo/profile-bg-01.jpg',
    //                         photo_img: 'assets/img/demo/profile-photo-01.png',
    //                         name: 'Kaitlyn Kristy',
    //                         userid: 'Kaitlyn_Kristy2',
    //                         socials: ['instagram', 'facebook', 'youtube'],
    //                         gender: 'female',
    //                         ages: [18, 25],
    //                         sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
    //                         video: 'youtube.com/23sskaitlyn',
    //                         categories: ['fashion', 'travel', 'books'],
    //                         acheivedCampaign: 56,
    //                         followers: 2500,
    //                         followers_change: 0.3,
    //                         posts: 30,
    //                         hotness: 99,
    //                         price: '50-60',
    //                         favorited: true,
    //                     };
    //                     influencer.id           = favorite_list[i].profile_uuid;
    //                     influencer.name         = favorite_list[i].first_name + ' ' + favorite_list[i].last_name;
    //                     influencer.sayings      = favorite_list[i].biography;
    //                     influencer.photo_img    = favorite_list[i].profile_photo_url;
    //                     influencer.userid = favorite_list[i].user;

    //                     if(favorite_list[i].age_range != null)
    //                         influencer.ages         = favorite_list[i].age_range;
    //                     influencer.gender       = favorite_list[i].gender == 'F' ? 'female' : 'male';
    //                     this.profiles.push(influencer);
    //                 }
    //             }

    //             if(cdata[2]['results'][0]){
    //                 let my_list = cdata[2]['results'][0].mylist_influencers;
    //                 this.influencerMyListId = cdata[2]['results'][0].mylist_uuid;

    //                 for(let i = 0; i < my_list.length; i ++) {
    //                     let influencer : Profile = {
    //                         id: 1,
    //                         profile_bg: 'assets/img/demo/profile-bg-01.jpg',
    //                         photo_img: 'assets/img/demo/profile-photo-01.png',
    //                         name: 'Kaitlyn Kristy',
    //                         userid: 'Kaitlyn_Kristy2',
    //                         socials: ['instagram', 'facebook', 'youtube'],
    //                         gender: 'female',
    //                         ages: [18, 25],
    //                         sayings: 'I love taking pictures and enjoy experiencing a new journey in my life. I’ll be happy if I work with you!Check my new video in Youtube! Link',
    //                         video: 'youtube.com/23sskaitlyn',
    //                         categories: ['fashion', 'travel', 'books'],
    //                         acheivedCampaign: 56,
    //                         followers: 2500,
    //                         followers_change: 0.3,
    //                         posts: 30,
    //                         hotness: 99,
    //                         price: '50-60',
    //                         favorited: true,
    //                     };
    //                     influencer.id           = my_list[i].profile_uuid;
    //                     influencer.name         = my_list[i].first_name + ' ' + my_list[i].last_name;
    //                     influencer.sayings      = my_list[i].biography;
    //                     influencer.photo_img    = my_list[i].profile_photo_url;
    //                     influencer.userid = my_list[i].user;

    //                     if(my_list[i].age_range != null)
    //                         influencer.ages         = my_list[i].age_range;
    //                     influencer.gender       = my_list[i].gender == 'F' ? 'female' : 'male';
    //                     this.myList.push(influencer);
    //                 }
    //             }
    //             resolve(true)
    //         })
    //     })

    // }

    offersInit() {
        const type = localStorage.getItem('type');
        this.offers = [];
        console.log('current type is.....', type);
        if (type === 'advertiser') {
            return new Promise((resolve) => {
                this.dataService.getOfferListByAdvertiser()
                    .pipe()
                    .subscribe(cdata => {
                        console.log('offer list advertiser', cdata);
                        this.getOfferList(cdata);
                        resolve(true);
                    });
            })
        } else {
            return new Promise((resolve) => {
                this.dataService.getOfferListByInfluencer()
                    .pipe()
                    .subscribe(cdata => {
                        console.log('offer list influencer', cdata);
                        this.getOfferList(cdata);
                        resolve(true);
                    });
            })
        }
    }

    getOfferList(cdata) {
        for (let i = 0; i < cdata.results.length; i++) {
            var offer: Offer = {
                id: 1,
                chatId: 1,
                campId: 1,
                accept_date: '11/02/2020',
                status: 'pending',
                ship_date: '11/02/2020',
                ship_carrier: 'UPS',
                arrv_date: '11/10/2020',
                track_no: '235367363467',
                profile_id: 2,
                post_img: 'assets/img/demo/post-1.png',
                caption: 'She is very kind and takes beautiful pictures. I want to work with her again!',
                locationtags: ['chicago'],
                tags: ['fashion'],
                tags2: ['nike'],
                editable: false,
                adv_review: {
                    review_id: 1,
                    profile_id: 7,
                    reviewer: 'Hyebin Seong',
                    review_date: '09/02/2020',
                    review_title: '[Nike] Nike Air Max 1',
                    summary: 'She is very kind and takes beautiful pictures. I want to work with her again! She is very kind and takes beautiful pictures. I want to work with her again!',
                    rating: 4.7,
                    platform: 'facebook',
                    rating_values: [5, 4, 5, 5],
                },
                offer_progress: null,
                platform: ['instagram', 'facebook'],
                placement: ['feed', 'story'],
                requirement: 'test',
            };
            offer.id = cdata.results[i].offer_uuid;
            offer.chatId = cdata.results[i].received_by;
            offer.campId = cdata.results[i].campaign;
            offer.accept_date = cdata.results[i].accepted_at;
            offer.status = cdata.results[i].progress.toLowerCase();
            offer.offer_progress = cdata.results[i].offer_progress;

            offer.type = cdata.results[i].type.toLowerCase();
            offer.camp_name = cdata.results[i].campaign_name;
            offer.budget = cdata.results[i].budget;

            this.offers.push(offer);

            // console.log('offers', this.offers);
        }

    }

    getAllCampaignListForInfluencer() {
        return new Promise((resolve) => {
            this.campList = [];

            this.dataService.retrieveFavoritedCampaignsList().subscribe(async (favorites: any) => {
                if (favorites.favorite_campaigns) {
                    const favorite_list = favorites.favorite_campaigns;

                    const mylist:any = await this.dataService.retrieveCampaignToMyList().toPromise();
                    const mylist_campaigns = mylist.mylist_campaigns;

                    console.log("MY LIST", mylist_campaigns);

                    this.dataService.getCampaignList().subscribe(cdata => {
                        if (cdata['results']) {
                            let all_list = cdata['results'].filter((item: any) => {
                                return !favorite_list.some((favorite: any) => favorite.campaign_uuid === item.campaign_uuid)
                                && !mylist_campaigns.some((listItem: any) => listItem.campaign_uuid === item.campaign_uuid)
                            });

                            for (let i = 0; i < all_list.length; i++) {
                                let camp: Campaign = {
                                    id: 2,
                                    name: 'Nike Running Shoes',
                                    category: ['fashion', 'travel', 'sports'],
                                    budget: 100,
                                    coverImg: 'assets/img/demo/product07-01.jpg',
                                    platform: ['instagram', 'facebook'],
                                    placement: ['feed', 'story'],
                                    requirement: 'test',
                                    caption: 'adf',
                                    tags: ['nike'],
                                    tags2: ['fashion'],
                                    ages: [30, 60],
                                    followers: [2000, 4500],
                                    periodStart: '09/02/2020',
                                    periodEnd: '09/09/2020',
                                    gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
                                    gender: 'male',
                                    city: '',
                                    country: '',
                                    quests: [1],
                                    contents: [2],
                                    langs: ['en'],
                                    billingName: '',
                                    billingAddress1: '',
                                    billingAddress2: '',
                                    billingState: '',
                                    billingCity: '',
                                    billingZipcode: '',
                                    description: 'Showing face, Picture wearing  a product',
                                    favorite: false,
                                };
                                camp.id = all_list[i].campaign_uuid;
                                camp.name = all_list[i].campaign_title;
                                camp.description = all_list[i].campaign_description;
                                camp.periodStart = all_list[i].start_date;
                                camp.periodEnd = all_list[i].end_date;
                                this.campList.push(camp);
                            }
                            console.log('camp list', this.campList);
                        }
                        resolve(true);
                    })
                }
            });
        });
    }

    getFavoriteCampaignListForInfluencer() {
        return new Promise((resolve) => {
            this.campFavoriteList = [];
            this.dataService.retrieveFavoritedCampaignsList().subscribe((cdata: any) => {
                if (cdata.favorite_campaigns) {
                    let favorite_list = cdata.favorite_campaigns;
                    this.campaignFavoriteListId = cdata.favorite_list_uuid;

                    console.log(favorite_list);


                    for (let i = 0; i < favorite_list.length; i++) {
                        let camp: Campaign = {
                            id: 2,
                            name: 'Nike Running Shoes',
                            category: ['fashion', 'travel', 'sports'],
                            budget: 100,
                            coverImg: 'assets/img/demo/product07-01.jpg',
                            platform: ['instagram', 'facebook'],
                            placement: ['feed', 'story'],
                            requirement: 'test',
                            caption: 'adf',
                            tags: ['nike'],
                            tags2: ['fashion'],
                            ages: [30, 60],
                            followers: [2000, 4500],
                            periodStart: '09/02/2020',
                            periodEnd: '09/09/2020',
                            gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
                            gender: 'male',
                            city: '',
                            country: '',
                            quests: [1],
                            contents: [2],
                            langs: ['en'],
                            billingName: '',
                            billingAddress1: '',
                            billingAddress2: '',
                            billingState: '',
                            billingCity: '',
                            billingZipcode: '',
                            description: 'Showing face, Picture wearing  a product',
                            favorite: true,
                        };

                        camp.id = favorite_list[i].campaign_uuid;
                        camp.name = favorite_list[i].campaign_title;
                        camp.description = favorite_list[i].campaign_description;
                        camp.periodStart = favorite_list[i].start_date;
                        camp.periodEnd = favorite_list[i].end_date;
                        this.campFavoriteList.push(camp);
                    }
                }
                resolve(true);
            });
        });
    }

    getMyListCampaignListForInfluencer() {
        return new Promise((resolve) => {
            this.myCampList = [];
            this.dataService.retrieveCampaignToMyList().subscribe((cdata: any) => {
                if (cdata.mylist_campaigns) {
                    let mylist_campaigns = cdata.mylist_campaigns;
                    this.campaignMyListId = cdata.campaign_mylist_uuid;

                    for (let i = 0; i < mylist_campaigns.length; i++) {
                        let camp: Campaign = {
                            id: 2,
                            name: 'Nike Running Shoes',
                            category: ['fashion', 'travel', 'sports'],
                            budget: 100,
                            coverImg: 'assets/img/demo/product07-01.jpg',
                            platform: ['instagram', 'facebook'],
                            placement: ['feed', 'story'],
                            requirement: 'test',
                            caption: 'adf',
                            tags: ['nike'],
                            tags2: ['fashion'],
                            ages: [30, 60],
                            followers: [2000, 4500],
                            periodStart: '09/02/2020',
                            periodEnd: '09/09/2020',
                            gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
                            gender: 'male',
                            city: '',
                            country: '',
                            quests: [1],
                            contents: [2],
                            langs: ['en'],
                            billingName: '',
                            billingAddress1: '',
                            billingAddress2: '',
                            billingState: '',
                            billingCity: '',
                            billingZipcode: '',
                            description: 'Showing face, Picture wearing  a product',
                            favorite: true,
                        };

                        camp.id = mylist_campaigns[i].campaign_uuid;
                        camp.name = mylist_campaigns[i].campaign_title;
                        camp.description = mylist_campaigns[i].campaign_description;
                        camp.periodStart = mylist_campaigns[i].start_date;
                        camp.periodEnd = mylist_campaigns[i].end_date;
                        this.myCampList.push(camp);
                    }
                }
                resolve(true);
            });
        });
    }

    // campInit() {
    //     return new Promise((resolve)=>{
    //         this.campList = [];
    //         this.myCampList = [];

    //         let promiseCampList = [];
    //         promiseCampList.push( this.dataService.getCampaignList());
    //         promiseCampList.push(this.dataService.retrieveFavoritedCampaignsList());
    //         promiseCampList.push(this.dataService.retrieveCampaignToMyList());

    //         forkJoin(promiseCampList).subscribe( cdata => {
    //             if(cdata[0]['results']){
    //                 let all_list = cdata[0]['results'];

    //                 for(let i = 0; i < all_list.length; i ++) {
    //                     let camp : Campaign = {
    //                         id: 2,
    //                         name: 'Nike Running Shoes',
    //                         category: ['fashion', 'travel', 'sports'],
    //                         budget: 100,
    //                         coverImg: 'assets/img/demo/product07-01.jpg',
    //                         platform: ['instagram', 'facebook'],
    //                         placement: ['feed', 'story'],
    //                         requirement: 'test',
    //                         caption: 'adf',
    //                         tags: ['nike'],
    //                         tags2: ['fashion'],
    //                         ages: [30, 60],
    //                         followers: [2000, 4500],
    //                         periodStart: '09/02/2020',
    //                         periodEnd: '09/09/2020',
    //                         gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
    //                         gender: 'male',
    //                         city: '',
    //                         country: '',
    //                         quests: [1],
    //                         contents: [2],
    //                         langs: ['en'],
    //                         billingName: '',
    //                         billingAddress1: '',
    //                         billingAddress2: '',
    //                         billingState: '',
    //                         billingCity: '',
    //                         billingZipcode: '',
    //                         description: 'Showing face, Picture wearing  a product',
    //                         favorite: false,
    //                     };
    //                     camp.id = all_list[i].campaign_uuid;
    //                     camp.name = all_list[i].campaign_title;
    //                     camp.description = all_list[i].campaign_description;
    //                     camp.periodStart = all_list[i].start_date;
    //                     camp.periodEnd = all_list[i].end_date;
    //                     this.campList.push(camp);
    //                 }
    //                 console.log('camp list', this.campList);
    //             }

    //             if(cdata[1]['results'][0]){
    //                 let favorite_list = cdata[1]['results'][0].favorite_campaigns;
    //                 this.campaignFavoriteListId = cdata[1]['results'][0].favorite_list_uuid;

    //                 for(let i = 0; i < favorite_list.length; i ++) {
    //                     let camp : Campaign = {
    //                         id: 2,
    //                         name: 'Nike Running Shoes',
    //                         category: ['fashion', 'travel', 'sports'],
    //                         budget: 100,
    //                         coverImg: 'assets/img/demo/product07-01.jpg',
    //                         platform: ['instagram', 'facebook'],
    //                         placement: ['feed', 'story'],
    //                         requirement: 'test',
    //                         caption: 'adf',
    //                         tags: ['nike'],
    //                         tags2: ['fashion'],
    //                         ages: [30, 60],
    //                         followers: [2000, 4500],
    //                         periodStart: '09/02/2020',
    //                         periodEnd: '09/09/2020',
    //                         gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
    //                         gender: 'male',
    //                         city: '',
    //                         country: '',
    //                         quests: [1],
    //                         contents: [2],
    //                         langs: ['en'],
    //                         billingName: '',
    //                         billingAddress1: '',
    //                         billingAddress2: '',
    //                         billingState: '',
    //                         billingCity: '',
    //                         billingZipcode: '',
    //                         description: 'Showing face, Picture wearing  a product',
    //                         favorite: true,
    //                     };

    //                     camp.id = favorite_list[i].campaign_uuid;
    //                     camp.name = favorite_list[i].campaign_title;
    //                     camp.description = favorite_list[i].campaign_description;
    //                     camp.periodStart = favorite_list[i].start_date;
    //                     camp.periodEnd = favorite_list[i].end_date;
    //                     this.campList.push(camp);
    //                 }
    //             }

    //             if(cdata[2]['results'][0]){
    //                 let mylist_campaigns = cdata[2]['results'][0].mylist_campaigns;
    //                 this.campaignMyListId = cdata[2]['results'][0].campaign_mylist_uuid;

    //                 for(let i = 0; i < mylist_campaigns.length; i ++) {
    //                     let camp : Campaign = {
    //                         id: 2,
    //                         name: 'Nike Running Shoes',
    //                         category: ['fashion', 'travel', 'sports'],
    //                         budget: 100,
    //                         coverImg: 'assets/img/demo/product07-01.jpg',
    //                         platform: ['instagram', 'facebook'],
    //                         placement: ['feed', 'story'],
    //                         requirement: 'test',
    //                         caption: 'adf',
    //                         tags: ['nike'],
    //                         tags2: ['fashion'],
    //                         ages: [30, 60],
    //                         followers: [2000, 4500],
    //                         periodStart: '09/02/2020',
    //                         periodEnd: '09/09/2020',
    //                         gallery: ['assets/img/demo/product07-02.jpg', 'assets/img/demo/product07-03.jpg', 'assets/img/demo/product07-04.jpg', '', ''],
    //                         gender: 'male',
    //                         city: '',
    //                         country: '',
    //                         quests: [1],
    //                         contents: [2],
    //                         langs: ['en'],
    //                         billingName: '',
    //                         billingAddress1: '',
    //                         billingAddress2: '',
    //                         billingState: '',
    //                         billingCity: '',
    //                         billingZipcode: '',
    //                         description: 'Showing face, Picture wearing  a product',
    //                         favorite: true,
    //                     };

    //                     camp.id = mylist_campaigns[i].campaign_uuid;
    //                     camp.name = mylist_campaigns[i].campaign_title;
    //                     camp.description = mylist_campaigns[i].campaign_description;
    //                     camp.periodStart = mylist_campaigns[i].start_date;
    //                     camp.periodEnd = mylist_campaigns[i].end_date;
    //                     this.myCampList.push(camp);
    //                 }
    //             }
    //             resolve(true);
    //         });
    //     })
    // }
    addtoCamp(id) {
        let index = this.myCampList.findIndex(c => c.id === id);

        if (index === -1) {
            index = this.campList.findIndex(c => c.id === id);
            this.myCampList.push(this.campList[index]);
            return true;
        }
        console.log(this.myCampList);
        return false;
    }

    addtoMyList(id) {
        let index = this.myList.findIndex(c => c.id == id);

        if (index === -1) {
            index = this.profiles.findIndex(c => c.id == id);
            this.myList.push(this.profiles[index]);
            return true;
        }
        return false;
    }

    addNewCampaign(camp: Campaign) {

        console.log('new camp', camp);
        var formData: any = new FormData();
        formData.append('campaign_title', camp.name);
        formData.append('campaign_description', camp.description);
        formData.append('requirements', camp.requirement);
        formData.append('location_tags', camp.locationtags);
        formData.append('tags', camp.tags);
        formData.append('caption', camp.caption); //todo
        // formData.append('age_range', JSON.stringify(camp.ages));

        console.log('new camp formdata', formData);
        // formData.append('followers_range', camp.followers);
        // formData.append('')

        formData.append('budget', Math.round(camp.budget));
        if (camp.periodStart != null && camp.periodEnd != null) {
            formData.append('start_date', this.formatDate(camp.periodStart));
            formData.append('end_date', this.formatDate(camp.periodEnd));
        }
        // else {
        //     formData.append('start_date', '');
        //     formData.append('end_date', '');
        // }
        formData.append('images', camp.gallery);
        // console.log('add new camp', camp);
        this.dataService.createCampaign(formData)
            .pipe()
            .subscribe((cdata: any) => {
                console.log('create campaign', cdata);
                const newId = cdata.campaign_uuid;
                camp.id = newId;
                this.campList.push(camp);
            });

        this.campList.sort((a, b) => b.id - a.id);
    }

    makeCriteria(camp: Campaign) {
        let content = 'Age: ' + camp.ages[0] + '-' + camp.ages[1] + '\n'
            + 'Minimum follower: ' + this.translateFollowerLabel(camp.followers[0]) + '-' + this.translateFollowerLabel(camp.followers[1])
            + 'Location - ' + camp.locationtags + '\n'
            + 'Caption: ' + camp.caption;
        return content;
    }

    translateFollowerLabel(value: number): string {
        const num = value / 1000;
        if (num.toString().split('.').length > 1) {
            return num.toFixed(1) + 'K';
        } else {
            return num + 'K';
        }
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        // if (month.length < 2)
        //     month = '0' + month;
        // if (day.length < 2)
        //     day = '0' + day;

        return [year, month, day].join('-');
    }

    deleteCampaign(id) {
        const index = this.campList.findIndex(c => c.id === id);
        this.campList.splice(index, 1);
    }

    deleteFromList(id) {
        const index = this.myList.findIndex(c => c.id === id);
        this.myList.splice(index, 1);
    }

    sortProfiles(field) {
        switch (field) {
            case 'popular': {
                this.profiles.sort((a, b) => b.hotness - a.hotness);
                break;
            }
            case 'follower': {
                this.profiles.sort((a, b) => b.followers - a.followers);
                break;
            }
            case 'alphabetic': {
                this.profiles.sort((a, b) => a.name.localeCompare(b.name));
                break;
            }
        }
    }

    filter(value) {
        console.log(value);
        return this.campList.filter(it => {
            return it.platform.findIndex(elem => {
                return elem === value;
            }) !== -1;
        });
    }

    getCatLabel(value) {
        const id = this.categories.findIndex((elem) => elem.value === value);
        return id !== -1 ? this.categories[id].label : '';
    }

    getSocialLabel(value) {
        const id = this.platforms.findIndex((elem) => elem.value === value);
        return id !== -1 ? this.platforms[id].label : '';
    }

    getPlaceLabel(value) {
        const id = this.placements.findIndex((elem) => elem.value === value);
        return id !== -1 ? this.placements[id].label : '';
    }

    getLangLabel(value) {
        const id = this.languages.findIndex((elem) => elem.code === value);
        return id !== -1 ? this.languages[id].name : '';
    }

    getStatesLabel(value) {
        const id = this.states.findIndex((elem) => elem.code === value);
        return id !== -1 ? this.states[id].name : '';
    }

    getCountryLabel(value) {
        const id = this.countries.findIndex((elem) => elem.code === value);
        return id !== -1 ? this.countries[id].name : '';
    }

    getCityLabel(value) {
        const id = this.cities.findIndex((elem) => elem.code === value);
        return id !== -1 ? this.cities[id].name : '';
    }

    getCampaignList() {
        return this.campList;
    }

    getProfileList() {
        return this.profiles;
    }


    saveCampaignToFavorites(favorite_id, campaign_id) {

        let details =
            {
                "details": {
                    "added": [campaign_id]
                }
            }
        this.dataService.addCampaignToFavorites(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    saveCampaignToMyList(my_list_id, id) {
        let details =
            {
                "details": {
                    "added": [id]
                }
            }
        this.dataService.addCampaignToMyList(my_list_id, details).pipe().subscribe((response: any) => {
        })
    }

    removeCampaignFromCampaignFavorites(favorite_id, campaign_id) {

        let details =
            {
                "details": {
                    "removed": [campaign_id]
                }
            }
        this.dataService.removeCampaignFromCampaignFavorites(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    removeCampaignFromMyList(favorite_id, campaign_id) {

        let details =
            {
                "details": {
                    "removed": [campaign_id]
                }
            }
        this.dataService.removeCampaignFromMyList(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    saveInfluencerToFavoriteList(favorite_id, profile_id) {
        let details =
            {
                "details": {
                    "added": [profile_id]
                }
            }
        this.dataService.addInfluencerToFavoriteList(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    removeInfluencerFromInfluencerFavoriteList(favorite_id, profile_id) {

        let details =
            {
                "details": {
                    "removed": [profile_id]
                }
            }
        this.dataService.removeInfluencerFromInfluencerFavoriteList(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    saveInfluencerToMyList(favorite_id, profile_id) {
        let details =
            {
                "details": {
                    "added": [profile_id]
                }
            }
        this.dataService.addInfluencerToMyList(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }

    removeInfluencerFromMyList(favorite_id, profile_id) {

        let details =
            {
                "details": {
                    "removed": [profile_id]
                }
            }
        this.dataService.removeInfluencerFromMyList(favorite_id, details).pipe().subscribe((response: any) => {
        })
    }
}
