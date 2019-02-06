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
const vichurch_model_1 = require("@write-for-christ/vichurch-model");
exports.prisma = vichurch_model_1.prisma;
/**
 * Sync profile from source
 */
const syncProfile = (record) => __awaiter(this, void 0, void 0, function* () {
    try {
        const profile = {
            oldId: record.oldId,
            firstName: record.firstName,
            lastName: record.lastName,
            gender: record.gender,
        };
        const result = yield vichurch_model_1.prisma.upsertProfile({
            where: { oldId: record.oldId },
            create: profile,
            update: profile,
        });
        return result;
    }
    catch (err) {
        throw new Error(`Could not sync profile: ${record.lastName} ${record.firstName} ${err.code}: ${err.message}`);
    }
});
//# sourceMappingURL=prisma.js.map