export const inValidatePassword = (password: string, checked: boolean) => {
    const lengthCheck = password.length >= 8;

    const regexCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/;
    if (checked) {
        if (lengthCheck && regexCheck.test(password)) {
            return false;
        }

        return true;
    }
    return false;
};

export const inValidateMinNumber = (
    value: number,
    min: number,
    checked: boolean
) => {
    if (checked) {
        if (value >= min) {
            return false;
        }
        return true;
    }
    return false;
};

export const inValidatePasswordWording = (password: string) => {
    const lengthCheck = password.length >= 8;

    const regexCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/;
    if (password.length === 0) {
        return "กรุณากรอกรหัสผ่าน";
    }
    if (!lengthCheck) {
        return "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    }
    if (!regexCheck.test(password)) {
        return "รหัสผ่านต้องประกอบด้วยตัวอักษรและตัวเลข";
    }
    return "";
};

export const inValidateSelected = (value: number, checked: boolean) => {
    if (checked) {
        if (value >= 1) {
            return false;
        }
        return true;
    }
    return false;
};

export const inValidateLength = (
    value: string,
    length: number,
    checked: boolean
) => {
    if (checked) {
        if (value.length >= length) {
            return false;
        }
        return true;
    }
    return false;
};

export const inValidatePhone = (phone: string, checked: boolean) => {
    if (checked) {
        const regex = /^\d{10}$/;
        if (!regex.test(phone)) {
            return true;
        }
        return false;
    }
    return false;
};

export const inValidatePhoneWording = (phone: string) => {
    const regex = /^\d{10}$/;
    if (phone.length === 0) {
        return "กรุณากรอกเบอร์โทรศัพท์";
    }
    if (!regex.test(phone)) {
        return "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
    }
    return "";
};

export const inValidateEmail = (email: string, checked: boolean) => {
    if (checked) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return !regex.test(email);
    }
    return false;
};

export const inValidateEmailWording = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) {
        return "กรุณากรอกอีเมล";
    }
    if (!regex.test(email)) {
        return "รูปแบบอีเมลไม่ถูกต้อง";
    }
    return "";
};
