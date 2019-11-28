import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, typography } from './shared/styles';
import { glow } from './shared/animation';
import { Icon } from './Icon';

export const sizes = {
  xlarge: 55,
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16,
};

const Image = styled.div`
  background: ${props => (!props.loading ? 'transparent' : color.light)};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  height: ${sizes.medium}px;
  width: ${sizes.medium}px;
  line-height: ${sizes.medium}px;

  ${props =>
    props.size === 'tiny' &&
    css`
      height: ${sizes.tiny}px;
      width: ${sizes.tiny}px;
      line-height: ${sizes.tiny}px;
    `}

  ${props =>
    props.size === 'small' &&
    css`
      height: ${sizes.small}px;
      width: ${sizes.small}px;
      line-height: ${sizes.small}px;
    `}

  ${props =>
    props.size === 'large' &&
    css`
      height: ${sizes.large}px;
      width: ${sizes.large}px;
      line-height: ${sizes.large}px;
    `}

  ${props =>
    props.size === 'xlarge' &&
    css`
      height: ${sizes.xlarge}px;
      width: ${sizes.xlarge}px;
      line-height: ${sizes.xlarge}px;
    `}

  ${props =>
    !props.src &&
    css`
      background: ${!props.loading && '#37D5D3'};
    `}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -2px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: ${color.medium};
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`;

// prettier-ignore
const Initial = styled.div`
  color: ${color.lightest};
  text-align: center;

  font-size: ${typography.size.s2}px;
  line-height: ${sizes.medium}px;

  ${props => props.size === "tiny" && css`
    font-size: ${typography.size.s1 - 2}px;
    line-height: ${sizes.tiny}px;
  `}

  ${props => props.size === "small" && css`
    font-size: ${typography.size.s1}px;
    line-height: ${sizes.small}px;
  `}

  ${props => props.size === "large" && css`
    font-size: ${typography.size.s3}px;
    line-height: ${sizes.large}px;
  `}

  ${props => props.size === "xlarge" && css`
  font-size: ${typography.size.s4}px;
  line-height: ${sizes.xlarge}px;
`}
`;

/**
- 특정 사용자에게 액션 또는 콘텐츠를 부가하기 위해 아바타를 사용한다.
- 사용자의 이름이 이미지 옆 또는 툴팁으로 표시되므로 반드시 필요하다.
 **/
export function Avatar({ loading, username, src, size, ...props }) {
  let avatarFigure = <Icon icon="useralt" />;
  const a11yProps = {};

  if (loading) {
    a11yProps['aria-busy'] = true;
    a11yProps['aria-label'] = 'Loading avatar ...';
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />;
  } else {
    a11yProps['aria-label'] = username;
    avatarFigure = (
      <Initial size={size} aria-hidden="true">
        {username.substring(0, 1)}
      </Initial>
    );
  }

  return (
    <Image size={size} loading={loading} src={src} {...a11yProps} {...props}>
      {avatarFigure}
    </Image>
  );
}

Avatar.propTypes = {
  /**
   데이터 아바타가 로딩 중인 상태를 표시하려면 loading 상태를 사용한다 
  */
  loading: PropTypes.bool,
  /**
   Avatar falls back to the user’s initial when no image is provided. Supply a `username` and omit `src` to see what this looks like.
  */
  username: PropTypes.string,
  /**
   The URL of the Avatar's image.
  */
  src: PropTypes.string,
  /**
   Avatar comes in five sizes. In most cases, you’ll be fine with `medium`. 
  */
  size: PropTypes.oneOf(Object.keys(sizes)),
};

Avatar.defaultProps = {
  loading: false,
  username: 'loading',
  src: null,
  size: 'medium',
};
