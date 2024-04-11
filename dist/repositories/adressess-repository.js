"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRepository = void 0;
const addresses = [
    { id: 1, value: "lenina 1" },
    { id: 2, value: "karla marksa 5" },
];
exports.addressesRepository = {
    getAddresses(value) {
        if (value) {
            const address = addresses.filter((a) => a.value.indexOf(value) > -1);
            return address;
        }
        else {
            return addresses;
        }
    },
};
