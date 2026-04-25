'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';


interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  scrollerRef
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    container: scrollerRef,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-[600px] flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[10%] h-[400px] w-[80%] rounded-2xl p-10 origin-top border border-black/10`}
      >
        <h2 className='text-3xl text-left font-bold text-black'>{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <p className='text-sm text-black/80 font-medium'>{description}</p>
            <span className='flex items-center gap-2 pt-4'>
              <a
                href={'#'}
                target='_blank'
                className='underline cursor-pointer font-bold text-black'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-[60%] h-full rounded-xl overflow-hidden shadow-xl`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt='image' className='absolute inset-0 w-full h-full object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const StackingCard = ({ projects }: ComponentRootProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    container: scrollerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div 
      className="relative h-[600px] w-full overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10"
      ref={scrollerRef}
    >
      <div className='bg-[#0a0a0a]' ref={container}>
        <>
          <section className='text-white h-[600px] w-full bg-[#0a0a0a] grid place-content-center relative'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] relative z-10'>
              Stacking Cards Using <br /> Motion. Scroll down! 👇
            </h1>
          </section>
        </>

        <section className='text-white w-full bg-[#0a0a0a] py-[10vh]'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                scrollerRef={scrollerRef}
              />
            );
          })}
        </section>

        <footer className='group bg-[#0a0a0a] h-[400px] flex items-center justify-center relative overflow-hidden'>
           <h1 className='text-[10vw] uppercase font-bold text-center bg-linear-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent opacity-50'>
            End of Scroll
          </h1>
        </footer>
      </div>
    </div>
  );
};

export default StackingCard;

