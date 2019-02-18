import * as R from 'ramda';
import {changePhonePrefix} from 'vikit';
import {Profile} from './model';

export const transformProfileToPrisma = (profile: Profile): Profile => R.evolve(
    {
      firstName: R.pipe(R.trim, R.split(' '), R.last),
      lastName: R.pipe(
          R.trim, R.split(' '), (list: string[]) => R.dropLast(1, list),
          R.join(' ')),
      phoneNumber: R.pipe(R.trim, changePhonePrefix)
    },
    profile,
);
