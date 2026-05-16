import React from 'react';
import ChallengeLevelSection from '../shared/ChallengeLevelSection';

const IntermediateChallengesSection = ({ level, challenges, onPlayChallenge }) => (
  <ChallengeLevelSection level={level} challenges={challenges} onPlayChallenge={onPlayChallenge} />
);

export default IntermediateChallengesSection;
