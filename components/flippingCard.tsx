'use client'

import { Card, CardBody, CardContainer, CardDescription, CardLogo, CardContact } from './card'
import Link from 'next/link';
import Image from 'next/image';
import { DashOutline, LogoBack, LogoFront } from './logo';
import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const FlippingCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 30 };

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
    
    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Disable on mobile
        if (window.matchMedia('(max-width: 640px)').matches) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        
        // Calculate position from -0.5 to 0.5
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };
    
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            className='perspective-[1000px] cursor-pointer selection:bg-white selection:text-sky-900 w-[350px] h-[500px] max-sm:w-[290px] max-sm:h-[430px]'
            onClick={handleFlip}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Outer motion.div: handles X and Y tilt */}
            <motion.div
                className='relative w-full h-full'
                style={{
                    rotateX, // Tilt up/down
                    rotateY, // Tilt left/right
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Inner motion.div: handles flip */}
                <motion.div
                    className='relative w-full h-full transform-3d'
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                    animate={{
                        rotateY: isFlipped ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: 'easeInOut',
                    }}
                >
                    {/* Card Front */}
                    <div 
                        className='absolute w-full h-full backface-hidden pointer-events-auto'
                         style={{ zIndex: 20 }}
                    >
                        <Card className='w-[350px] h-[500px] max-sm:w-[290px] max-sm:h-[430px]'>
                            <CardContainer variant='default'>
                                <DashOutline className="text-white opacity-20 -translate-y-px pointer-events-none" />
                                <DashOutline className="text-sky-50 opacity-80 pointer-events-none translate-x-3" />
                                <div className='absolute left-1/2 top-5 -translate-x-1/2 z-10 flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-full border-2 border-[#2f2200]/35 bg-[#fff7d6]/80 p-1 shadow-[0_6px_16px_rgba(47,34,0,0.12)]'>
                                    <Image
                                        src="/avhegde.png"
                                        alt="Ananya V Hegde"
                                        width={120}
                                        height={120}
                                        className='h-full w-full rounded-full object-cover'
                                        priority
                                    />
                                </div>
                                <div className='absolute left-1/2 -translate-x-1/2 bottom-63 z-10'>
                                    <div className='inline-flex items-center gap-2 rounded-full border border-[#2f2200]/20 bg-white/80 px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'>
                                        <span className='text-[8px] uppercase tracking-[0.18em] text-[#2f2200]'>Emp No</span>
                                        <span className='text-[10px] font-bold tracking-[0.18em] text-[#2f2200]'>MSDC065</span>
                                    </div>
                                </div>
                                <div className='absolute left-1/2 bottom-5 -translate-x-1/2 z-10'>
                                    <CardLogo className='scale-75 origin-bottom'>
                                        <LogoFront />
                                    </CardLogo>
                                </div>
                                <CardBody className='absolute bottom-34 left-3 right-0 px-4 pb-2'>
                                    <div className='flex justify-between items-end font-mono tracking-wide text-sm mt-0 max-sm:text-xs max-sm:mt-0'>
                                        <CardDescription className='tracking-tight w-full pl-2'>
                                            <p className='text-[#2f2200] text-left text-[18px] font-medium'>Ananya V Hegde</p>
                                            <p className='mt-2 text-left text-[#2f2200] text-[15px]'>I am a <span className='font-bold text-[#2f2200]'>Technical Trainer</span></p>
                                            <p className='text-left text-[#2f2200] text-[15px]'>
                                                Working at{' '}
                                                <Link
                                                    href="https://msdcskills.org"  
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='underline text-[#2f2200] font-semibold'
                                                >
                                                    School of IT Skills, MSDC
                                                </Link>
                                            </p> 
                                        </CardDescription>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </Card>
                    </div> 

                    {/* Card Back */}
                    <div 
                        className='absolute w-full h-full backface-hidden transform-[rotateY(180deg)]'

                    > 
                        <Card className='w-[350px] h-[500px] max-sm:w-[290px] max-sm:h-[430px]'>
                            <CardContainer variant='back' className='items-center justify-center shadow-[inset_0px_-2px_4px_0px_rgba(0,0,0,0.15)]'>
                                <DashOutline className="text-white opacity-20 -translate-y-px " />
                                <DashOutline className="text-sky-50 opacity-60 " />

                                <div className='absolute left-1/2 top-[6.1rem] -translate-x-1/2 z-10 flex h-28 w-36 items-center justify-center'>
                                    <Image
                                        src="/sois-logo.png"
                                        alt="SOIS Logo"
                                        width={190}
                                        height={100}
                                        className='h-full w-full object-contain'
                                        priority
                                    />
                                </div>

                                <div className='absolute left-1/2 top-[61%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center'>
                                    <span className='font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2f2200]'>A School of</span>
                                </div>

                                <div className='absolute left-1/2 bottom-7 -translate-x-1/2 z-10 flex h-24 w-32 items-center justify-center'>
                                    <Image
                                        src="/MSDC_Logo.png"
                                        alt="MSDC Logo"
                                        width={180}
                                        height={100}
                                        className='h-full w-full object-contain'
                                        priority
                                    />
                                </div>

                                <CardLogo>
                                    <LogoBack/> 
                                </CardLogo>
                                <Link
                                    href="https://www.linkedin.com/in/ananyahegde-"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()} 
                                    className="font-mono text-text-primary underline text-xs text-center mt-auto mb-2 relative z-50" 
                                >
                                    Contact Me
                                </Link>
                            </CardContainer>
                        </Card>
                    </div> 
                </motion.div>
            </motion.div>
        </div> 
    )
}
