import { Cell } from "react-table";

export interface StaffRowData {
    id: number;
    firstname: string;
    lastname: string;
    position: string;
    email: string;
    phoneNumber: string;
    service: boolean
    actions?: any
}