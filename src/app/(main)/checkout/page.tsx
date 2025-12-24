import Checkout from "@/src/components/checkout/Checkout";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function CheckoutPage() {
    return (
        <ProtectedRoute>
            <Checkout />
        </ProtectedRoute>
    )
}