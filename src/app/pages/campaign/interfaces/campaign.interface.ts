import {BankAcc, CCard} from './payment.interface';

export interface Campaign {
    id?: any;
    name: string;
    category: string[];
    budget: number;
    coverImg: string;
    description?: string;
    platform: string[];
    placement: string[];
    requirement: string;
    periodStart?: string;
    periodEnd?: string;
    caption?: string;
    locationtags?: string[];
    tags: string[];
    tags2: string[];
    quests?: number[];
    contents?: number[];
    gallery?: string[];
    ages: number[];
    followers: number[];
    gender: string;
    city: string;
    country: string;
    langs: string[];
    billingName: string;
    billingAddress1: string;
    billingAddress2: string;
    billingState: string;
    billingCity: string;
    billingZipcode: string;
    ccards?: CCard[];
    bankAccount?: BankAcc;
    favorite: boolean;
    in_queue?: boolean;
}
