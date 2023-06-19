import { signIn } from "next-auth/react";
import { InputErros } from "../types/error";

type InputErrors = { [key: string]: string }[];

export const getErrorMsg = (key: string, errors: InputErrors): string | null => {
    if (Array.isArray(errors)) {
        const errorObj = errors.find(err => Object.prototype.hasOwnProperty.call(err, key));
        return errorObj ? errorObj[key] : null;
    }
    return null;
};
