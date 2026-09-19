import { useContext } from "react";
import { ToastContext } from "../Components/Common/ToastProvider";

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider (inside SiteShell)");
    }
    return ctx;
}
