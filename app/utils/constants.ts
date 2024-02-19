export const BASE_PATH = process.env.NEXT_PUBLIC_BASEPATH;

export const parkingColumns = [
    { name: "ชื่อ", uid: "name", sortable: true },
    { name: "คำอธิบาย", uid: "description", sortable: true },
    { name: "จำนวน", uid: "amount", sortable: true },
    { name: "โซน", uid: "zone" },
    { name: "", uid: "actions" },
];

export const staffColumns = [
    { name: "ชื่อ", uid: "firstname", sortable: true },
    { name: "นามสกุล", uid: "lastname", sortable: true },
    { name: "อีเมลล์", uid: "email", sortable: true },
    { name: "เบอร์มือถือ", uid: "phoneNumber", sortable: true },
    //* Comment
    // { name: "ตำแหน่ง", uid: "position", sortable: true },
    { name: "สถานะ", uid: "status", sortable: true },
    { name: "", uid: "actions" },
];

export const deviceColumns = [
    {
        name: "ชื่อ",
        uid: "name",
        sortable: true,
    },
    {
        name: "คำอธิบาย",
        uid: "description",
        sortable: false,
    },
    {
        name: "ราคา",
        uid: "price",
        sortable: true,
    },
    {
        name: "แบรนด์",
        uid: "brand",
        sortable: true,
    },
    {
        name: "โซน",
        uid: "zone",
        sortable: true,
    },
    {
        name: "",
        uid: "actions",
        sortable: false,
    },
];

export const zoneColumns = [
    {
        name: "ชื่อ",
        uid: "name",
        sortable: true,
    },
    {
        name: "คำอธิบาย",
        uid: "description",
        sortable: false,
    },
    {
        name: "รองรับการใช้งาน",
        uid: "maximumCapacity",
        sortable: true,
    },
    {
        name: "ใช้งานอยู่",
        uid: "occupancy",
        sortable: true,
    },
    {
        name: "ที่อยู่",
        uid: "address",
        sortable: true,
    },
    {
        name: "ละติจูด",
        uid: "latitude",
        sortable: false,
    },
    {
        name: "ลองติจูด",
        uid: "longitude",
        sortable: false,
    },
    {
        name: "",
        uid: "actions",
        sortable: false,
    },
];

export const carColumns = [
    {
        name: "ทะเบียนรถ",
        uid: "licensePlate",
        sortable: true,
    },
    {
        name: "สี",
        uid: "color",
        sortable: true,
    },
    {
        name: "ยี่ห้อ",
        uid: "brand",
        sortable: true,
    },
    {
        name: "รุ่น",
        uid: "model",
        sortable: true,
    },
    {
        name: "ปี",
        uid: "year",
        sortable: true,
    },
    {
        name: "เจ้าของ",
        uid: "staff",
        sortable: true,
    },
    {
        name: "",
        uid: "actions",
        sortable: false,
    },
];

export const userColumns = [
    {
        name: "ชื่อ",
        uid: "firstname",
        sortable: true,
    },
    {
        name: "นามสกุล",
        uid: "lastname",
        sortable: true,
    },
    {
        name: "อีเมลล์",
        uid: "email",
        sortable: true,
    },

    {
        name: "",
        uid: "actions",
        sortable: false,
    },
];

export const logColumns = [
    {
        name: "แผ่นป้ายทะเบียน",
        uid: "car",
        sortable: true,
    },
    {
        name: "เจ้าของ",
        uid: "staff",
        sortable: true,
    },
    {
        name: "เวลา",
        uid: "timestamp",
        sortable: true,
    },
    {
        name: "เข้า/ออก",
        uid: "arrowDirection",
        sortable: true,
    },
];
