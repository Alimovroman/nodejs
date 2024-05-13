//MONGODB

//collection
type UserMongo = {
  id: number; // auto inc - db task
  firstName: string;
  lastName: string;
  passportNumber: number;
  // wallets: Wallet[];
  profile: Profile;
  sharedWalletsIds: { title: string; id: string; currency: string }[];
};
type ProfileMongo = {
  hobby: string;
  education: string;
};

//collection
type WalletMongo = {
  id: string; // PK🔑 uuid - app lvl
  title: string;
  currency: "USD" | "BTN" | "RBL";
  ownerId: number; // FK🔑
  sharedWithUsers: { fullName: string; userId: number }[];
};
