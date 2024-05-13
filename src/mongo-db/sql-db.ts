//SQL-DB

//table
type User = {
  id: number; // PK🔑 auto inc - db task
  firstName: string;
  lastName: string;
  passportNumber: number;
};

//table
type Wallet = {
  id: string; // PK🔑 uuid - app lvl
  title: string;
  currency: "USD" | "BTN" | "RBL";
  ownerId: number; // FK🔑
};

//table
type Profile = {
  hobby: string;
  education: string;
  userId: number; // FK🔑
};

//table
type WalletsSharing = {
  id: string; // PK🔑 uuid - app lvl
  /* PK🔑 */ walletId: string; // FK🔑
  /* PK🔑 */ userId: number; // FK🔑
  addedDate: Date;
  status: "ACTIVE" | "DELETED" | "PAUSED";
};

//table
type WalletsSharingLimits = {
  walletSharing: string; // FK🔑
  limitPerDay: number;
  limitPerWeek: number;
  limitPerMonth: number;
};
