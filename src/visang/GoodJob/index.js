import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as _ from "lodash";

const CommonGoodJob = styled.div` 
  position: absolute;
  left: 50%;
  top: 50%;
  background-image: url(${props => props.url});
  width: 400px;  
  height: 407px;
  transform: translate(-50%, -50%) scale(0.8, 0.8);
  background-position: center;
  visibility: visible; 
  pointer-events: auto;
  z-index: 100;
  opacity: ${props => props.off ? 0 : 1};
  transform: translate(-50%, -50%) scale(${props => props.off ? 0 : 1});
  transition: transform 0.3s ${props => props.off ? 'opacity 0.3s' : 'cubic-bezier(0.405, 0.42, 0.135, 1.2) 0s'};
`;

export function GoodJob({view, imageUrl, onComplete, delay}) {

  const [off, setOff] = useState(false);

  useEffect(() => {
    const fOne = _.debounce(() => {
      if (view && off) {
          onComplete();
      }
      setOff(false);
    }, 500);

    const fTwo = _.debounce(() => {
      if (view) {
        setOff(true)
        fOne();
      }
      else
        setOff(false);
    }, delay);

    setOff(false);
    if (view)
      fTwo();
    console.log('useEffect', view)
  }, [onComplete, view]);

  return (
    <CommonGoodJob
      view={view}
      url={imageUrl}
      onClick={ ev => onComplete({depth: 0, event: ev }) } 
      off={off}
    />
  );

}

GoodJob.defaultProps = {
  view: true,
  delay: 800,
  imageUrl: '/kor_lib/images/goodjob.png',
  onComplete: () => { console.log('complete')}
}

GoodJob.propTypes = {
  /**
   버튼을 보이거나 숨긴다 
  */
  view: PropTypes.bool.isRequired,
  /**
   time delay
  */
  delay: PropTypes.number,
  /**
   * 배경 이미지
   */
  imageUrl: PropTypes.string,
  /**
   onComplete handler. 
  */
  onComplete: PropTypes.func,
};

export default GoodJob;