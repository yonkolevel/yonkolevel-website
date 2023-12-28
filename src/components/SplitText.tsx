import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface ISplitTextProps extends MotionProps {}

const SplitText: React.FunctionComponent<ISplitTextProps> = ({
  children,
  ...rest
}) => {
  let words = (children as string).split(' ');
  return (
    <>
      {words.map((word, i) => {
        return (
          <div
            key={word + i}
            style={{ display: 'inline-block', overflow: 'hidden' }}
          >
            <motion.div
              {...rest}
              style={{ display: 'inline-block', willChange: 'transform' }}
              custom={i}
            >
              {word + (i !== words.length - 1 ? '\u00A0' : '')}
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default SplitText;
