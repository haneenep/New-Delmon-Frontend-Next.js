import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const GUEST_ID_KEY = "guest_id";

const generateGuestId = (): string => {
    return uuidv4();
};

export const getGuestId = (): string => {
    let guestId = Cookies.get(GUEST_ID_KEY);

    if (!guestId) {
        guestId = generateGuestId();
        setGuestId(guestId);
    }

    return guestId;
};

export const setGuestId = (guestId: string): void => {
    Cookies.set(GUEST_ID_KEY, guestId, {
        expires: 365, // 1 year
        secure: true,
        sameSite: "strict",
    });
};

export const removeGuestId = (): void => {
    Cookies.remove(GUEST_ID_KEY);
};
