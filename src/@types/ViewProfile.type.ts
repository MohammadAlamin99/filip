export interface IViewProfile {
    photo?: string;
    name: string;
    city?: string;
    aboutMe?: string;
    skills: string[];
}

export interface UserType {
    id: string;
    email: string;
    age?: number;
    profile: IViewProfile;
    createdAt?: any;
    updatedAt?: any;
}
