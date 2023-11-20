import { Cell } from "react-table";

export interface StaffRowData {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    phone: string;
    carOwn: string[];
    service: boolean
    actions?: any
}