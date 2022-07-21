import { DateRange, Car, Location } from "../../types/carrental.types"

export interface Booking {
  id: number
  guid: string
  dateRange: DateRange
  car: Car
  location: Location
}