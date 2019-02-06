"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AirTable = require("airtable");
const transform_1 = require("./transform");
const API_KEY = process.env.AIRTABLE_API_KEY || 'key0SLULeApFH8XRH';
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appgAjEWh6PYnk0eS';
console.log(`AIRTABLE API KEY: ${API_KEY} - BASE ID: ${BASE_ID}`);
AirTable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: API_KEY,
});
exports.base = AirTable.base(BASE_ID);
exports.getAllProfiles = () => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const profileList = [];
        exports.base('Profile')
            .select({
            maxRecords: 1000,
            pageSize: 100,
            view: 'Danh sách đầy đủ',
        })
            .eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                const profile = {
                    id: record.id,
                    firstName: record.get('full_name'),
                    lastName: record.get('full_name'),
                    birthday: record.get('birthday') || "",
                    joinDate: record.get('join_date') || "",
                    facebookId: record.get('facebook_id') || "",
                    oldId: record.get('id'),
                    gender: record.get('gender'),
                    phoneNumber: record.get('phone_number') || "",
                    address: {
                        street: record.get('address') || "",
                        commune: record.get('address_ward') || "",
                        district: record.get('address_district') || "",
                    },
                    job: record.get('job'),
                    memberType: record.get('member_type'),
                };
                profileList.push(transform_1.transformProfileToPrisma(profile));
            });
            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(profileList);
            }
        });
    });
});
//# sourceMappingURL=airtable.js.map