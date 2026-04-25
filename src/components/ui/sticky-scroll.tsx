const StickyScroll = () => {
  return (
    <div
      className="relative h-[600px] w-full overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10"
    >
      <div className='bg-[#0a0a0a]'>
        <div className='wrapper'>
          <section className='text-white h-[600px] w-full bg-[#0a0a0a] grid place-content-center sticky top-0 z-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

              <h1 className='2xl:text-6xl text-4xl px-8 font-bold text-center tracking-tight leading-[120%] relative z-10'>
                CSS Sticky Gallery
                <br />
                <span className="text-gray-400 text-2xl mt-4 block">Scroll down to reveal 👇</span>
              </h1>
            </section>
          </div>

          <section className='text-white w-full bg-[#0a0a0a] relative z-10'>
            <div className='grid grid-cols-12 gap-4 p-4'>
              <div className='grid gap-4 col-span-4'>
                <figure className=' w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
                <figure className=' w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
                <figure className=' w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
               <figure className=' w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
              </div>
              
              <div className='sticky top-4 h-[calc(600px-2rem)] w-full col-span-4 gap-4 grid grid-rows-3'>
                <figure className='w-full h-full '>
                  <img
                    src='https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-xl border-4 border-[#0a0a0a]'
                  />
                </figure>
                <figure className='w-full h-full '>
                  <img
                    src='https://images.unsplash.com/photo-1476180814856-a36609db0493?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-xl border-4 border-[#0a0a0a]'
                  />
                </figure>
                <figure className='w-full h-full '>
                  <img
                    src='https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-xl border-4 border-[#0a0a0a]'
                  />
                </figure>
              </div>
              
              <div className='grid gap-4 col-span-4'>
                <figure className='w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1719547907790-f661a88302c2?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
                <figure className='w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
                <figure className='w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
                <figure className='w-full'>
                  <img
                    src='https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop'
                    alt=''
                    className='transition-all duration-300 w-full h-[300px] align-bottom object-cover rounded-xl'
                  />
                </figure>
              </div>
            </div>
          </section>

          <footer className='group bg-[#0a0a0a] h-[300px] flex items-center justify-center relative '>
             <h1 className='text-[8vw] uppercase font-bold text-center bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent opacity-50'>
              End of Gallery
            </h1>
          </footer>
        </div>
      </div>
  );
};

export default StickyScroll;

