const addresses = [
  { id: 1, value: "lenina 1" },
  { id: 2, value: "karla marksa 5" },
];

export const addressesRepository = {
  getAddresses(value?: string | undefined) {
    if (value) {
      const address = addresses.filter((a) => a.value.indexOf(value) > -1);
      return address;
    } else {
      return addresses;
    }
  },

  getAddressItem(id: number) {
    const address = addresses.find((a) => a.id === id);
    return address;
  },

  deleteAddress(id: number) {
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i].id === id) {
        addresses.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  createAddress(value: string) {
    const newAddress = { id: +new Date(), value };
    addresses.push(newAddress);
    return addresses;
  },

  changeAddress(id: number, value: string) {
    const address = addresses.find((a) => a.id === id);
    if (address) {
      address.value = value;
      return true;
    } else {
      return false;
    }
  },
};
