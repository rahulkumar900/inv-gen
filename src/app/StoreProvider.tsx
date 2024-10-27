"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import dynamic from "next/dynamic";
import { persistStore } from "redux-persist";

const PersistGate = dynamic(
  () => import("redux-persist/integration/react").then(mod => mod.PersistGate),
  { ssr: false }
);


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(initializeCount(count));
  }
  const persistor = persistStore(storeRef.current as AppStore);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
