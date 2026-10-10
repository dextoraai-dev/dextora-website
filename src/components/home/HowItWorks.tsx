"use client";

import React from "react";
import { ScrollExplainer } from "@/components/explainers/ScrollExplainer";
import { homeHowItWorksExplainer } from "@/data/explainers";

export function HowItWorks() {
  return <ScrollExplainer data={homeHowItWorksExplainer} />;
}

