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
    getAddressItem(id) {
        const address = addresses.find((a) => a.id === id);
        return address;
    },
    deleteAddress(id) {
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === id) {
                addresses.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    createAddress(value) {
        const newAddress = { id: +new Date(), value };
        addresses.push(newAddress);
        return addresses;
    },
    changeAddress(id, value) {
        const address = addresses.find((a) => a.id === id);
        if (address) {
            address.value = value;
            return true;
        }
        else {
            return false;
        }
    },
};
