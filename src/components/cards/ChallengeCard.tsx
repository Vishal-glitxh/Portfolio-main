import React from "react";
import { InfoCard } from "../common/InfoCard";
import { Divider } from "../common/Divider";
import { Challenge } from "../../types";

interface ChallengeCardProps {
  challenge: Challenge;
}

export const ChallengeCard = React.memo(({ challenge }: ChallengeCardProps) => {
  return (
    <InfoCard title={challenge.problem}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div><strong>Root Cause:</strong> {challenge.rootCause}</div>
        <div><strong>Solution:</strong> {challenge.solution}</div>
        <Divider />
        <div><strong>Learning:</strong> {challenge.technicalLearning}</div>
        <div><strong>Prevention:</strong> {challenge.futurePrevention}</div>
      </div>
    </InfoCard>
  );
});

ChallengeCard.displayName = "ChallengeCard";
