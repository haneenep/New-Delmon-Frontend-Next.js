import { Suspense } from "react";
import Login from "@/src/components/auth/Login";
import Loading from "@/src/components/common/Loading";


export default function LoginPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Login />
        </Suspense>
    )
}