import React from 'react';
import ChallengeLevelSection from '../shared/ChallengeLevelSection';

const BaseChallengesSection = ({ level, challenges, onPlayChallenge }) => (
  <ChallengeLevelSection level={level} challenges={challenges} onPlayChallenge={onPlayChallenge} />
);

export default BaseChallengesSection;
