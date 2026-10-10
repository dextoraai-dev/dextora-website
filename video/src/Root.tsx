import React from "react";
import { Composition } from "remotion";
import { HeroLoop } from "./compositions/HeroLoop";
import { DextoraExplainer } from "./compositions/DextoraExplainer";
import { DhyeyaIasExplainer } from "./compositions/DhyeyaIasExplainer";
import { DextoraLearnExplainer } from "./compositions/DextoraLearnExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Hero Loop: 9 seconds, seamless, 30fps */}
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Dextora Main Explainer: 35 seconds, 30fps */}
      <Composition
        id="DextoraExplainer"
        component={DextoraExplainer}
        durationInFrames={1050}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3. Dhyeya IAS Explainer: 24 seconds, 30fps */}
      <Composition
        id="DhyeyaIasExplainer"
        component={DhyeyaIasExplainer}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 4. Dextora Learn Explainer: 24 seconds, 30fps */}
      <Composition
        id="DextoraLearnExplainer"
        component={DextoraLearnExplainer}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
