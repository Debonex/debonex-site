import clsx from "clsx";
import { FC, SVGAttributes, useState } from "react";
import styles from "styles/components/favicon.module.scss";

const Favicon: FC<SVGAttributes<SVGElement>> = (props) => {
  const [jelly, setJelly] = useState(false);

  const handleClick = () => {
    if (!jelly) {
      setJelly(true);
    }
  };

  return (
    <svg version="1.1" viewBox="0 0 680 680" {...props}>
      <g
        className={clsx({ [styles.jelly]: jelly })}
        onMouseEnter={() => setJelly(true)}
        onAnimationEnd={() => setJelly(false)}
        onClick={handleClick}
      >
        <path
          fill="#2B7FD5"
          d="M580.5,434.8c0,143.8-256.8,193.2-421,206.3c-34.9,2.8-58.8-123.5-58.8-287s23.7-299.7,75-307.7
          C339.2,21.1,580.5,179.1,580.5,434.8L580.5,434.8z"
        />

        <g className={styles.eye}>
          <path
            fill="#FFFFFF"
            d="M281.3,502.2c-81.3-5.3-124.5-74.4-119.1-155.8c5.3-81.4,44-169.1,125.3-163.8s172.1,100.2,166.8,181.5
            C449,445.5,362.6,507.5,281.3,502.2L281.3,502.2z"
          />

          <g className={styles.eyeball}>
            <path
              fill="#9E9D9D"
              d="M298.8,251.3c-53.8,3.1-94.9,49.2-91.8,102.9c3.1,53.8,49.2,94.9,102.9,91.8c53.8-3.1,94.9-49.2,91.8-102.9
              C398.7,289.3,352.6,248.2,298.8,251.3L298.8,251.3z"
            />

            <g className={styles.pupil}>
              <path
                d="M304.9,286.8c-30.7,1.8-54.2,28.1-52.4,58.8s28.1,54.2,58.8,52.4s54.2-28.1,52.4-58.8C362,308.6,335.6,285.1,304.9,286.8
	                L304.9,286.8z"
              />
              <path
                fill="#FFFFFF"
                d="M279.1,325.7c-9.2,0.5-16.2,8.4-15.7,17.6s8.4,16.2,17.6,15.7s16.2-8.4,15.7-17.6
                C296.3,332.3,288.3,325.2,279.1,325.7L279.1,325.7z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Favicon;
