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
const hukk_1 = require("hukk");
const airtable_1 = require("./airtable");
// Register new hook object
hukk_1.default.register({
    endpoint: '/webhook',
    handle: (data) => __awaiter(this, void 0, void 0, function* () {
        const { action } = data.body;
        console.log(`Receive action: ${action}`);
        switch (action) {
            case 'sync-profiles':
                console.log('Fetching profiles from AirTable...');
                const profiles = yield airtable_1.getAllProfiles();
                console.log('Resolved!');
                return profiles;
            default:
                return { message: 'not an action' };
        }
    }),
});
const port = +process.env.PORT || 5000;
hukk_1.default.listen(port, () => {
    console.log(`Hook server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map