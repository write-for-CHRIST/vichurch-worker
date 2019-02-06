import * as AirTable from 'airtable';
import {Profile} from './model';
import {transformProfileToPrisma} from './transform';

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (API_KEY && BASE_ID) {
  console.log(`AIRTABLE API KEY: ${API_KEY} - BASE ID: ${BASE_ID}`);
} else {
  console.error(
    `PLEASE SPECIFY ENVIRONMENT VARIABLES: AIRTABLE_API_KEY, AIRTABLE_BASE_ID`,
  );
}

AirTable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: API_KEY,
});

export const base = AirTable.base(BASE_ID);

export const getAllProfiles = async () => {
  return new Promise((resolve, reject) => {
    const profileList: Profile[] = [];
    base('Profile')
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'Danh sách đầy đủ',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            const profile = {
              id: record.id,
              firstName: record.get('full_name'),
              lastName: record.get('full_name'),
              birthday: record.get('birthday') || '',
              joinDate: record.get('join_date') || '',
              facebookId: record.get('facebook_id') || '',
              oldId: record.get('id'),
              gender: record.get('gender'),
              phoneNumber: record.get('phone_number') || '',
              address: {
                street: record.get('address') || '',
                commune: record.get('address_ward') || '',
                district: record.get('address_district') || '',
              },
              job: record.get('job'),
              memberType: record.get('member_type'),
            };
            profileList.push(transformProfileToPrisma(profile));
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(profileList);
          }
        },
      );
  });
};
