import { Make } from "../pages/carsearch/carsearch.types"

export enum CarType {
  Sedan,
  Small,
  Medium,
  Suv,
  Van,
  Supercar,
  Pickup,
  Minivan,
}

export enum Location{
  Stockholm,
  Malmo,
  Gothenburg,
}

export interface Car{
  id: number
  guid: string
  price: number
  carType: CarType 
  carMake: Make
  name: string
  location: Location
  automatic: boolean
  imageUrl: string
}

export interface DateRange {
  start: Date
  end: Date
}