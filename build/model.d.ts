export interface Profile {
    id: string;
    oldId: string;
    firstName: string;
    lastName: string;
    gender: boolean;
    phoneNumber: string;
    birthday: string;
    joinDate: string;
    job: string;
    address: Address;
}
export interface Address {
    street: string;
    commune: string;
    district: string;
}
