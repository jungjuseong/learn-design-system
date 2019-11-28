import React, {useState, useEffect, useRef,forwardRef} from 'react';
import PropTypes from 'prop-types';

import './mybutton.scss';

const MyButton = ({name, style, id, on, disabled, view, onClick, onMouseLeave, onMouseUp, onMouseDown, 
    onTransitionEnd, preventEvent,disableCapture, disableRender, children}) => {
    const [pointerId, setPointerId] = useState(-1);

    const [mon, setMon] = useState(on);
    useEffect(() => {
        if (mon !== on) setMon(on);
        console.log('useEffec on')
    }, [mon, on]);

    const initEventListener = (el) => {
        el.setAttribute("touch-action", "none");
        el.addEventListener("pointerdown", e => {
            if (pointerId < 0) {
                (!disableRender) && setPointerId(e.pointerId);
                if (!disableCapture) {
                    try {
                        el.setPointerCapture(pointerId);
                    } catch (e) {}                
                }
                onMouseDown && onMouseDown(e);     
            }
        });
        el.addEventListener("pointerup", e => {
            if (pointerId === e.pointerId) {
                try {
                    el.releasePointerCapture(pointerId);
                } catch(e) {}
                setPointerId(-1);
                onMouseUp && onMouseUp(e);
            }
        });
        el.addEventListener("pointerleave", e => {
            if (disableCapture && pointerId === e.pointerId) {
                try {
                    el.releasePointerCapture(pointerId);
                } catch(e) {}
                setPointerId(-1);
            }
            onMouseLeave && onMouseLeave(e);
        });
        el.addEventListener("pointercancel", e => {
            if (pointerId === e.pointerId) {
                try {
                    el.releasePointerCapture(pointerId);
                } catch(e) {}
                setPointerId(-1);
            }
            onMouseLeave && onMouseLeave(e);
        });
    }
    useEffect(() => { 
        initEventListener(buttonRef.current);
    });

    const _onClick = (e) => {
        if (preventEvent) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const [className, setClassName] = useState(name);
    useEffect(() => {
        const styleNames = [name];
        if (mon) 
            styleNames.push("on");
    
        if (pointerId > 0) 
            styleNames.push("down");

        const styleName = styleNames.join(" ");
        if (styleName !== className) {
            setClassName(styleName);
            console.log(className, ' *');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mon, pointerId]);
    
    const [displayStyle, setDisplayStyle] = useState(style);
    useEffect(() => {
        (displayStyle !== undefined) && console.log(displayStyle)
        let style = {}
        if (view === false) {
            if (displayStyle === undefined) { 
                style['overflow'] = 'auto'
            }
            style['display'] = 'none'
            setDisplayStyle(style)
        }
    },[view, displayStyle]);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (disabled || view) {
            if (pointerId >= 0) {
                try {
                    buttonRef.current.releasePointerCapture(pointerId);
                } catch(err) {}         
                setPointerId(-1);
            }
            console.log('useEffec pointerId >= 0', pointerId)
        }
    }, [disabled, view, pointerId]);    

    return (
        <button
            id={id}
            className={name}
            onClick={_onClick}
            ref={buttonRef}
            disabled={disabled}
            onTransitionEnd={onTransitionEnd}
            style={displayStyle}
        >
            {children}
        </button>
    )
}

export function ToggleBtn(props) {
    return <MyButton {...props}>
    </MyButton>
}

export function AudioBtn(props) {   
    return <MyButton {...props} />
}

MyButton.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    on: PropTypes.bool,
    disabled: PropTypes.bool,
    view: PropTypes.bool,
    preventEvent: PropTypes.bool,
    style: PropTypes.string,
    onClick:PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    onRef: PropTypes.func,
    disableCapture: PropTypes.bool,
    disableRender: PropTypes.bool,
    preventPointerEvent: PropTypes.string, // "leave" | "down" | "both",
}