import type { ComponentType } from "react";
import { BankDash, Esg, Gateway, GovDash, Market, Vetting } from "./shared";
import {
  AgriFlow,
  AgriFund,
  AgriFarmer,
  AgriMarketAccess,
  AgriOverview,
  AgriPack,
  AgriQuality,
  AgriShield,
  AgriSight,
} from "./agri";

export const MODULES: Record<string, ComponentType> = {
  overview: AgriOverview,
  gov: GovDash,
  bank: BankDash,
  fund: AgriFund,
  farmer: AgriFarmer,
  switch: AgriMarketAccess,
  pack: AgriPack,
  quality: AgriQuality,
  flow: AgriFlow,
  sight: AgriSight,
  shield: AgriShield,
  vetting: Vetting,
  esg: Esg,
  market: Market,
  gateway: Gateway,
};
