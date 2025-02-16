import { IAddress } from "./IAddress.model";

export interface IUser {
	firstName: string | null;
	lastName: string | null;
	gender: 'male' | 'female';
	dateOfBirth: Date | null;
	age: number | null;
	email: string | null;
	password: string | null;
	address: IAddress;
}