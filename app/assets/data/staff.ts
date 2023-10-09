import { Cell } from "react-table";

export interface StaffRowData {
    id: number;
    name: string;
    position: string;
    email: string;
    phone: string;
    carOwn: string[];
    service: boolean
    actions?: any
}