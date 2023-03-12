import { createContext } from "react";

export const initialState = {
  logoAsset: null,
  title: "",
  description: "",
};

const SiteSettingsContext = createContext(initialState);

export const SiteSettingsContextConsumer = SiteSettingsContext.Consumer;
export const SiteSettingsContextProvider = SiteSettingsContext.Provider;

export default SiteSettingsContext;
