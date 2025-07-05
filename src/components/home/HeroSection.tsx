import { motion } from 'framer-motion';
import Container from '../Container';

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};


const HeroSection = () => {
  return (
    <section className='bg-black min-h-screen flex items-center justify-center py-20'>
      <Container>
        <div className='text-center'>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={heroVariants}
            className='mb-8'
          >
            <h1 className='font-departure-mono text-4xl md:text-5xl lg:text-6xl text-originalYellow mb-6'>
              YONKO LEVEL
            </h1>
            <p className='font-departure-mono text-lg md:text-xl text-originalYellow opacity-80'>
              apps that make you smile :)
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
