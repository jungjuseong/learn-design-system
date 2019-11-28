import React from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';

export default {
  title: 'Design System|Badge',
  component: Badge,
};

export const allBadges = () => (
  <div>
    <Badge status="positive">긍정적</Badge>
    <Badge status="negative">부정적</Badge>
    <Badge status="neutral">중립적</Badge>
    <Badge status="error">에러</Badge>
    <Badge status="warning">경고</Badge>
    <Badge status="positive">
      <Icon icon="facehappy" inline />
      with icon
    </Badge>
  </div>
);

allBadges.story = {
  name: '모든 뱃지',
};

export const positive = () => <Badge status="positive">긍정적</Badge>;
positive.story = { name: '긍정적 뱃지' };
export const negative = () => <Badge status="negative">부정적</Badge>;
export const warning = () => <Badge status="warning">경고</Badge>;
export const neutral = () => <Badge status="neutral">중립적</Badge>;
export const error = () => <Badge status="error">에러</Badge>;

export const withIcon = () => (
  <Badge status="warning">
    <Icon icon="check" inline />
    with icon
  </Badge>
);

withIcon.story = {
  name: 'with icon',
};
