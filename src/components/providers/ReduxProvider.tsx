"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../../redux/store";
import { useEffect } from "react";
import { hydrateAuth } from "@/src/redux/auth/authSlice";
import { fetchCart } from "@/src/redux/cart/cartThunk";
import { fetchWishlist } from "@/src/redux/wishlist/wishlistThunk";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useRedux";

type ReduxProviderProps = {
  children: React.ReactNode;
};

function InitAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(hydrateAuth());

    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>
    <InitAuth>
      {children}
    </InitAuth>
  </Provider>
}
