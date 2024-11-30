export enum FieldTypes {
  number = "number",
  stringList = "stringList",
  string = "string",
}

export enum Operators {
  contains = "contains",
  isEquals = "is equals",
  isGreaterThan = "is greater than",
  isLessThan = "is less than",
}
export type ToperatorToSignMap = Record<Operators, string>;

export const operatorToSignMap = {
  [Operators.contains]: "in",
  [Operators.isEquals]: "",
  [Operators.isGreaterThan]: "gt",
  [Operators.isLessThan]: "lt",
};

export type Field = {
  name: EFields;
  type: FieldTypes;
};

export enum connecters {
  and = "and",
}

export interface IFilter {
  field: Field;
  operator: Operators;
  value: string;
  id: string;
  Connecter: connecters | null;
}

export type ToperatorFieldMap = Record<FieldTypes, Operators[]>;

export const operatorFieldMap: ToperatorFieldMap = {
  [FieldTypes.number]: [
    Operators.isEquals,
    Operators.isGreaterThan,
    Operators.isLessThan,
  ],
  [FieldTypes.stringList]: [Operators.contains],
  [FieldTypes.string]: [],
};

export enum CabinTypes {
  singleBed = "Single Bed",
  doubleBed = "Double Bed",
  twinBed = "Twin Bed",
  tripleBed = "Triple Bed",
  quadBed = "Quad Bed",
  queenBed = "Queen Bed",
  kingBed = "King Bed",
  suite = "Suite",
  studio = "Studio",
}

export enum ViewTypeEnum {
  NONE = "None",
  OCEAN = "Ocean View",
  MOUNTAIN = "Mountain View",
  CITY = "City View",
  GARDEN = "Garden View",
  LAKE = "Lake View",
  POOL = "Pool View",
  COURTYARD = "Courtyard View",
  WILDLIFE = "Wildlife View",
  PARTIAL = "Partial View",
  PARK = "Park View",
  FOREST = "Forest View",
}

export enum BedConfigurations {
  KingBed = "King Bed",
  QueenBed = "Queen Bed",
  DoubleBed = "Double Bed",
  TwinBeds = "Twin Beds",
  BunkBeds = "Bunk Beds",
  Single = "Single Bed",
}

export enum amenities {
  Bed = "Bed",
  WiFi = "WiFi",
  AirConditioning = "Air Conditioning",
  Television = "Television",
  MiniFridge = "Mini Fridge",
  CoffeeTeaMaker = "Coffee/Tea Maker",
  RoomService = "Room Service",
  DeskAndChair = "Desk and Chair",
  Telephone = "Telephone",
  Wardrobe = "Wardrobe/Closet",
  Safe = "Safe",
  IronAndIroningBoard = "Iron and Ironing Board",
  Hairdryer = "Hairdryer",
  PrivateBathroom = "Private Bathroom",
  Toiletries = "Toiletries",
  TowelsAndBathrobe = "Towels and Bathrobe",
  Slippers = "Slippers",
  BlackoutCurtains = "Blackout Curtains",
  SoundproofWindows = "Soundproof Windows",
  Balcony = "Balcony or Window View",
  LaundryService = "Laundry Service",
  DailyHousekeeping = "Daily Housekeeping",
  AlarmClock = "Alarm Clock",
  USBChargingPorts = "USB Charging Ports",
}

export enum EFields {
  RoomType = "cabinType",
  Aminities = "amenities",
  BedConfiguration = "bedConfigurations",
  Capacity = "maxCapacity",
  Discount = "discount",
  ViewType = "viewType",
  Beds = "numBeds",
  Price = "regularPrice",
}
export type TfieldToValueMap = Record<EFields, string[]>;

export const fieldToValueMap: TfieldToValueMap = {
  [EFields.RoomType]: Object.values(CabinTypes),
  [EFields.Aminities]: Object.values(amenities),
  [EFields.BedConfiguration]: Object.values(BedConfigurations),
  [EFields.ViewType]: Object.values(ViewTypeEnum),
  [EFields.Capacity]: ["0"],
  [EFields.Discount]: ["0"],
  [EFields.Beds]: ["0"],
  [EFields.Price]: ["0"],
};
