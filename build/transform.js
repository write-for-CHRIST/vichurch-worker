"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const vikit_1 = require("vikit");
exports.transformProfileToPrisma = (profile) => R.evolve({
    firstName: R.pipe(R.trim, R.split(' '), R.last),
    lastName: R.pipe(R.trim, R.split(' '), (list) => R.dropLast(1, list), R.join(' ')),
    phoneNumber: R.pipe(R.trim, vikit_1.changePhonePrefix)
}, profile);
//# sourceMappingURL=transform.js.map