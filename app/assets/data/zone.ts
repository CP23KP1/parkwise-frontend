import { Cell } from "react-table";

export const zoneTableHeader = ["อันดับ", "ชื่อโซน", "ผู้ใช้บริการ", "รองรับได้"];

export interface ZoneTableHeaderData {
    name: string;
    value: number;
    avaliable: number;
}

export interface ZoneRowData {
    id: number;
    name: string;
    avaliable: number;
    service: number
    actions?: Cell
    // Add more columns as needed
  }