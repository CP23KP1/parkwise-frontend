import { Cell } from "react-table";

export const zoneTableHeader = ["อันดับ", "ชื่อโซน", "ผู้ใช้บริการ", "รองรับได้"];

export interface ZoneTableHeaderData {
    name: string;
    value: number;
    avaliable: number;
    description: string;
    occupancy: number;
    maximum_capacity: number;
    address: string;
    lat: number;
    long: number;
    actions?: Cell
}

export interface ZoneRowData {
    id: number;
    name: string;
    description: string;
    occupancy: number;
    maximumCapacity: number;
    address: string;
    avaliable: number;
    latitude: number;
    longitude: number;
    actions?: Cell
  }