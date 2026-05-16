import React from 'react';
import ChallengeLevelSection from '../shared/ChallengeLevelSection';

const AdvancedChallengesSection = ({ level, challenges, onPlayChallenge }) => (
  <ChallengeLevelSection level={level} challenges={challenges} onPlayChallenge={onPlayChallenge} />
);

export default AdvancedChallengesSection;
